/*
 * @Date: 2024-05-13 22:17:21
 * @Description:
 */
import {
    createContext,
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useCallback,
    useContext, useEffect,
    useRef,
    useState
} from "react";

type PushFunc = (key?: string) => string;
type TickFunction = (value?: number) => void;
type ExecFunc = <T> (runner: () => Promise<T>) => Promise<T>
type IsLoadingFunc = () => boolean
type OnChangeFunc = (loading: boolean) => void

export interface UseLoadingOptions {
    /**
     * delay for setLoading(false), prevent flashing; in unit `ms`
     * @default 100
     */
    delay?: number
    /**
     * emit immediately on loading state changed
     */
    onChange?: OnChangeFunc
}

// todo:mock数据而已
export default function NotImplementedError(taskKey: string): never {
    console.log(taskKey)
    throw new Error("NotImplementedError");
}
export const LoadingContext = createContext({
    loading: false,
    execute: NotImplementedError,
    push: NotImplementedError,
    finish: NotImplementedError,
    promise: NotImplementedError,
    isLoading: NotImplementedError,
});

function useProxy<T = unknown>(initialValue: T): [T, MutableRefObject<T>, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState<T>(initialValue);
    const ref = useRef<T>(initialValue)
    const setRefValue = useCallback<Dispatch<SetStateAction<T>>>((value) => {
        setState(ref.current = value instanceof Function ? value(ref.current) : value)
    }, [])
    return [state, ref, setRefValue]

}

const useCounter = (initialValue = 0): [number, TickFunction] => {
    const [couter, setCouter] = useState<number>(initialValue);
    const tick: TickFunction = useCallback((value?: number) => {
        setCouter(c => value !== undefined ? value : (c === Number.MAX_SAFE_INTEGER ? 1 : c + 1));
    }, []);
    return [couter, tick]
}
export const useLoading = ({delay = 100, onChange}: UseLoadingOptions = {}) => {
        const [couter, tick] = useCounter()
        const [loading, loadingProxy, setLoading] = useProxy(false)
        const queueRef = useRef<string[]>([]);
        const {push: globalPush, finish: globalFinish} = useContext(LoadingContext);
        // loading任务队列
        const pushTask: PushFunc = (key?: string): string => {
            const taskKey = key || `${Date.now()}_${Math.random()}_${Math.random()}`;
            // When globalPush is a non-initialized value
            try {
                if (
                    globalPush &&
                    globalPush !== pushTask &&
                    globalPush !== NotImplementedError
                ) {
                    globalPush(taskKey);
                }
            } catch (e) {
                console.error('failed to call "push" function in context');
            }

            queueRef.current.push(taskKey);
            tick()
            return taskKey;
        };

        const finishTask = useCallback(
            (taskKey: string) => {
                try {
                    if (
                        globalFinish &&
                        globalFinish !== finishTask &&
                        globalFinish !== NotImplementedError
                    ) {
                        globalFinish(taskKey);
                    }
                } catch (e) {
                    console.error('failed to call "finish" function in context:', e)
                }
                tick()
                const index: number = queueRef.current.indexOf(taskKey)
                if (index !== -1) {
                    queueRef.current.splice(index, 1)
                    // 不是很懂这里的onChange的意义是什么以及loadingProxy.current的意义
                    if (onChange && ((queueRef.current.length === 0 && loadingProxy.current) ||
                        (!loadingProxy.current && queueRef.current.length > 0))) {
                        onChange(queueRef.current.length > 0)
                    }
                    // 当前loading队列已执行完
                    return true;
                }
                return false

            }, [onChange]
        )
        const execute = useCallback<ExecFunc>(async <T>(runner: () => Promise<T>): Promise<T> => {
            const task = pushTask()
            try {
                return await runner()
            } finally {
                finishTask(task)
            }
        }, [pushTask, finishTask])
        const isLoading = useCallback<IsLoadingFunc>((): boolean => queueRef.current.length > 0, [])
        useEffect(() => {
            const loading = queueRef.current.length > 0
            if (loading) {
                setLoading(loading)
            } else {
                const id = setTimeout(() => setLoading(queueRef.current.length > 0), delay)
                return () => clearTimeout(id)
            }
        }, [couter, delay, setLoading])
        return {
            loading,
            pushTask,
            finishTask,
            execute,
            isLoading
        }
    }
;
