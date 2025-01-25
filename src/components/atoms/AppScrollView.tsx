import React, { ReactNode, useRef, useState } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, View } from 'react-native';
import { useAppTheme } from '@app/theme';
import AppVectorIcon, { IconType } from './AppVectorIcon';
import { useAnimatedStyle, withRepeat, withSpring } from 'react-native-reanimated';  // Import necessary reanimated hooks

interface AppScrollViewProps extends ScrollViewProps {
  children?: ReactNode | ReactNode[];
  enableScrollToTop?: boolean;
}

const AppScrollView = ({
  children,
  enableScrollToTop,
  ...props
}: AppScrollViewProps) => {
  const theme = useAppTheme();
  const [isMove2TopEnable, setIsMove2TopEnable] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  const onMove2TopClick = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  // Reanimated bounce style for the scroll to top button
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withRepeat(withSpring(1.2), -1, true),
        },
      ],
    };
  });

  return (
    <>
      <ScrollView
        onScroll={(event) => {
          const offsetY = event.nativeEvent.contentOffset.y;
          setIsMove2TopEnable(offsetY > 1000);
        }}
        overScrollMode="never"
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        ref={scrollRef}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        {...props}
      >
        {children}
      </ScrollView>

      {enableScrollToTop && isMove2TopEnable && (
        <View style={[styles.iconContainer, animatedStyle]}>
          <AppVectorIcon
            onPress={onMove2TopClick}
            style={styles.icon}
            name="arrow-circle-up"
            type={IconType.MaterialIcons}
            size={40}
            color={theme.colors.text}
          />
        </View>
      )}
    </>
  );
};

export default AppScrollView;

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    zIndex: 10,
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
});
