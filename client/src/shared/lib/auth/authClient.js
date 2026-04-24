
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import {auth} from "../../config/firebase";
import { env } from "../../config/env";
import {
  registerMockUser,
  signInAsMockRole,
  signInWithMockEmail,
  signOutMockUser,
} from "./mockAuth";
import { readStoredUserRole } from "../../../features/auth/lib/userRole";

const googleProvider = new GoogleAuthProvider();

export const authClient = {
  async loginWithEmail(email, password) {
    if (env.useMockAuth) {
      return signInWithMockEmail(email, password);
    }

    return await signInWithEmailAndPassword(auth, email, password);
  },

  async registerWithEmail(email, password) {
    if (env.useMockAuth) {
      return registerMockUser({
        email,
        role: readStoredUserRole() || "client",
      });
    }

    return await createUserWithEmailAndPassword(auth, email, password);
  },

  async loginWithGoogle() {
    if (env.useMockAuth) {
      throw new Error(
        "Google přihlášení není v mock režimu dostupné. Použijte testovacího uživatele.",
      );
    }

    return await signInWithPopup(auth, googleProvider);
  },

  async loginAsMockRole(role) {
    return signInAsMockRole(role);
  },

  async logout() {
    if (env.useMockAuth) {
      return signOutMockUser();
    }

    return await signOut(auth);
  },
};
