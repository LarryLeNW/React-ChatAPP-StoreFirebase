import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../config/firebase";

export const useUserStore = create((set) => ({
  user_current: null,
  isLoading: false,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ user_current: null, isLoading: false });
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists())
        set({ user_current: docSnap.data(), isLoading: false });
      else set({ user_current: null, isLoading: false });
    } catch (error) {
      return set({ user_current: null, isLoading: false });
    }
  },
}));
