import config, { KnownConfigKey } from './utils/config';
import {httpCalls} from './utils/httpCalls';
config.init();
import { app } from './app';
import { connectDb } from './routesHendlers/store';

async function init(){
await connectDb();
const port = +config.get(KnownConfigKey.ServerPort, '3000');
app.set('port', port);

const server = app.listen(app.get('port'), () => {
    console.log(
      '  App is running at http://localhost:%d in %s mode',
      app.get('port'),
      app.get('env'),
    );
    console.log('  Press CTRL-C to stop\n');
  });
}

init().catch(err => console.log('Error', err));
//httpCalls();
