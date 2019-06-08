import { useEffect } from "react";

/**
 * Fetches param if not exists in global store
 */
export default function useFetch(storeValue, fetchAction) {
  useEffect(() => {
    if (storeValue === '' || storeValue.length === 0 || storeValue === {})
      fetchAction()
  }, [storeValue, fetchAction])
}