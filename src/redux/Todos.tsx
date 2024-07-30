// TodoList.js
import React, {memo, useEffect, useMemo, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Input, Button, List} from 'antd';
import {fetchTodos} from "./thunk";
import {useGetApi} from "../api/hooks/useApi";

function TodoList() {


    const {todos, inputValue} = useSelector((state: State) => state); // 从Redux store获取todos状态
    const dispatch = useDispatch();
    const [todo, setTodo] = useState<Todo>('');
    const {data, error, isLoading} = useGetApi('https://cli.github.com/manual/gh_api')


    // 删除todo的函数
    const removeTodo = (id: number) => {
        dispatch({type: 'REMOVE_TODO', payload: id});
    };
    const handleAddTodo = ()=>{
        dispatch({ type: 'ADD_TODO', payload: todo });
        setTodo(''); // 清空输入以准备下一个待办事项的输入
    }
    const handleInputChange  = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setTodo(e.target.value);
    }
    useEffect(()=>{
        // @ts-ignore
        dispatch(fetchTodos())
    },[dispatch])
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{marginTop: '10px', marginLeft: '10px'}}>
            <div>
                <Input placeholder={inputValue} style={{width: '300px'}} onChange={handleInputChange}/>
                <Button type="primary" onClick={handleAddTodo}>提交</Button>
            </div>
            <List
                bordered
                dataSource={todos}
                renderItem={item => <List.Item>{item}</List.Item>}
            />
        </div>

    );
}

export default memo(TodoList);
