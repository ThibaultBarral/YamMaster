const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var uniqid = require('uniqid');
const GameService = require('./services/game.service');

// ---------------------------------------------------
// -------- CONSTANTS AND GLOBAL VARIABLES -----------
// ---------------------------------------------------
let games = [];
let queue = [];

// ---------------------------------
// -------- GAME METHODS -----------
// ---------------------------------

const newPlayerInQueue = (socket) => {

  queue.push(socket);

  // Queue management
  if (queue.length >= 2) {
    const player1Socket = queue.shift();
    const player2Socket = queue.shift();
    createGame(player1Socket, player2Socket);
  }
  else {
    socket.emit('queue.added', GameService.send.forPlayer.viewQueueState());
  }
};

const playerOutQueue = (socket) => {
  queue = queue.filter((sock) => sock.id !== socket.id);
};

const playerOutGame = (socket) => {

  games = games.filter((game) => game.player1Socket.id !== socket.id && game.player2Socket.id !== socket.id);

  socket.emit('queue.added', GameService.send.forPlayer.viewQueueState());
};

const createGame = (player1Socket, player2Socket) => {

    const newGame = GameService.init.gameState();
    newGame['idGame'] = uniqid();
    newGame['player1Socket'] = player1Socket;
    newGame['player2Socket'] = player2Socket;

    games.push(newGame);

    const gameIndex = GameService.utils.findGameIndexById(games, newGame.idGame);

    games[gameIndex].player1Socket.emit('game.start', GameService.send.forPlayer.viewGameState('player:1', games[gameIndex]));
    games[gameIndex].player2Socket.emit('game.start', GameService.send.forPlayer.viewGameState('player:2', games[gameIndex]));

    games[gameIndex].player1Socket.emit('game.deck', GameService.send.forPlayer.deckViewState('player:1', games[gameIndex].gameState));
    games[gameIndex].player2Socket.emit('game.deck', GameService.send.forPlayer.deckViewState('player:2', games[gameIndex].gameState));

    const gameInterval = setInterval(() => {

        games[gameIndex].gameState.timer--;
        if (games[gameIndex].gameState.timer === 0) {
            games[gameIndex].gameState.currentTurn = games[gameIndex].gameState.currentTurn === 'player:1' ? 'player:2' : 'player:1';
            games[gameIndex].gameState.timer = GameService.timer.getTurnDuration();
            games[gameIndex].gameState.deck = GameService.init.deck();
            games[gameIndex].player1Socket.emit('game.deck', GameService.send.forPlayer.deckViewState('player:1', games[gameIndex].gameState));
            games[gameIndex].player2Socket.emit('game.deck', GameService.send.forPlayer.deckViewState('player:2', games[gameIndex].gameState));
        }
    }, 1000);


    player1Socket.on('disconnect', () => {
        clearInterval(gameInterval);
    });

    player2Socket.on('disconnect', () => {
        clearInterval(gameInterval);
    });
};

// ---------------------------------------
// -------- SOCKETS MANAGEMENT -----------
// ---------------------------------------

io.on('connection', socket => {
  console.log(`[${socket.id}] socket connected`);

  socket.on('queue.join', () => {
    console.log(`[${socket.id}] new player in queue `)
    newPlayerInQueue(socket);
  });

  socket.on('queue.leave', () => {
    console.log(`[${socket.id}] player out of queue `)
    playerOutQueue(socket);
  });

  socket.on('disconnect', reason => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
    playerOutQueue(socket);
  });
});

// -----------------------------------
// -------- SERVER METHODS -----------
// -----------------------------------

app.get('/', (req, res) => res.sendFile('index.html'));

http.listen(3000, function(){
  console.log('listening on *:3000');
});