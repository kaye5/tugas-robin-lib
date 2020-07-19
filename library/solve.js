function PathFinder(maze) {

    this.maze = maze;
    
    this.path = [];
    
    this.solve = function(column, row) {
        if(this.maze[column][row] == 2) {
            this.path.push({
                x : column,
                y : row,
                finish : true
            })
//            console.log("We solved the maze at (" + column + ", " + row + ")");
        } else if(this.maze[column][row] == 1) {
            this.path.push({
                x : column,
                y : row,
                finish : false
            })
//            console.log("At valid position (" + column + ", " + row + ")");
            this.maze[column][row] = 9;
            if(column < this.maze.length - 1) {
                this.solve(column + 1, row);
            }
            if(row < this.maze[column].length - 1) {
                this.solve(column, row + 1);
            }
            if(column > 0) {
                this.solve(column - 1, row);
            }
            if(row > 0) {
                this.solve(column, row - 1);
            }
        }
    };

    this.result = function(){
        return this.path
    }
};