type Todo = string;

interface Action {
    type: string;
    payload?: any; // 根据你的需求，你可能想要使用更具体的类型
}

interface State {
    todos: Todo[],
    inputValue: string
}