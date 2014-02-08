var optimist = require('optimist'),
    http = require('http'),
    express = require('express'),
    fs = require('fs'),
    logger = require('winston'),
    _ = require('lodash'),
    argv,
    app,
    contentFolder,
    hourMs,
    users,
    usersFile = __dirname + '/users.json'
    ;


/*handle cli arguments*/
argv = optimist
    .usage('Usage: $0 --port [portNum] --folder [folderName]')
    .alias('p', 'port')
    .describe('p', 'Listen on port')
    .default('port', 8080)
    .alias('f', 'folder')
    .describe('f', 'Folder to serve')
    .default('folder', process.env.HOME + '/Downloads/')
    .argv;

hourMs = 1000 * 60 * 60;

contentFolder = argv.folder;
if (fs.existsSync(usersFile)){
    users = JSON.parse(fs.readFileSync(usersFile));
    if (users && users.users) {
        users = users.users;
    }
}
if (!users){
    console.log('** WARNING: No "users.json" file found. No authentication will be required! **');
}


app = express()
    .use(express.favicon())
    .use(express.logger(/*'dev'*/))
    //.use(express.bodyParser())
    .use(express.basicAuth(function(username, password) {
        if (!users) {
            return true;
        }
        if (!(username && password)) {
            return false;
        }
        var user = _(users).find(function(item) {
            return item.name === username;
        });
        if (!user) {
            return false;
        }
        return (password === user.password);
    }))
    .use(express.static(contentFolder, { maxAge: hourMs }))
    .use(express.directory(contentFolder))
    .use(express.errorHandler());


function run() {
    var server;
    logger.info('* Mock server is running at port [', argv.port, ']');
    logger.info('* Serving folder [', contentFolder, ']');
    http.createServer(app).listen(argv.port);
}

run();
