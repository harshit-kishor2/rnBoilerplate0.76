import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './utils';

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

