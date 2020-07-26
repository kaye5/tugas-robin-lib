var map
var draw
var starting = {
    x: 0,
    y: 0
}
var finalDest = {
    x: 0,
    y: 0
}
//Generate Onclick button
function generateMap() {
    let x = document.getElementById('input-x').value
    let y = document.getElementById('input-y').value
    map = new Map(x, y)
    map.generateEmptyMap()
    map.setFinalDest(x - 1, y - 1)
    finalDest = {
        x: x - 1,
        y: y - 1
    }
    draw = new Draw(map.getMap())
    draw.drawEmptyMap()
    document.getElementById(`output-0-0`).classList.add('starting')
}
//set starting point
function setStartingPoint() {
    let x = document.getElementById('starting-x').value
    let y = document.getElementById('starting-y').value
    document
        .getElementById(`output-${starting.x}-${starting.y}`)
        .classList.remove('starting')
    starting.x = x - 1
    starting.y = y - 1
    document
        .getElementById(`output-${starting.x}-${starting.y}`)
        .classList.add('starting')
}
//set final dest point
function setFinalPoint() {
    let x = document.getElementById('final-x').value
    let y = document.getElementById('final-y').value
    map.updateFinalDest(finalDest.x, finalDest.y, x - 1, y - 1)
    document
        .getElementById(`output-${finalDest.x}-${finalDest.y}`)
        .classList.remove('goal')
    finalDest.x = x - 1
    finalDest.y = y - 1
    document
        .getElementById(`output-${finalDest.x}-${finalDest.y}`)
        .classList.add('goal')
}
//solve maze
function findPath() {
    let start = [starting.x, starting.y]
    //get result dari maze
    let result = findShortestPath(start, map.getMap())
    //draw solution on html
    let solution = new DrawSolution(result, starting)
    solution.Draw()
}
//reset
function reset() {
    delete map
    delete draw
    var output = document.getElementById('map-output')
    output.innerHTML = ''
    output.document.getElementById('pathfinder-ouput')
    output.innerHTML = ''
    starting = {
        x: 0,
        y: 0
    }
}
