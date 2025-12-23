import type { FileTypes } from '../../../libs/file-interface';

export const fileTypes: FileTypes = [
  {
    description: 'Text files',
    accept: {
      'text/plain': ['.txt'],
    },
  },
];
