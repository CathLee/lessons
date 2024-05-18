import {useLoading} from "../../hooks/useLoading";
import {useCallback} from "react";

const Index = () => {
    const {
        loading,
        pushTask,
        finishTask,
        execute,
        isLoading
    } = useLoading()
    const fetch = useCallback(async () => {
        if (isLoading()) return
        const lk = pushTask()
        try {
            // mock the fetch api execution
            await new Promise<void>(resolve => setTimeout(() => {
                resolve()
            }, 1000))
        } finally {
            finishTask(lk)
        }
        await execute(() => new Promise<void>(resolve => setTimeout(() => {
            resolve()
        }, 1000)))
    }, [pushTask, finishTask, isLoading,execute])

    return (
        <div>
            <div className="state">{loading ? 'loading' : 'idle'}</div>
            <button className="button" onClick={fetch}>{loading ? 'loading' : 'fetch'}</button>
        </div>
    );
};

export default Index;