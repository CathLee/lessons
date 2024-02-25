/*
 * @Date: 2024-02-25 13:42:09
 * @Description: 
 */
import { FC } from "react";
interface FuncInterface{
  onHandleClick:(arg0: string)=>void
}
const index: FC<FuncInterface> = ({onHandleClick}) => {
    const name = '子组件2被点击'
  return (
    <>
    <button onClick={()=>onHandleClick(name)}>子组件2</button>
    
    </>
  )
};
export default index;
