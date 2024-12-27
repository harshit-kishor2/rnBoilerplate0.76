
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {reduxStore} from './redux-store';

/**
 * The root state of the Redux store.
 *
 * This type is inferred from the return value of `reduxStore.getState()`.
 */
export type RootState = ReturnType<typeof reduxStore.getState>;

/**
 * The dispatch function of the Redux store.
 *
 * This type is inferred from the type of `reduxStore.dispatch`.
 */
export type AppDispatch = typeof reduxStore.dispatch;

export enum LoadingStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  FULLFILLED = 'FULLFILLED',
  REJECTED = 'REJECTED'
}

/**
 * Custom hook to dispatch actions to the Redux store.
 *
 * @returns A dispatch function for dispatching actions.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Custom hook to select state from the Redux store.
 *
 * @type {TypedUseSelectorHook<RootState>}
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;