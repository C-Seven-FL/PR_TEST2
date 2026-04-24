import { persistUserRole } from "../../../features/auth/lib/userRole";

const MOCK_AUTH_STORAGE_KEY = "bookio-mock-auth-user";
export const MOCK_AUTH_EVENT = "bookio:mock-auth-change";

const MOCK_USERS = {
  client: {
    uid: "mock-client-1",
    email: "client@bookio.test",
    displayName: "Client Tester",
    role: "client",
    photoURL: "",
    profile: {
      name: "Client Tester",
      address: "Karla Engliše 4, Praha",
      phone_number: "+420 777 123 456",
      notification_turn: true,
      notifications: [
        {
          id: "notif-client-1",
          message: "Vaše rezervace na středu byla potvrzena.",
          read: false,
          createdAt: "2026-04-22T09:20:00.000Z",
        },
        {
          id: "notif-client-2",
          message: "Zítra vám začíná rezervace v 10:00.",
          read: true,
          createdAt: "2026-04-21T15:45:00.000Z",
        },
      ],
    },
    isMockUser: true,
  },
  provider: {
    uid: "mock-provider-1",
    email: "provider@bookio.test",
    displayName: "Provider Tester",
    role: "provider",
    photoURL: "",
    profile: {
      name: "Provider Tester",
      address: "Masarykova 12, Brno",
      phone_number: "+420 606 234 567",
      notification_turn: true,
      notifications: [
        {
          id: "notif-provider-1",
          message: "Nová rezervace čeká na potvrzení.",
          read: false,
          createdAt: "2026-04-22T08:10:00.000Z",
        },
        {
          id: "notif-provider-2",
          message: "Zákazník upravil čas rezervace.",
          read: true,
          createdAt: "2026-04-20T17:30:00.000Z",
        },
      ],
    },
    isMockUser: true,
  },
};

function readMockAuthStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(MOCK_AUTH_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    window.localStorage.removeItem(MOCK_AUTH_STORAGE_KEY);
    return null;
  }
}

function writeMockAuthStorage(user) {
  if (typeof window === "undefined") {
    return;
  }

  if (!user) {
    window.localStorage.removeItem(MOCK_AUTH_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(MOCK_AUTH_EVENT, { detail: null }));
    return;
  }

  window.localStorage.setItem(MOCK_AUTH_STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new CustomEvent(MOCK_AUTH_EVENT, { detail: user }));
}

export function getMockUserByRole(role) {
  return MOCK_USERS[role] || null;
}

export function getMockUsers() {
  return Object.values(MOCK_USERS);
}

export function getCurrentMockUser() {
  return readMockAuthStorage();
}

export function signInAsMockRole(role) {
  const mockUser = getMockUserByRole(role);

  if (!mockUser) {
    throw new Error(`Unknown mock role: ${role}`);
  }

  persistUserRole(mockUser.role);
  writeMockAuthStorage(mockUser);
  return mockUser;
}

export function signInWithMockEmail(email) {
  const matchedUser = getMockUsers().find(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
  );

  if (!matchedUser) {
    throw new Error(
      "V mock režimu použijte client@bookio.test nebo provider@bookio.test.",
    );
  }

  return signInAsMockRole(matchedUser.role);
}

export function registerMockUser({ email, role }) {
  const normalizedRole = role === "provider" ? "provider" : "client";
  const displayName =
    normalizedRole === "provider" ? "Provider Tester" : "Client Tester";

  const mockUser = {
    uid: `mock-${normalizedRole}-${Date.now()}`,
    email: email.trim().toLowerCase(),
    displayName,
    role: normalizedRole,
    photoURL: "",
    profile: {
      name: displayName,
      address: "",
      phone_number: "",
      notification_turn: true,
      notifications: [],
    },
    isMockUser: true,
  };

  persistUserRole(normalizedRole);
  writeMockAuthStorage(mockUser);
  return mockUser;
}

export function signOutMockUser() {
  writeMockAuthStorage(null);
  persistUserRole(null);
}

export function updateCurrentMockUserProfile(profilePatch) {
  const currentUser = readMockAuthStorage();

  if (!currentUser) {
    throw new Error("Pro úpravu mock profilu není přihlášený žádný uživatel.");
  }

  const nextUser = {
    ...currentUser,
    email: profilePatch.mail || currentUser.email,
    displayName: profilePatch.name || currentUser.displayName,
    profile: {
      ...currentUser.profile,
      ...profilePatch,
    },
  };

  writeMockAuthStorage(nextUser);
  return nextUser;
}