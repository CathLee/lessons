/*
 * @Date: 2024-02-25 13:42:09
 * @Description: 
 */
import { FC } from "react";
interface ChildParams {
  name: string;
  children: React.ReactNode
}
const index: FC<ChildParams> = (props) => {
    console.log(props)
  return (
    <>
    <div>index:{props.name}</div>
    
    </>
  )
};
export default index;
