import { style, globalStyle } from '@vanilla-extract/css'

export const wordleGrid = style({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#000000',
  gap: '10px',
  marginTop: '20px',
});

export const letterInput = style({
  width: '60px',
  height: '60px',
  marginTop: '10px',
  borderRadius: '4px',
  color: '#fff',
  border: '1px solid #3A3A3C',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '32px',
  fontWeight: '700',
  textTransform: 'uppercase',
  cursor: 'pointer',
});

globalStyle(`${letterInput}:focus`, {
  outline: 'none',
});
