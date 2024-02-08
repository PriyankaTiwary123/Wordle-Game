import { createVar } from '@vanilla-extract/css';

export const colors = {
  primaryColor: createVar(),
  secondaryColor: createVar(),
  textPrimary: createVar(),
  successColor: createVar(),
  warningColor: createVar()
};

export const vars = {
  [colors.primaryColor]: '#007bff',
  [colors.secondaryColor]: '#6c757d',
  [colors.textPrimary]: '#ffffff',
  // Define other color variable values here
};
