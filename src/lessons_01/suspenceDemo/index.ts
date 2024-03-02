import { useState, useEffect } from "react";

export const useFetch = (url: string) => {
  const [res, setRes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setRes(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [url]); // 依赖数组中的 url 确保当 url 改变时重新获取数据

  return res;
};