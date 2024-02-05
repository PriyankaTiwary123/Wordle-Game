import { style, globalStyle } from '@vanilla-extract/css'

export const wordleGridRow = style({
  display: 'flex',
  gap: '10px'
})

export const cellInput = style({
  width: '60px',
  height: '60px',
  marginTop: '10px',
  borderRadius: '4px',
  padding: '10px',
  color: '#fff',
  background: '#000',
  textAlign: 'center',
  border: '1px solid #3A3A3C',
  fontSize: '32px',
  fontWeight: '700',
  textTransform: 'uppercase',
  cursor: 'pointer',
});

globalStyle(`${cellInput}:focus`, {
  outline: 'none',
});
