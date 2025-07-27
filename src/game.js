class Game {
    
    constructor(updateInterval, grid=null){
        this.updateInterval = updateInterval;
        this.grid = grid;

    }

    generateRandomGrid(rows, cols){
        this.grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.random() < 0.3 ? 1 : 0));
    }

    setGrid(grid){
        this.grid = grid;
    }

    render() {
        console.clear();
        for (let row of this.grid) {
            console.log(row.map(cell => cell ? '■' : '.').join(' '));
        }
    }

    countNeighbors(x, y) {
        const dirs = [-1, 0, 1];
        let count = 0;
        for (let dx of dirs) {
            for (let dy of dirs) {
                if (dx === 0 && dy === 0) continue; // skip self
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && ny >= 0 && nx < this.grid.length && ny < this.grid[0].length) {
                    count += this.grid[nx][ny];
                }
            }
        }
        return count;
    }

    nextGeneration() {
        const newGrid = this.grid.map((row, x) =>
            row.map((cell, y) => {
                const neighbors = this.countNeighbors(x, y);
                if (cell === 1) {
                    return (neighbors === 2 || neighbors === 3) ? 1 : 0;
                } else {
                    return neighbors === 3 ? 1 : 0;
                }
            })
        );
        return newGrid;
    }

    run(){
        setInterval(() => {
            this.render();
            this.grid = this.nextGeneration();
        }, 500);
    }

}

module.exports = Game;