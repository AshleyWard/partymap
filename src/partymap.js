class PartyMap {

    constructor (width, height, linkedElement) {

        this._width = width;
        this._height = height;

        this.pmap      = Array(width);

        this.linkedElement = linkedElement;

        this.trackedPosition;


        for (let i = 0; i < width; i++){
            this.pmap[i] = Array(height)
        }

        this.trackedItem    = {x: 0, y: 0}

    }

    get width() {
        return this._width
    }

    get height() {
        return this._height
    }

    visualize() {
        let line;
        this.linkedElement.innerText = '';
        for (let y = 0; y < this.height; y++){
            line = '';
            for (let x = 0; x < this.width; x++){
                if (x === this.trackedItem.x && y === this.trackedItem.y) {
                    line = line + 'X';
                } else {
                    line = line + '.';
                }
            }
            this.linkedElement.innerText = this.linkedElement.innerText + line + '\n';
            console.log(line);
        }
    }

    moveLeft(item) {
        item.x--;
        this.visualize();
    }

    moveRight(item) {
        item.x++;
        this.visualize();
    }

    moveUp(item) {
        item.y--;
        this.visualize();
    }

    moveDown(item) {
        item.y++;
        this.visualize();
    }


}

let div = document.getElementById('partymap')
var pmap = new PartyMap(15,15,div);

pmap.visualize();


//Route buttons to functions
document.addEventListener('keydown', function(e) {
    console.clear()
    switch (e.key) {
        case 'ArrowLeft':
            pmap.moveLeft(pmap.trackedItem)
            break;
        case 'ArrowRight':
            pmap.moveRight(pmap.trackedItem)
            break;
        case 'ArrowUp':
            pmap.moveUp(pmap.trackedItem)
            break;
        case 'ArrowDown':
            pmap.moveDown(pmap.trackedItem)
            break;
    }
});
