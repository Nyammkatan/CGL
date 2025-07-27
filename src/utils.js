const fs = require('fs');

function readArguments(args) {
    if (args.length === 2 && !isNaN(args[0]) && !isNaN(args[1])) {
        const rows = parseInt(args[0]);
        const cols = parseInt(args[1]);
        return {
            rows, cols, "resultType": "generation"
        }
    } else if (args.length === 1) {
        const path = args[0];
        const grid = loadGridFromFile(path);
        return {
            grid, "resultType": "input"
        }
    } else {
        return {
            "resultType": "error"
        }
    }
}

function loadGridFromFile(path) {
  const raw = fs.readFileSync(path, 'utf-8');
  return raw.trim().split('\n').map(line =>
    line.trim().split(/\s+/).map(Number)
  );
}

module.exports = {
    loadGridFromFile,
    readArguments
};