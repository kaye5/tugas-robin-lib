function Draw(map) {
    this.map = map || []
    //Output map
    this.drawEmptyMap = () => {
        var output = document.getElementById('map-output')
        output.innerHTML = ''
        this.map.forEach((row, idxrow) => {
            var rowOutput = document.createElement('div')
            rowOutput.setAttribute('id', `row-${idxrow}`)
            rowOutput.setAttribute('class', 'row-map-output')
            row.forEach((col, idxcol) => {
                var colOuput = document.createElement('div')
                colOuput.setAttribute('id', `output-${idxrow}-${idxcol}`)
                colOuput.setAttribute('class', 'col-map-output')
                colOuput.setAttribute('value', col)
                if (col == 0) {
                    colOuput.classList.add('blocked')
                    colOuput.classList.remove('goal')
                    colOuput.classList.remove('start')
                } else if (col == 2) {
                    colOuput.classList.remove('blocked')
                    colOuput.classList.remove('start')
                    colOuput.classList.add('goal')
                } else {
                    colOuput.classList.remove('blocked')
                    colOuput.classList.remove('goal')
                    colOuput.classList.remove('start')
                }
                colOuput.addEventListener('click', handleClick)
                colOuput.innerHTML = idxrow + 1 + ',' + (idxcol + 1)
                rowOutput.append(colOuput)
            })
            output.append(rowOutput)
        })
    }
    // draw solution path
    this.drawMovePath = (x, y) => {
        let block = document.getElementById(`output-${x}-${y}`)
        block.classList.add('active-path')
    }
}
//draw solusi
function DrawSolution(solution, startingPoint) {
    this.solution = solution
    this.South = [1, 0]
    this.North = [-1, 0]
    this.East = [0, 1]
    this.West = [0, -1]
    this.currentX = startingPoint.x
    this.currentY = startingPoint.y
    //draw the solution on html
    this.Draw = function () {
        let output = document.getElementById('pathfinder-output')
        output.style.fontSize = '20px'
        if (!solution) {
            output.innerHTML = '<p>No Solution Found</p>'
            output.style.color = 'Red'
            return false
        }
        output.innerHTML = `<p>${this.solution.join(' - ')}</p>`
        draw.drawMovePath(this.currentX,this.currentY)
        this.solution.forEach((row) => {
            switch (row) {
                case 'South':
                    this.moveLoc(this.South)
                    break
                case 'North':
                    this.moveLoc(this.North)
                    break
                case 'East':
                    this.moveLoc(this.East)
                    break
                case 'West':
                    this.moveLoc(this.West)
                    break
                default:
                    break
            }
            draw.drawMovePath(this.currentX,this.currentY)
        })
    }
    // Change the current location of path
    this.moveLoc = function (path) {
        this.currentX += path[0]
        this.currentY += path[1]
    }
}
