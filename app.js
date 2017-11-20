//the require modules
var http = require('http');
var url = require('url');
//deal with file paths
const path = require('path');
//file systems
const fs = require('fs');

// array of mimetypes
var mimeTypes = {
    "txt": "text/plain",
    "html": 'text/html',
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": 'text/javascript',
    "css": "text/css",
    "svg": "image/svg+xml"
};

//create server function
http.createServer(function(req, res) {
    //this is to pass request url
    var uri = url.parse(req.url).pathname;
    //return the current directory of the process 
    var fileName = path.join(process.cwd(), unescape(uri));
    console.log(`loading ${uri}`);

    var stats;
    try {
        stats = fs.lstatSync(fileName);
    } catch (e) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found\n');
        res.end();
        return;
    }
    // check if its a file or a directory
    if (stats.isFile()) {
        //gets the path, then the extension of the file
        var mimeType = mimeTypes[path.extname(fileName).split('.').reverse()[0]];
        res.writeHead(200, { 'Content-Type': mimeType });

        // This line opens the file as a readable stream
        var fileStream = fs.createReadStream(fileName);
        // This just pipes the read stream to the response object (which goes to the client)
        fileStream.pipe(res);

    } else if (stats.isDirectory()) {
        res.writeHead(302, {
            'Location': 'index.html'
        });
        res.end();
    } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('500 Internal Error');
        res.end();
    }
}).listen(8081)
console.log('Server Running');