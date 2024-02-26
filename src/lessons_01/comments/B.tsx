import { useContext } from 'react';
import { MsgContext } from './index'; // 确保路径正确

const B = () => {
    const msg = useContext(MsgContext); // 使用 useContext 获取 Context 的当前值
    return <div>{msg}</div>;
};

export default B;