var http = require('http');
var socketio=require('socket.io');
var fs=require('fs');
//var datasource=require('./apps/respository/datasource');
var datasource=require('./apps/respository/datasourceCSharp');

var handler=function(req, res) {
    if(req.url.indexOf('.js')!=-1 || req.url.indexOf('.css')!=-1)  {
        var requestfiletype='javascript';
        if(req.url.indexOf('.css')!=-1) {
            requestfiletype='css';
        }
        var urlPathBreaks=req.url.split("/");
        fs.readFile(__dirname +'/apps/view/'+requestfiletype+'/'+ urlPathBreaks[urlPathBreaks.length-1], function(err, data) {
                if (err){
                    res.writeHead(500);
                    return res.end('Error loading server source code.');
                } else {
                    res.writeHead(200);
                    res.end(data);
                }
            });
    } else  {
        if (req.url.indexOf('lineChart.html')!=-1) {
            fs.readFile(__dirname + '/apps/view/lineChart.html', function (err, data) {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error loading server source code.');
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data);
                }
            });
        } else  {
            if (req.url.indexOf('columnChart.html')!=-1) {
                    fs.readFile(__dirname + '/apps/view/columnChart.html', function (err, data) {
                    if (err) {
                        res.writeHead(500);
                        return res.end('Error loading server source code.');
                    } else {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(data);
                    }
                });
            } else {
                    if (req.url.indexOf('barChart.html')!=-1) {
                            fs.readFile(__dirname + '/apps/view/barChart.html', function (err, data) {
                            if (err) {
                                res.writeHead(500);
                                return res.end('Error loading server source code.');
                            } else {
                                res.writeHead(200, {'Content-Type': 'text/html'});
                                res.end(data);
                            }
                        });
                    } else {
                            fs.readFile(__dirname + '/apps/view/index.html', function (err, data) {
                                if (err) {
                                    res.writeHead(500);
                                    return res.end('Error loading server source code.');
                                } else {
                                    res.writeHead(200, {'Content-Type': 'text/html'});
                                    res.end(data);
                               }
                            });
                   }
           }
        }
    }
};

var port = process.env.port || 8080;
var app=http.createServer(handler)
var io=socketio.listen(app);

io.sockets.on('connection', function(socket) {
    setInterval(function() {
        if(socket.id!=null) {
                var mockDate=datasource.profile();
                socket.emit('timer', mockDate);
        }
    }, 1000);
});

app.listen(port); 

console.log('Server running!');