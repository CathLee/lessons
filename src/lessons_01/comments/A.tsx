/*
 * @Date: 2024-02-26 22:38:46
 * @Description:
 */
import { FC, useEffect } from "react";
import { useFetch } from "../suspenceDemo";
import B from "./B";
const A:FC<{url:string}> = ({ url }) => {
  const data = useFetch(url);
  return (
    <div>
      this is A component,
      {JSON.stringify(data, null, 2)}
      <B />
    </div>
  );
};
export default A;
