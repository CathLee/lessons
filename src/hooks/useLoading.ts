/*
 * @Date: 2024-05-13 22:17:21
 * @Description:
 */
import { createContext, useContext, useRef } from "react";

type PushFunc = (key?: string) => string;

// todo:mock数据而已
export default function NotImplementedError(taskKey: string): never {
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

export const useLoading = () => {
  const queueRef = useRef<string[]>([]);
  const { push: globalPush, finish: globalFinish } = useContext(LoadingContext);
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
    return taskKey;
  };
};
