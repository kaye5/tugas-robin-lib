function Map(x, y) {
    this.x = x
    this.y = y
    this.map = []
    //generate empty map
    this.generateEmptyMap = () => {
        for (let i = 0; i < this.x; i++) {
            let row = []
            for (let j = 0; j < this.y; j++) {
                row.push(1)
            }
            this.map.push(row)
        }
    }
    //get 2D array map
    this.getMap = () => {
        if (this.map.length == 0) throw new Error('Empty Map')
        return this.map
    }
    //set block
    this.setBlock = (x, y) => {
        if (!x && !y) throw new Error('Empty Parameter')
        let row = this.map[x]
        row[y] = 0
        this.map[x] = row
    }
    //remove block
    this.removeBlock = (x, y) => {
        if (!x && !y) throw new Error('Empty Parameter')
        let row = this.map[x]
        row[y] = 1
        this.map[x] = row
    }
    //set goal
    this.setFinalDest = (x, y) => {
        if (!x && !y) throw new Error('Empty Parameter')
        let row = this.map[x]
        row[y] = 2
        this.map[x] = row
    }
    /**
     *
     * @param {Int} prevx previoues x dest
     * @param {Int} prevy pevious y dest
     * @param {Int} x selected x dest
     * @param {Int} y selected y dest
     */
    this.updateFinalDest = (prevx, prevy, x, y) => {
        let row = this.map[prevx]
        row[prevy] = 1
        row = this.map[x]
        row[y] = 2
        this.map[x] = row
    }
}
