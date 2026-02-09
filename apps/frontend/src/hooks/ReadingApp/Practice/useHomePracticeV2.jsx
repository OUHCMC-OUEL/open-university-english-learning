import { useState, useEffect } from "react";
import { getAllParts } from "@/services/ReadingApp/allParts";

export function useHome(type) {
    const [allParts, setAllParts] = useState([]);
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await getAllParts();
                setAllParts(data);
            } catch (error) {
                console.error("Lỗi khi fetch Parts:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        if (!type) {
            setParts(allParts);
        } else {
            setParts(allParts.filter(p => p.type_part === type));
        }
    }, [type, allParts]);

    return {
        parts,
        loading,
    };
}