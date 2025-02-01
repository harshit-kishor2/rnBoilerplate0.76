import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
  TabActions,
} from "@react-navigation/native";
import {createRef, MutableRefObject} from "react";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const isReadyRef: MutableRefObject<boolean | null> = createRef<
  boolean | null
>();

function prepareParams(params: any, fromRouteName: string) {
  return {...params, fromRouteName};
}

function navigate({fromRouteName, routeName, params}: NavigateProps) {
  if (isReadyRef.current && navigationRef?.current) {
    navigationRef.current.navigate(
      routeName,
      prepareParams(params, fromRouteName)
    );
  } else {
    console.warn("Navigation is not ready");
  }
}

function goBack() {
  if (
    isReadyRef.current &&
    navigationRef?.current &&
    navigationRef.current.canGoBack()
  ) {
    navigationRef.current.goBack();
  } else {
    console.warn(
      "Cannot go back. Navigation is not ready or no previous screen"
    );
  }
}

const reset = (params: any) => {
  if (isReadyRef.current && navigationRef?.current) {
    navigationRef.current?.reset(params);
  } else {
    console.warn("Reset cannot be performed. Navigation is not ready");
  }
};

function resetRoot(params = {index: 0, routes: []}) {
  if (isReadyRef.current && navigationRef?.current) {
    navigationRef.current?.resetRoot(params);
  } else {
    console.warn("Reset root cannot be performed. Navigation is not ready");
  }
}

function navigateAndReset({fromRouteName, routeName, params}: NavigateProps) {
  if (isReadyRef.current && navigationRef?.current) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {name: routeName, params: prepareParams(params, fromRouteName)},
        ],
      })
    );
  } else {
    console.warn("Navigation is not ready for reset and navigate");
  }
}

const push = ({fromRouteName, routeName, params}: NavigateProps) => {
  if (isReadyRef.current && navigationRef?.current) {
    navigationRef.current?.dispatch(
      StackActions.push(routeName, prepareParams(params, fromRouteName))
    );
  } else {
    console.warn("Push cannot be performed. Navigation is not ready");
  }
};

const pop = (count?: number) => {
  if (isReadyRef.current && navigationRef?.current) {
    navigationRef.current?.dispatch(StackActions.pop(count));
  } else {
    console.warn("Pop cannot be performed. Navigation is not ready");
  }
};

const popToTop = () => {
  if (isReadyRef.current && navigationRef?.current) {
    navigationRef.current?.dispatch(StackActions.popToTop());
  } else {
    console.warn("Pop to top cannot be performed. Navigation is not ready");
  }
};

function replace({fromRouteName, routeName, params}: NavigateProps) {
  if (isReadyRef.current && navigationRef?.current) {
    navigationRef.current?.dispatch(
      StackActions.replace(routeName, prepareParams(params, fromRouteName))
    );
  } else {
    console.warn("Replace cannot be performed. Navigation is not ready");
  }
}

const jumpTo = (params: any) => {
  if (isReadyRef.current && navigationRef?.current) {
    navigationRef.current?.dispatch(TabActions.jumpTo(params));
  } else {
    console.warn("JumpTo cannot be performed. Navigation is not ready");
  }
};

const NavigationService = {
  navigate,
  replace,
  navigateAndReset,
  goBack,
  resetRoot,
  push,
  pop,
  popToTop,
  jumpTo,
  reset,
};

export default NavigationService;
