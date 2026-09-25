import { useColorScheme } from 'react-native';

import { Colors, Theme } from '../constants/theme';

export function useTheme(): { theme: Theme; scheme: 'light' | 'dark' } {
  const colorScheme = useColorScheme();
  const scheme = colorScheme === 'dark' ? 'dark' : 'light';

  return { theme: Colors[scheme], scheme };
}