const STORAGE_KEYS = {
  authUser: "admin-frontend:authUser",
  registered: "admin-frontend:users",
};

export function getAuthUser() {
  const raw = localStorage.getItem(STORAGE_KEYS.authUser);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setAuthUser(user) {
  localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(user));
}

export function clearAuthUser() {
  localStorage.removeItem(STORAGE_KEYS.authUser);
}

const DEFAULT_USER = {
  name: "Admin",
  email: "admin@example.com",
  password: "admin123",
};

export function getRegisteredUsers() {
  const raw = localStorage.getItem(STORAGE_KEYS.registered);
  if (!raw) return [DEFAULT_USER];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [DEFAULT_USER];
    }
    return parsed;
  } catch {
    return [DEFAULT_USER];
  }
}

export function addRegisteredUser(user) {
  const existing = getRegisteredUsers();
  localStorage.setItem(
    STORAGE_KEYS.registered,
    JSON.stringify([...existing, user]),
  );
}
