import { Stack, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../src/hooks/useTheme';

export default function DetailsScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: 'About these notes' }} />
      <Text style={[styles.heading, { color: theme.text }]}>Local notes</Text>
      <Text style={[styles.body, { color: theme.text }]}>Your notes are saved on this device using SQLite and remain available when the app is offline.</Text>
      <Pressable onPress={() => router.back()} style={[styles.button, { borderColor: theme.border }]}>
        <Text style={[styles.buttonText, { color: theme.primary }]}>Go back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  heading: { fontSize: 26, fontWeight: '700', marginBottom: 12 },
  body: { fontSize: 16, lineHeight: 24, opacity: 0.8 },
  button: { alignSelf: 'flex-start', borderRadius: 8, borderWidth: 1, marginTop: 24, paddingHorizontal: 16, paddingVertical: 12 },
  buttonText: { fontSize: 16, fontWeight: '600' },
});