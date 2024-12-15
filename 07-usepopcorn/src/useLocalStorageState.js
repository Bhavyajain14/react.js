import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [watched, setWatched] = useState(function () {
    const storedvalue = localStorage.getItem(key);
    return storedvalue ? JSON.parse(storedvalue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(watched));
    },
    [watched, key]
  );

  return [watched, setWatched];
}
