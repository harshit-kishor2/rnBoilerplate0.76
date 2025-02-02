import {create, StateCreator} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {zustandPersistStorage} from "./config";
import {wait} from "@app/helpers";
import {UserRoles} from "@app/helpers/enums";

type IState = {
  userRole: UserRoles;
};

type IActions = {
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
  reset: () => void;
};

export type IAuthSlice = IState & IActions;

// Define the initial state
const initialState: IState = {
  userRole: UserRoles.Guest,
};

// Creates a slice of the store for managing Auth state and actions.
const createAuthSlice: StateCreator<IAuthSlice> = set => ({
  ...initialState,
  login: async () => {
    // Wait for 5 seconds before updating the state
    await wait(5000);
    // After the delay, update the state check if admin or user
    set(() => ({
      userRole: UserRoles.User,
    }));
  },
  logout: () => set(() => ({userRole: UserRoles.Guest})),
  register: async () => {
    // Wait for 5 seconds before updating the state
    wait(5000);
    // After the delay, update the state check if admin or user.
    set(() => ({
      userRole: UserRoles.User,
    }));
  },
  reset: () => set(() => ({...initialState})),
});

/**
 * Hook to use the persisted Auth store.
 * The store state is persisted using custom storage.
 */
export const usePersistAuthStore = create<IAuthSlice>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: `auth-store`, // Unique name for persistent storage
      storage: createJSONStorage(() => zustandPersistStorage), // Custom persistence storage
    }
  )
);
