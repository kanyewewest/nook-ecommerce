import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { SERVER_PORT } from './config';

class App {
  private app: express.Application;
  constructor() {
    this.app = express();

    this.initMiddleware();
    this.initControllers();
  }

  private initMiddleware() {
    this.app.use(morgan('dev'));
    this.app.use(
      bodyParser.json({
        limit: '5mb',
      }),
    );
    this.app.use(cors());
  }

  private initControllers() {
    // eslint-disable-next-line no-console
    console.log('lol');
  }

  listen() {
    this.app.listen(SERVER_PORT, () => {
      // eslint-disable-next-line no-console
      console.log(
        `App listening on ${SERVER_PORT} in ${this.app.get('env')} mode.`,
      );
    });
  }
}

export default App;
