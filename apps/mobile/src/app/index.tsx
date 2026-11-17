import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Text } from '@/components/ui';
import { useI18n } from '@/i18n';
import { useTheme } from '@/theme';

export default function WelcomeScreen() {
  const { colors, spacing, radius } = useTheme();
  const { t, rtl, language, setLanguage } = useI18n();

  return (
    <SafeAreaView
      // `direction` mirrors this subtree instantly (no app restart needed),
      // so you can watch the RTL layout flip live while developing.
      style={[styles.safe, { backgroundColor: colors.background, direction: rtl ? 'rtl' : 'ltr' }]}
    >
      <View style={[styles.topBar, { paddingHorizontal: spacing.xl }]}>
        <View style={[styles.badge, { backgroundColor: colors.tint, borderRadius: radius.pill }]}>
          <View style={[styles.dot, { backgroundColor: colors.primary }]} />
          <Text variant="caption" color={colors.primary}>
            {t('welcome.devBadge')}
          </Text>
        </View>
        <Button
          variant="ghost"
          label={t('welcome.switchLanguage')}
          onPress={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          style={styles.langButton}
        />
      </View>

      <View style={[styles.hero, { paddingHorizontal: spacing.xl }]}>
        <Animated.View
          entering={FadeInDown.duration(600).springify()}
          style={[styles.mark, { backgroundColor: colors.primary, borderRadius: radius.lg }]}
        >
          <Text variant="display" color={colors.primaryText} style={styles.markLetter}>
            {language === 'ar' ? 'ت' : 'T'}
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).duration(600)}>
          <Text variant="display" style={styles.center}>
            {t('welcome.brand')}
          </Text>
          <Text variant="title" color={colors.primary} style={[styles.center, styles.tagline]}>
            {t('welcome.tagline')}
          </Text>
          <Text muted style={[styles.center, { marginTop: spacing.lg }]}>
            {t('welcome.body')}
          </Text>
        </Animated.View>
      </View>

      <Animated.View
        entering={FadeInUp.delay(260).duration(600)}
        style={{ paddingHorizontal: spacing.xl, paddingBottom: spacing.xl }}
      >
        <Button label={t('welcome.cta')} onPress={() => undefined} />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  dot: { width: 7, height: 7, borderRadius: 4 },
  langButton: { minHeight: 38, paddingHorizontal: 16 },
  hero: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 24 },
  mark: { width: 88, height: 88, alignItems: 'center', justifyContent: 'center' },
  markLetter: { lineHeight: 44 },
  center: { textAlign: 'center' },
  tagline: { marginTop: 6 },
});
