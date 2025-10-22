import { useState, useCallback } from "react";
import setContent from "../utils/setContent";
export const useHttp = () => {
    const [process, setProcess] = useState("waiting")

    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setProcess("loading")
        try {
            const responce = await fetch(url, { method, body, headers });

            if (!responce.ok) {
                throw new Error(`some problem with${url}`)
            }
            return await responce.json()
        } catch (error) {
            setProcess("error")
            throw error
        }

    }, []);

    const clearError = useCallback(() => {
        setProcess("loading")
    }, []);

    return { request, clearError, process, setProcess }
}