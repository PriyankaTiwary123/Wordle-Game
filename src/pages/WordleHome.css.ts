import { style, globalStyle } from '@vanilla-extract/css'

export const mainContainer = style({
    '@media': {
        '(max-width: 768px)': {
          margin: '20px'
        },
      },
})