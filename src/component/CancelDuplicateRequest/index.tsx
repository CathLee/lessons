import { useEffect } from "react";
import httpInstance from "./axiosConfig";
const Index = () => {
  useEffect(() => {
    setTimeout(() => {
     const a =  httpInstance.post("/@antfu/ni/v/0.13.1");
    }, 1000);
  });
  return <div>dfasdfsdf</div>;
};
export default Index;
