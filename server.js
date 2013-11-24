var optimist = require('optimist'),
    http = require('http'),
    express = require('express'),
    path = require('path'),
    logger = require('winston'),
    argv,
    app,
    rootFolder,
    hourMs
;


/*handle cli arguments*/
argv = optimist
    .usage('Usage: $0 --port [portNum] --folder [folderName]')
    .alias('p', 'port')
    .describe('p', 'Listen on port')
    .default('port', 8080)
    .alias('f', 'folder')
    .describe('f','Folder to serve')
    .default('folder','/home/azureuser/Downloads/')
    .argv;

hourMs = 1000*60*60;

rootFolder = argv.folder;

app = express()
    .use(express.favicon())
    .use(express.logger(/*'dev'*/))
    //.use(express.bodyParser())
    .use(express.static(rootFolder, { maxAge: hourMs }))
    .use(express.directory(rootFolder))
    .use(express.errorHandler());
;

function run() {
    var server;
    logger.info('* Mock server is running at port [', argv.port, ']');
    logger.info('* Serving folder [', rootFolder, ']'); 
    http.createServer(app).listen(argv.port);
}

run();
