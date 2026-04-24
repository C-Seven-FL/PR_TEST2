const STORAGE_KEY = "bookio-user-role";

export function normalizeUserRole(role) {
  if (!role || typeof role !== "string") {
    return null;
  }

  return role.trim().toLowerCase();
}

export function readStoredUserRole() {
  if (typeof window === "undefined") {
    return null;
  }

  return normalizeUserRole(window.localStorage.getItem(STORAGE_KEY));
}

export function persistUserRole(role) {
  if (typeof window === "undefined") {
    return;
  }

  const normalized = normalizeUserRole(role);

  if (!normalized) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, normalized);
}

export function resolveUserRole(user) {
  return normalizeUserRole(user?.role) || readStoredUserRole();
}

export function hasRequiredRole(userRole, allowedRoles = []) {
  if (!allowedRoles.length) {
    return true;
  }

  return allowedRoles.includes(normalizeUserRole(userRole));
}
