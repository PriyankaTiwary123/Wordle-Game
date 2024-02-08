import { style } from '@vanilla-extract/css';

export const modalOverlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
});

export const modalContent = style({
  width: '260px',
  textAlign: 'center',
  fontSize: '11px',
  backgroundColor: 'rgba(63, 58, 58)',
  opacity:1,
  color: '#ffff',
  padding: '20px 16px 16px 16px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.7)',
  zIndex: 20,
});

