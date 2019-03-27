const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const routes = require('./routes');
const cors = require ('cors');
const path = require('path')
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);


if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req,res) => {
      res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
  
app.use(cors());
// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// setup a global error handler
app.use((err, req, res, next) => {
    if (enableGlobalErrorLogging) {
        console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
    }
  
    res.status(err.status || 500).json({
        message: err.message,
        error: {},
    });
});

// set our port
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
