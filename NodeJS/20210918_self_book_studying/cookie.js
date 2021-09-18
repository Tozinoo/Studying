var http = require("http");

http.createServer(function (req, res) {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, { "Set-Cookie": "mycookie=test" });
    res.end("Hello World");
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
