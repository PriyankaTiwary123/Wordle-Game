import { style, globalStyle } from '@vanilla-extract/css';

export const wordleGridRow = style({
  display: 'flex',
  gap: '10px'
});

export const cellInput = style({
  width: '60px',
  height: '60px',
  marginTop: '10px',
  borderRadius: '4px',
  padding: '10px',
  color: '#ffffff',
  background: 'transparent',
  textAlign: 'center',
  border: '2px solid #3A3A3C',
  fontSize: '32px',
  fontWeight: '700',
  textTransform: 'uppercase',
  cursor: 'pointer',
  '@media': {
    '(max-width: 768px)': {
      width: 'calc(20% - 10px)', // Adjust width for responsiveness
      marginTop: '5px',
    },
  },
});
export const matched = style({
  backgroundColor: '#538D4E',
});

export const found = style({
  backgroundColor: '#BEA11F',
});

export const notFound = style({
  backgroundColor: 'transparent',
});

export const empty = style({
  backgroundColor: '#3A3A3C',
});

globalStyle(`${cellInput}:focus`, {
  outline: 'none',
});
