import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {zustandPersistStorage} from './config';

const SLICE_FEATURE_KEY = `counter-store`; // Key for persistent storage

type IState = {
  count: number;
};

type IActions = {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export type ICounterSlice = IState & IActions;

// Define the initial state
const initialState: IState = {
  count: 0,
};

// Creates a slice of the store for managing counter state and actions.
const createCounterSlice: StateCreator<ICounterSlice> = set => ({
  ...initialState,
  increment: () => set(state => ({count: state.count + 1})),
  decrement: () => set(state => ({count: state.count - 1})),
  reset: () => set(() => ({...initialState})),
});

/**
 * Hook to use the persisted counter store.
 * The store state is persisted using custom storage.
 */
export const usePersistCounterStore = create<ICounterSlice>()(
  persist(
    (...a) => ({
      ...createCounterSlice(...a),
    }),
    {
      name: SLICE_FEATURE_KEY, // Unique name for persistent storage
      storage: createJSONStorage(() => zustandPersistStorage), // Custom persistence storage
    }
  )
);

/**
 * Hook to use the counter store without persistence.
 */
export const useCounterStore = create<ICounterSlice>((...a) => ({
  ...createCounterSlice(...a),
}));
