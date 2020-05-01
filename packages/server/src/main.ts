import { Fetcher } from '@ne/fetcher';

import App from './app';
import { GOOGLE_DOCUMENT_ID, GOOGLE_SHEETS_API_KEY } from './config';

(async () => {
  const fetcher = new Fetcher(GOOGLE_DOCUMENT_ID, GOOGLE_SHEETS_API_KEY, true);
  await fetcher.loadDoc();
  await fetcher.fetchWallMounts();

  const app = new App();
  app.listen();
})();
