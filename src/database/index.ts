import * as SQLite from 'expo-sqlite';

export type Note = {
  id: number;
  title: string;
  body: string;
  created_at: string;
};

let database: SQLite.SQLiteDatabase | null = null;

export async function initDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (database) {
    return database;
  }

  database = await SQLite.openDatabaseAsync('notes.db');
  await database.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  return database;
}

export async function addNote(title: string, body: string): Promise<number> {
  const db = await initDatabase();
  const result = await db.runAsync(
    'INSERT INTO notes (title, body, created_at) VALUES (?, ?, ?)',
    title,
    body,
    new Date().toISOString(),
  );
  return result.lastInsertRowId;
}

export async function getNotes(): Promise<Note[]> {
  const db = await initDatabase();
  return db.getAllAsync<Note>('SELECT id, title, body, created_at FROM notes ORDER BY created_at DESC');
}

export async function getNoteById(id: number): Promise<Note | null> {
  const db = await initDatabase();
  return db.getFirstAsync<Note>('SELECT id, title, body, created_at FROM notes WHERE id = ?', id);
}