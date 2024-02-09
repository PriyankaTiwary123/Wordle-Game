import { style, globalStyle } from '@vanilla-extract/css';

export const rootStyles = style({
 height: '100vh',
 width: '100%',
 display: 'contents'
});

globalStyle('html, body, #root', {
  margin: 0,
  padding: 0,
  height: '100%',
  fontFamily: 'Inter'
});

globalStyle('#root', {
  backgroundImage: `linear-gradient(to bottom, #212226, #000000)`,
  display: 'flex',
  color: '#ffffff',
  alignItems: 'center',
  justifyContent: 'center',
});
