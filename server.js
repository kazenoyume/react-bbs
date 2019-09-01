const express              = require('express');
const bodyParser           = require('body-parser');
const compression          = require('compression');
const app                  = express();
const cors                 = require('cors');
const server               = require('http').Server(app);
const httpStatus = require('http-status-codes');
const router    = express.Router();
const corsOptions = {
    exposedHeaders: 'Authorization'
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(compression());

app.enable('trust proxy');
app.set('trust proxy', function() { return true; });

process
    .on('SIGTERM', function() {
        process.exit(0);
    })
    .on('SIGINT', function() {
        process.exit(0);
    });


    server.listen('8888', () => {
        console.log('[Server]' , 'Listen on ' + '8888');
    });



app.post('/login', (req, resp) => {
  let data ='succes'
  return  resp.status(httpStatus.OK).json(data);
});