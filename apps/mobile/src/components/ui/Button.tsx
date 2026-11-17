import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, type PressableProps, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { useTheme } from '@/theme';

import { Text } from './Text';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type ButtonProps = Omit<PressableProps, 'style'> & {
  label: string;
  variant?: 'primary' | 'ghost';
  style?: ViewStyle;
};

export function Button({ label, variant = 'primary', style, onPress, ...rest }: ButtonProps) {
  const { colors, radius, spacing } = useTheme();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.get() }] }));

  const isPrimary = variant === 'primary';

  return (
    <AnimatedPressable
      accessibilityRole="button"
      onPressIn={() => {
        scale.set(withSpring(0.96, { damping: 18, stiffness: 320 }));
      }}
      onPressOut={() => {
        scale.set(withSpring(1, { damping: 14, stiffness: 260 }));
      }}
      onPress={(e) => {
        void Haptics.selectionAsync().catch(() => undefined);
        onPress?.(e);
      }}
      style={[
        styles.base,
        {
          borderRadius: radius.pill,
          paddingHorizontal: spacing.xl,
          backgroundColor: isPrimary ? colors.primary : 'transparent',
          borderColor: isPrimary ? colors.primary : colors.border,
        },
        animatedStyle,
        style,
      ]}
      {...rest}
    >
      <Text
        variant="body"
        style={styles.label}
        color={isPrimary ? colors.primaryText : colors.text}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth * 2,
  },
  label: { fontWeight: '600' },
});
