function createSafeStorage() {
  const store = new Map();

  return {
    getItem(key) {
      const normalizedKey = String(key);
      return store.has(normalizedKey) ? store.get(normalizedKey) : null;
    },
    setItem(key, value) {
      store.set(String(key), String(value));
    },
    removeItem(key) {
      store.delete(String(key));
    },
    clear() {
      store.clear();
    },
    key(index) {
      const keys = [...store.keys()];
      return keys[index] ?? null;
    },
    get length() {
      return store.size;
    },
  };
}

function ensureStorageShape(storageName) {
  const existing = globalThis[storageName];
  if (!existing || typeof existing.getItem === "function") {
    return;
  }

  const safeStorage = createSafeStorage();

  try {
    globalThis[storageName] = safeStorage;
    return;
  } catch {}

  try {
    Object.defineProperty(globalThis, storageName, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: safeStorage,
    });
  } catch {}
}

export function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  ensureStorageShape("localStorage");
  ensureStorageShape("sessionStorage");
}

