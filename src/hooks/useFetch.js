import { useEffect } from "react";

/**
 * Fetches param if not exists in global store
 */
export default function useFetch(storeValue, fetchAction) {
  useEffect(() => {
    if (storeValue === undefined || storeValue === '' || storeValue.length === 0 || Object.keys(storeValue).length === 0)
      fetchAction()
  }, [storeValue, fetchAction])
}