import { useState, useEffect } from "react";
import { partByType } from "@/services/ReadingApp/partByType";
export function useHome(type) {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await partByType(type);
        setParts(response.parts || response); 
      } catch (error) {
        console.error("Lỗi khi fetch Parts:", error);
        setParts([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [type]);

  return { parts, loading };
}
