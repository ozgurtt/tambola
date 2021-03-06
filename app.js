var handler = function(req, res) {

    var request = url.parse(req.url, true);
    var action = request.pathname;
     
    if (action == '/loading.gif') {
        var img = fs.readFileSync('./loading.gif');
        res.writeHead(200, {'Content-Type': 'image/gif' });
        res.end(img, 'binary');
    }
    else { 
        fs.readFile('./index.html', function (err, data) {
            if(err){
                throw err;
            }
            res.writeHead(200);
            res.end(data);
        });    
    }
}

var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var url = require('url');

var port = process.env.PORT || 3000;
 
app.listen(port);

io.sockets.on('connection', function (socket) {
    
    socket.on("click", function(userName) {
	
    	var user = addUser(userName);
    
    	socket.emit("welcome", user);
    
	    socket.on('disconnect', function () {
	        removeUser(user);
	    });

    });

    socket.on("sendCall", function(randomNum, numbersCalled){
    	io.sockets.emit('printCall', {randomNum: randomNum, numbersCalled: numbersCalled});
    });

    socket.on("gameOver", function(userName, gameWin){
        io.sockets.emit('gameFinish', {userName: userName, gameWin: gameWin});
    });
    socket.on("finish", function(){
        io.sockets.emit('gFinish');
    });
});

var users = [];

var addUser = function(userName) {
    var user = {
        name: userName
    }
    users.push(user);
    updateUsers();
    return user;
}
var removeUser = function(user) {
    for(var i=0; i<users.length; i++) {
        if(user.name === users[i].name) {
            users.splice(i, 1);
            updateUsers();
            if(users.length === 1){
    			io.sockets.emit("gameLeft");	
    		}
            return;
        }
    }
}
var updateUsers = function() {
    var str = '';
    for(var i=0; i<users.length; i++) {
        var user = users[i];
        str += user.name + ' ';
    }
    io.sockets.emit("users", { users: str, onlineUsersNum: users.length});
}