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

const rollTheDice = (socket) => {

  const game = games[GameService.utils.findGameIndexBySocketId(games, socket.id)]
  const dices = game.gameState.deck.dices

  game.gameState.grid = GameService.grid.resetcanBeCheckedCells(game.gameState.grid)
  sendGridGameState(game)

  const rollsCounter = game.gameState.deck.rollsCounter
  const rollsMaximum = game.gameState.deck.rollsMaximum

  game.gameState.deck.dices = GameService.dices.roll(dices)
  game.gameState.deck.rollsCounter += 1

  if(rollsCounter === rollsMaximum) {
    game.gameState.deck.dices = GameService.dices.lockEveryDice(
        game.gameState.deck.dices
    )

    setTimeout(() => {
      if(Object.keys(game.gameState.choices.availableChoices).length === 0) {
        game.gameState.timer = 5
      }
    }, 1000)
  }

  sendDeckGameState(game)
}

const lockADice = (socket, idDice) => {
  const game = games[GameService.utils.findGameIndexBySocketId(games, socket.id)]
  const diceIndex = GameService.utils.findDiceIndexByDiceId(game.gameState.deck.dices, idDice)

  game.gameState.deck.dices[diceIndex].locked = !game.gameState.deck.dices[diceIndex].locked;

  sendDeckGameState(game)
}

const calculateTokensLeft = (game) => {
  if(game.gameState.currentTurn === 'player:1') {
    game.gameState.player1Tokens = game.gameState.player1Tokens - 1
  } else {
    game.gameState.player2Tokens = game.gameState.player2Tokens - 1
  }
}

const sendDeckGameState = (game) => {
  game.player1Socket.emit(
      "game.deck.view-state",
      GameService.send.forPlayer.deckViewState("player:1", game.gameState)
  );
  game.player2Socket.emit(
      "game.deck.view-state",
      GameService.send.forPlayer.deckViewState("player:2", game.gameState)
  );
};

const sendChoicesGameState = (game) => {
  game.player1Socket.emit(
      "game.choices.view-state",
      GameService.send.forPlayer.choicesViewState("player:1", game.gameState)
  );
  game.player2Socket.emit(
      "game.choices.view-state",
      GameService.send.forPlayer.choicesViewState("player:2", game.gameState)
  );
};

const sendGridGameState = (game) => {
  game.player1Socket.emit(
      "game.grid.view-state",
      GameService.send.forPlayer.gridViewState("player:1", game.gameState)
  );
  game.player2Socket.emit(
      "game.grid.view-state",
      GameService.send.forPlayer.gridViewState("player:2", game.gameState)
  );
};

const updateClientsViewTimers = (game) => {
  setTimeout(() => {
    game.player1Socket.emit(
        "game.timer",
        GameService.send.forPlayer.gameTimer("player:1", game.gameState)
    );
    game.player2Socket.emit(
        "game.timer",
        GameService.send.forPlayer.gameTimer("player:2", game.gameState)
    );
  }, 200)
};

const updateClientViewTokens = (game) => {
  const player1Tokens = game.gameState.player1Tokens
  const player2Tokens = game.gameState.player2Tokens

    game.player1Socket.emit(
        "game.token",
        { playerTokens: player1Tokens, opponentTokens: player2Tokens }
    );
    game.player2Socket.emit(
        "game.token",
        { playerTokens: player2Tokens, opponentTokens: player1Tokens }
    );
};

const displayAvailableChoices = (socket) => {
  const gameIndex = GameService.utils.findGameIndexBySocketId(games, socket.id)
  const grid = games[gameIndex].gameState.grid

  const dices = games[gameIndex].gameState.deck.dices
  const isDefi = false
  const isSec = games[gameIndex].gameState.deck.rollsCounter === 2
  const combinations = GameService.choices.findCombinations(dices, isDefi, isSec)
  const updatedCombinations = []

  grid.map(row => row.map(cell => {
    if ((combinations.find(element => element.id === cell.id) !== undefined) && (cell.owner === null)) {
      console.log("wtf ?")
      updatedCombinations.push(combinations.find(element => element.id === cell.id))
    }
  }));

  games[gameIndex].gameState.choices.availableChoices = updatedCombinations.filter((element, index, self) =>
          index === self.findIndex(t => (
              t.value === element.value && t.id === element.id
          ))
  )
  sendChoicesGameState(games[gameIndex])
}

const createGame = (player1Socket, player2Socket) => {

  const newGame = GameService.init.gameState();
  newGame['idGame'] = uniqid();
  newGame['player1Socket'] = player1Socket;
  newGame['player2Socket'] = player2Socket;

  games.push(newGame);

  const gameIndex = GameService.utils.findGameIndexById(games, newGame.idGame);

  games[gameIndex].player1Socket.emit('game.start', GameService.send.forPlayer.viewGameState('player:1', games[gameIndex]));
  games[gameIndex].player2Socket.emit('game.start', GameService.send.forPlayer.viewGameState('player:2', games[gameIndex]));

  sendGridGameState(games[gameIndex])
  sendDeckGameState(games[gameIndex])

  const gameInterval = setInterval(() => {

    games[gameIndex].gameState.timer--;

    if (games[gameIndex].gameState.timer === 0) {

      GameService.utils.changeTurn(games[gameIndex])

      games[gameIndex].gameState.deck = GameService.init.deck();
      games[gameIndex].gameState.choices = GameService.init.choices()

      games[gameIndex].gameState.grid = GameService.grid.resetcanBeCheckedCells(games[gameIndex].gameState.grid)

      sendGridGameState(games[gameIndex])
      sendChoicesGameState(games[gameIndex])
      sendDeckGameState(games[gameIndex])
    }
    updateClientsViewTimers(games[gameIndex])

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

  socket.on("game.dices.roll", () => {
    rollTheDice(socket)
    displayAvailableChoices(socket)
  });

  socket.on("game.dices.lock", (idDice) => {
    lockADice(socket, idDice)
  });

  socket.on('game.choices.selected', (data) => {
    const gameIndex = GameService.utils.findGameIndexBySocketId(games, socket.id);
    games[gameIndex].gameState.choices.idSelectedChoice = data.choiceId;
    games[gameIndex].gameState.grid = GameService.grid.resetcanBeCheckedCells(games[gameIndex].gameState.grid)

    sendChoicesGameState(games[gameIndex]);
    games[gameIndex].gameState.grid = GameService.grid.updateGridAfterSelectingChoice(data.choiceId, games[gameIndex].gameState.grid)
    sendGridGameState(games[gameIndex])
  });

  socket.on('game.grid.selected', (data) => {

    const gameIndex = GameService.utils.findGameIndexBySocketId(games, socket.id);

    games[gameIndex].gameState.grid = GameService.grid.resetcanBeCheckedCells(games[gameIndex].gameState.grid);
    games[gameIndex].gameState.grid = GameService.grid.selectCell(data.cellId, data.rowIndex, data.cellIndex, games[gameIndex].gameState.currentTurn, games[gameIndex].gameState.grid);

    calculateTokensLeft(games[gameIndex])

    updateClientViewTokens(games[gameIndex])

    if (games[gameIndex].gameState.player1Tokens === 0 || games[gameIndex].gameState.player2Tokens === 0) {
      return 0
    }

    // TODO: Ici calculer le score
    // TODO: Puis check si la partie s'arrête (lines / diagolales / no-more-gametokens)

    GameService.utils.changeTurn(games[gameIndex])
    games[gameIndex].gameState.deck = GameService.init.deck();
    games[gameIndex].gameState.choices = GameService.init.choices();

    games[gameIndex].player1Socket.emit('game.timer', GameService.send.forPlayer.gameTimer('player:1', games[gameIndex].gameState));
    games[gameIndex].player2Socket.emit('game.timer', GameService.send.forPlayer.gameTimer('player:2', games[gameIndex].gameState));

    sendDeckGameState(games[gameIndex]);
    sendChoicesGameState(games[gameIndex]);
    sendGridGameState(games[gameIndex]);
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

http.listen(3000, function () {
  console.log('listening on *:3000');
});