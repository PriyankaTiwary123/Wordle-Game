import { style, globalStyle } from '@vanilla-extract/css'
import { colors } from '../../colors.css';

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
  color: '#ffffff',
  background: 'transparent',
  textAlign: 'center',
  border: '2px solid #3A3A3C',
  fontSize: '32px',
  fontWeight: '700',
  textTransform: 'uppercase',
  cursor: 'pointer',
});
export const wordMatched = style({
  backgroundColor: '#538D4E',
});

export const wordInGrid = style({
  backgroundColor: '#BEA11F',
});

export const wordNotInGrid = style({
  backgroundColor: '#3A3A3C',
});

globalStyle(`${cellInput}:focus`, {
  outline: 'none',
});
