var optimist = require('optimist'),
    http = require('http'),
    express = require('express'),
    path = require('path'),
    logger = require('winston'),
    argv,
    app,

    rootFolder = path.join(__dirname, '../content');

/*handle cli arguments*/
argv = optimist
    .usage('Usage: $0 --port [portNum]')
    .alias('p', 'port')
    .describe('p', 'Listen on port')
    .default('port', 8080)
    .argv;

app = express()
    .use(express.favicon())
    .use(express.logger('dev'))
    .use(express.bodyParser())
    .use(express.static(rootFolder))
    .use(express.directory(rootFolder))
;

function run() {
    var server;
    logger.info('- Mock server is running at port [', argv.port, ']');
    http.createServer(app).listen(argv.port);
}

run();
