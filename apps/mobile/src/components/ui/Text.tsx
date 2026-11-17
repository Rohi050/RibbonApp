import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { useTheme, type Theme } from '@/theme';

type Variant = keyof Theme['typography'];

export type TextProps = RNTextProps & {
  variant?: Variant;
  muted?: boolean;
  color?: string;
};

export function Text({ variant = 'body', muted, color, style, ...rest }: TextProps) {
  const { colors, typography } = useTheme();
  return (
    <RNText
      style={[
        typography[variant],
        { color: color ?? (muted ? colors.textMuted : colors.text), textAlign: 'auto' },
        style,
      ]}
      {...rest}
    />
  );
}
