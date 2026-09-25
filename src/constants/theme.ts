export const Colors = {
  light: {
    background: '#F8FAFC',
    text: '#172033',
    primary: '#176B87',
    card: '#FFFFFF',
    border: '#D7E0E8',
  },
  dark: {
    background: '#101820',
    text: '#F2F6F8',
    primary: '#70C1B3',
    card: '#1A2730',
    border: '#34444F',
  },
} as const;

export type Theme = (typeof Colors)[keyof typeof Colors];