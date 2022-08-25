/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import fs from 'fs';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export function saveImage(newFileName: string, base64Data: any) {
  fs.writeFile(newFileName, base64Data, 'base64', (err) => {
    if (err) {
      console.error(err);
    } else {
      console.info('---SUCCESS---');
    }
  });
}
