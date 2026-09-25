import { StyleSheet, Text, View } from 'react-native';

import { Note } from '../database';
import { useTheme } from '../hooks/useTheme';
import { formatDate } from '../utils/formatDate';

type NoteItemProps = { note: Note };

export default function NoteItem({ note }: NoteItemProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{note.title}</Text>
      <Text style={[styles.body, { color: theme.text }]} numberOfLines={2}>{note.body}</Text>
      <Text style={[styles.date, { color: theme.text }]}>{formatDate(note.created_at)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 8, borderWidth: 1, marginBottom: 12, padding: 16 },
  title: { fontSize: 17, fontWeight: '700' },
  body: { fontSize: 15, lineHeight: 21, marginTop: 6, opacity: 0.8 },
  date: { fontSize: 12, marginTop: 10, opacity: 0.6 },
});