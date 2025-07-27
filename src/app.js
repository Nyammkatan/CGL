const Game = require('./game');
const { readArguments } = require("./utils");

const args = process.argv.slice(2); // skip node and script path
const game = new Game(500);

const argumentsResult = readArguments(args);
if (argumentsResult["resultType"] == "generation"){
    game.generateRandomGrid(argumentsResult.rows, argumentsResult.cols);
    game.run();
} else
if (argumentsResult["resultType"] == "input"){
    game.setGrid(argumentsResult.grid)
    game.run();
} else {
    console.log('Usage:\n  node src/app.js <rows> <cols>\n  node src/app.js <filepath>');
}