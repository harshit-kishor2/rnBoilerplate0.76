/**
 * This file defines the `GlobalModalContainer` component and related types.
 * The `GlobalModalContainer` component is a wrapper for a modal view.
 * It provides a way to show and hide the modal view from outside the component.
 * The modal view is only rendered if the `isLoading` prop is true.
 *
 * The [GlobalModalProps] interface defines the props for the `GlobalModalContainer` component.
 * It has two properties:
 * - `isLoading`: a boolean indicating whether the modal view should be shown.
 * - `children`: the content of the modal view.
 *
 * The [GlobalModalRef] type defines the shape of the reference object that can be used to control the modal view.
 * It has two methods:
 * - `hide`: a method that hides the modal view.
 * - `show`: a method that shows the modal view.
 *
 * The [GlobalModalViewRef] component is a functional component that renders the modal view.
 * It receives the [GlobalModalProps] as props and the [GlobalModalRef] as a ref.
 * It uses the `useState` and `useCallback` hooks to manage the state of the modal view and the methods to show and hide it.
 * The `useImperativeHandle` hook is used to expose the `hide` and `show` methods to the parent component through the ref.
 */

import React, {
  ReactNode,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';

export interface GlobalModalProps {
  isLoading: boolean;
  children: ReactNode;
}

export type GlobalModalRef = {
  hide: () => void;
  show: () => void;
};

export const GlobalModalViewRef = (
  props: GlobalModalProps,
  ref: React.Ref<GlobalModalRef>
) => {
  const {isLoading = false, children} = props;
  const [loading, setIsLoading] = useState(isLoading);

  const show = useCallback(() => setIsLoading(true), []);
  const hide = useCallback(() => setIsLoading(false), []);

  useImperativeHandle(
    ref,
    () => {
      return {
        hide,
        show,
      };
    },
    [hide, show]
  );

  if (!loading) return <></>;

  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};


/**
 * GlobalModalContainer is a React component that wraps a modal view.
 * It provides a way to show and hide the modal view from outside the component.
 * The modal view is only rendered if the `isLoading` prop is true.
 *
 * @example
 * <GlobalModalContainer isLoading={false} ref={loaderGlobalIndicator} >
 *   <ModalView />
 * </GlobalModalContainer>
 *
 * @param {GlobalModalProps} props
 * @param {React.Ref<GlobalModalRef>} ref
 * @returns {JSX.Element}
 */
const GlobalModalContainer = React.forwardRef<GlobalModalRef, GlobalModalProps>(
  GlobalModalViewRef
);

export default GlobalModalContainer;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
});