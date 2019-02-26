const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const routes = require('./routes');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

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

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));