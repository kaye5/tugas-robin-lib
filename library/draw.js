function Draw(map) {
    this.map = map || []

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

    this.drawMovePath = (x, y) => {
        let block = document.getElementById(`output-${x}-${y}`)
        block.classList.add('active-path')
    }
}

function DrawSolution(solution, startingPoint) {
    this.solution = solution
    this.South = [1, 0]
    this.North = [-1, 0]
    this.East = [0, 1]
    this.West = [0, -1]
    this.currentX = startingPoint.x
    this.currentY = startingPoint.y

    this.Draw = function () {
        let output = document.getElementById('pathfinder-output')
        output.style.fontSize = '20px'
        if (!solution) {
            output.innerHTML = '<p>No Solution Found</p>'
            output.style.color = 'Red'
            return false
        }
        output.innerHTML = `<p>${this.solution.join(' - ')}</p>`
        document
            .getElementById(`output-${this.currentX}-${this.currentY}`)
            .classList.add('active-path')
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
            document
                .getElementById(`output-${this.currentX}-${this.currentY}`)
                .classList.add('active-path')
        })
    }
    this.moveLoc = function (path) {
        this.currentX += path[0]
        this.currentY += path[1]
    }
}

function handleClick() {
    let rowcol = this.id.split('-')
    let x = rowcol[1]
    let y = rowcol[2]
    if (this.classList.contains('goal')) {
        this.classList.remove('goal')
        this.classList.add('blocked')
        map.setBlock(x, y)
    } else if (this.classList.contains('blocked')) {
        this.classList.remove('blocked')
        map.removeBlock(x, y)
    } else {
        this.classList.add('blocked')
        map.setBlock(x, y)
    }
}
