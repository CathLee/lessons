// store.js
import {createStore} from 'redux';

// 定义初始状态
const initialState: { todos: Todo[], inputValue: string } = {
    todos: [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ],
    inputValue: '请输入',
};

// 定义reducer
function todosReducer(state = initialState, action: Action) {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case 'REMOVE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo === action.payload)
            };
        default:
            return state;
    }
}

// 创建store
const store = createStore(todosReducer);

export default store;
