import { useCallback, useState, useEffect } from 'react';
import { useWindowEvent } from '../use-window-event/use-window-event.js';

function serializeJSON(value, hookName) {
  try {
    return JSON.stringify(value);
  } catch (error) {
    throw new Error(`@mantine/hooks ${hookName}: Failed to serialize the value`);
  }
}
function deserializeJSON(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}
function createStorage(type, hookName) {
  const eventName = type === "localStorage" ? "mantine-local-storage" : "mantine-session-storage";
  return function useStorage({
    key,
    defaultValue = void 0,
    getInitialValueInEffect = true,
    deserialize = deserializeJSON,
    serialize = (value) => serializeJSON(value, hookName)
  }) {
    const readStorageValue = useCallback((skipStorage) => {
      if (typeof window === "undefined" || !(type in window) || window[type] === null || skipStorage) {
        return defaultValue;
      }
      const storageValue = window[type].getItem(key);
      return storageValue !== null ? deserialize(storageValue) : defaultValue;
    }, [key, defaultValue]);
    const [value, setValue] = useState(readStorageValue(getInitialValueInEffect));
    const setStorageValue = useCallback((val) => {
      if (val instanceof Function) {
        setValue((current) => {
          const result = val(current);
          window[type].setItem(key, serialize(result));
          window.dispatchEvent(new CustomEvent(eventName, { detail: { key, value: val(current) } }));
          return result;
        });
      } else {
        window[type].setItem(key, serialize(val));
        window.dispatchEvent(new CustomEvent(eventName, { detail: { key, value: val } }));
        setValue(val);
      }
    }, [key]);
    const removeStorageValue = useCallback(() => {
      window[type].removeItem(key);
      window.dispatchEvent(new CustomEvent(eventName, { detail: { key, value: defaultValue } }));
    }, []);
    useWindowEvent("storage", (event) => {
      var _a;
      if (event.storageArea === window[type] && event.key === key) {
        setValue(deserialize((_a = event.newValue) != null ? _a : void 0));
      }
    });
    useWindowEvent(eventName, (event) => {
      if (event.detail.key === key) {
        setValue(event.detail.value);
      }
    });
    useEffect(() => {
      if (defaultValue !== void 0 && value === void 0) {
        setStorageValue(defaultValue);
      }
    }, [defaultValue, value, setStorageValue]);
    useEffect(() => {
      if (getInitialValueInEffect) {
        setValue(readStorageValue());
      }
    }, []);
    return [
      value === void 0 ? defaultValue : value,
      setStorageValue,
      removeStorageValue
    ];
  };
}

export { createStorage };
//# sourceMappingURL=create-storage.js.map
