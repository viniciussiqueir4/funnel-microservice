import 'dotenv/config';

import app from './app';

import cmdline from 'node-cmdline-parser';

if (cmdline.keyexists('server')) {
  app.listen(process.env.APP_PORT, () => {
    console.log(`App started on http://localhost:${process.env.APP_PORT}`);
  });
}
