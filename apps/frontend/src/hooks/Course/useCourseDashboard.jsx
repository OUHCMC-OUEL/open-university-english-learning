import { useState, useEffect } from "react";
import { getSubject, getCourseEnrolled } from '@/services/Cousre/CourseDashboard';
export function useCourseDashboard(type) {
    const [subject, setSubject] = useState([])
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadDataCousre = async () => {
        try {
            if (type == null) return;
            setLoading(true);
            const data = await getCourseEnrolled(type, page);
            setCourse(data.results);
            setTotalPages(Math.ceil(data.count / 6));
        } catch (error) {
            console.error("Lỗi server:", error);
        } finally {
            setLoading(false);
        }
    };
    const loadDataSubject = async () => {
        try {
            setLoading(true);
            const data = await getSubject();
            setSubject(data);
        } catch (error) {
            console.error("Lỗi server:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDataSubject();
    }, []);

    useEffect(() => {
        loadDataCousre();
    }, [type, page]);

    useEffect(() => {
        setPage(1);
    }, [type]);

    return { subject, loading, course, setPage,page,totalPages };
}

