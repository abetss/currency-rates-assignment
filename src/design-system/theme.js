import { colors } from './colors';

export const theme = {
  breakpoints: [`32rem`, `48rem`, `64rem`],
  fontSizes: [12, 14, 16, 20, 24, 36, 48, 80, 96],
  fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  fontFamily: {
    regular: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif`,
    bold: 'open-sans-bold',
    code: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace`
  },
  lineHeights: {
    solid: 1,
    title: 1.25,
    copy: 1.5
  },
  letterSpacings: {
    normal: 'normal',
    tracked: '0.1em',
    tight: '-0.05em',
    mega: '0.25em'
  },
  borders: ['1px solid', '2px solid', '4px solid'],
  radii: [2, 4, 8, 16, 32, 9999, '100%'],
  space: ['4px', '8px', '16px', '32px', '64px', '128px', '256px'],
  sizes: ['16px', '32px', '64px', '128px', '256px', '512px', '1024px'],
  colors
};
