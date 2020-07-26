var findShortestPath = function (startCoordinates, grid) {
    var distanceFromTop = startCoordinates[0]
    var distanceFromLeft = startCoordinates[1]

    var location = {
        distanceFromTop: distanceFromTop,
        distanceFromLeft: distanceFromLeft,
        path: [],
        status: 'Start'
    }

    var queue = [location]

    while (queue.length > 0) {
        var currentLocation = queue.shift()

        // Explore North
        var newLocation = exploreInDirection(currentLocation, 'North', grid)
        if (newLocation.status === 2) {
            return newLocation.path
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation)
        }

        // Explore East
        var newLocation = exploreInDirection(currentLocation, 'East', grid)
        if (newLocation.status === 2) {
            return newLocation.path
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation)
        }

        // Explore South
        var newLocation = exploreInDirection(currentLocation, 'South', grid)
        if (newLocation.status === 2) {
            return newLocation.path
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation)
        }

        // Explore West
        var newLocation = exploreInDirection(currentLocation, 'West', grid)
        if (newLocation.status === 2) {
            return newLocation.path
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation)
        }
    }

    return false
}

// Check  status
var locationStatus = function (location, grid) {
    var gridSize = grid.length
    var dft = location.distanceFromTop
    var dfl = location.distanceFromLeft

    if (
        location.distanceFromLeft < 0 ||
        location.distanceFromLeft >= gridSize ||
        location.distanceFromTop < 0 ||
        location.distanceFromTop >= gridSize
    ) {
        return 'Invalid'
    } else if (grid[dft][dfl] === 2) {
        return 2
    } else if (grid[dft][dfl] !== 1) {
        // check block atau visited
        return 'Blocked'
    } else {
        return 'Valid'
    }
}

// Explore the grid
var exploreInDirection = function (currentLocation, direction, grid) {
    var newPath = currentLocation.path.slice()
    newPath.push(direction)

    var dft = currentLocation.distanceFromTop
    var dfl = currentLocation.distanceFromLeft

    if (direction === 'North') {
        dft -= 1
    } else if (direction === 'East') {
        dfl += 1
    } else if (direction === 'South') {
        dft += 1
    } else if (direction === 'West') {
        dfl -= 1
    }

    var newLocation = {
        distanceFromTop: dft,
        distanceFromLeft: dfl,
        path: newPath,
        status: 'Unknown'
    }
    newLocation.status = locationStatus(newLocation, grid)

    //Mark location
    if (newLocation.status === 'Valid') {
        grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] =
            'Visited'
    }

    return newLocation
}
