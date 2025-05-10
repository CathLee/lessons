/*
 * @Date: 2025-01-07 23:35:40
 * @Description: 
 */
import { useEffect } from "react";
import { InitGraph } from "./init";

const Graph = () => {
    useEffect(()=>{
        InitGraph()
    },[])
  return <div id="container"></div>;
};
export default Graph;