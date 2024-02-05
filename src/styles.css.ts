import { globalStyle } from '@vanilla-extract/css';

globalStyle('html, body, #root', {
  margin: 0,
  padding: 0,
  height: '100%',
  fontFamily: 'Inter'
});

globalStyle('#root', {
  backgroundColor: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
