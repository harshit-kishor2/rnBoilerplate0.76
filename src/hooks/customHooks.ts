import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TFunction} from 'i18next';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-paper';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

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

/**
 * Custom hook to access the current theme.
 *
 * @returns The current theme object.
 */
export const useAppTheme = () => {
  const theme = useTheme<IAppTheme>();
  return theme;
};

/**
 * Custom hook to access the translation function.
 *
 * @returns A function for translating strings.
 */
export const useAppTranslation = (): TFunction<'en', undefined> => {
  const {t: translate} = useTranslation();
  return translate;
};


/**
 * Custom hook to access the navigation object for a specific screen.
 *
 * @param _screenName The name of the screen in the root stack.
 * @returns The navigation object for the specified screen.
 */
export const useAppNavigation = <T extends keyof RootStackParamList>(_screenName: T) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, T>>();
  return navigation;
};


/**
 * Custom hook to access the route object for a specific screen.
 *
 * @param _screenName The name of the screen in the root stack.
 * @returns The route object for the specified screen.
 */
export const useAppRoute = <T extends keyof RootStackParamList>(_screenName: T) => {
  const route = useRoute<RouteProp<RootStackParamList, T>>();
  return route;
};