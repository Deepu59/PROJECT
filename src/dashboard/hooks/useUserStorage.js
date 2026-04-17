import { useEffect, useRef, useState } from "react";

export function useUserStorage(uid, name, initialValue) {
  const storageKey = uid ? `${name}_${uid}` : null;

  const [value, setValue] = useState(initialValue);
  const hydrated = useRef(false);

  // load
  useEffect(() => {
    if (!storageKey) return;
    const raw = localStorage.getItem(storageKey);
    setValue(raw ? JSON.parse(raw) : initialValue);
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  // save
  useEffect(() => {
    if (!storageKey) return;
    if (!hydrated.current) return;
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value]);

  return [value, setValue];
}