import { Link } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import NoteItem from '../src/components/NoteItem';
import { addNote, getNotes, Note } from '../src/database';
import { useTheme } from '../src/hooks/useTheme';

export default function HomeScreen() {
  const { theme } = useTheme();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const loadNotes = useCallback(async () => {
    setLoading(true);
    try {
      setNotes(await getNotes());
    } catch (error: unknown) {
      console.error('Failed to load notes', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNotes();
  }, [loadNotes]);

  const handleAddNote = async () => {
    setAdding(true);
    try {
      await addNote('Sample note', 'This note was created locally on your device.');
      await loadNotes();
    } catch (error: unknown) {
      console.error('Failed to add note', error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.heading, { color: theme.text }]}>Your notes</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>Stored locally with SQLite</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={adding}
        onPress={handleAddNote}
        style={({ pressed }) => [styles.button, { backgroundColor: theme.primary, opacity: pressed || adding ? 0.7 : 1 }]}
      >
        {adding ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>Add sample note</Text>}
      </Pressable>

      <Link href="/details" asChild>
        <Pressable style={styles.detailsLink}>
          <Text style={[styles.linkText, { color: theme.primary }]}>Open details</Text>
        </Pressable>
      </Link>

      {loading ? (
        <ActivityIndicator color={theme.primary} style={styles.loader} />
      ) : (
        <FlatList
          contentContainerStyle={notes.length === 0 ? styles.emptyList : styles.list}
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={[styles.emptyText, { color: theme.text }]}>No notes yet.</Text>}
          renderItem={({ item }) => <NoteItem note={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 20 },
  heading: { fontSize: 30, fontWeight: '700' },
  subtitle: { fontSize: 15, marginTop: 4, opacity: 0.7 },
  button: { alignItems: 'center', borderRadius: 8, minHeight: 48, justifyContent: 'center', paddingHorizontal: 16 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  detailsLink: { alignSelf: 'flex-start', marginVertical: 16, paddingVertical: 4 },
  linkText: { fontSize: 16, fontWeight: '600' },
  loader: { marginTop: 32 },
  list: { paddingBottom: 24 },
  emptyList: { flexGrow: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 16, opacity: 0.7 },
});