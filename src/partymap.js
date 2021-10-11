
    /*        TODO

        Next task:
        EditSpan()

        Insert these calls into directional movement calls
        to make it not redraw the whole sheet every time


        POI:

            - Description
            - Locked Description
            - Image
            - Sublocation

    */


// ***********
// *  Tiles  *
// ***********


class Tile {
    constructor (somedata) {
        this._somedata = somedata
    }
}


class TextTile {
    constructor (char = '.', color = 0x000000, bgColor = '#AAFFAA') {
        this._character = char
        this._color     = color;
        this._bgColor   = bgColor;
    }

    get character() {
        return this._character
    }

    get bgColor() {
        return this._bgColor
    }

    set character(character) {
        this._character = character;
    }
}

class PointOfInterest extends Tile {

    constructor (char,
                color       = '#000000', 
                bgColor     = '#FF4FFF;',
                description = '',
                secret      = '',
                img         = '',
                subMap      = '') 
    {
        super(char, color, bgColor)



    }

}




// ***********
// * TileMap *
// ***********

//how tf




// ***********
// *  Map    *
// ***********


class PartyMap {

    constructor (width, height, pmapDiv) {

        this._width = width;
        this._height = height;

        this.pmap      = Array(width);

        this.pmapDiv = pmapDiv;


        for (let i = 0; i < width; i++){
            this.pmap[i] = Array(height)
        }

        //track location of tracked item
        this.trackedItem    = {x: 0, y: 0, char: 'x'}

        //Fill map with text tiles:
        for (let y = 0; y < this.height; y++){
            for (let x = 0; x < this.width; x++){
                this.addTile(x, y)
            }
        }

    }

    get width() {
        return this._width
    }

    get height() {
        return this._height
    }

    getSpan(x, y) {
        if(x > this.width || y > this.height) {
            console.log('getSpan coords out of bounds');
            return 0;
        }
        var x = x-1;
        var y = y-1;
        return this.pmapDiv.children[x + y*(1+this.width)]
    }

    editSpan( span, config = '' ) {
        if (config) {
            
            if (config.bgColor) { 
                span.style = 'background-color: ' + config.bgColor + ';';
            }

            if (config.text) { span.innerText = config.text };

        }
    }

    addTile(x, y, char = '.') {
        this.pmap[x][y] = new TextTile(char);
    }

    drawTile(x, y, item = null) {

        var mapDiv = this.pmapDiv;
        var tileSpan = document.createElement("span")

        tileSpan.id = 'tile'
        
        var tileToAdd = this.pmap[x][y];

        if (!item) {
            tileSpan.innerText = tileToAdd.character;
            tileSpan.style = 'background-color: ' + tileToAdd.bgColor + '; width: 10px; height: 10px;';
        } else {
            tileSpan.innerText = item.char;
        }

        mapDiv.appendChild(tileSpan);


    }

    drawItem(item) {
        this.drawTile(item.x, item.y, item)
    }

    clearTiles() {

    }


    initialize() {
        this.pmapDiv.innerHTML = '';

        for (let y = 0; y < this.height; y++){

            for (let x = 0; x < this.width; x++){
                if (x === this.trackedItem.x && y === this.trackedItem.y) {
                    this.drawItem(this.trackedItem)
                } else { 
                    this.drawTile(x, y);
                }
            }

            this.pmapDiv.innerHTML = this.pmapDiv.innerHTML + '<br>';
        }
    }

    visualizeAsText() {
        let line;
        this.pmapDiv.innerText = '';
        for (let y = 0; y < this.height; y++){
            line = '';
            for (let x = 0; x < this.width; x++){
                if (x === this.trackedItem.x && y === this.trackedItem.y) {
                    line = line + 'X';
                } else {
                    line = line + this.pmap[x][y].character;
                }
            }
            this.pmapDiv.innerText = this.pmapDiv.innerText + line + '\n';
        }
    }

    move(direction, item) 
    {
        var currentLocation = {x: item.x+1, y: item.y + 1};
        var currentSpan = this.getSpan(currentLocation.x, currentLocation.y);

        if ((item.x >= 0 && item.y >= 0) && (item.x <= pmap.width-1 && item.y <= pmap.height-1)) {
            this.editSpan(currentSpan, { 
                test: 'value', 
                bgColor: this.pmap[item.x][item.y].bgColor,
                text:    this.pmap[item.x][item.y].character
            });
        }

        switch (direction) {
            case 'left':
                item.x--;
                break;


            case 'right':
                item.x++;
                break;


            case 'up':
                item.y--;
                break;


            case 'down':
                item.y++;
                break;
        }

        var newSpan = this.getSpan(item.x + 1, item.y + 1);

        if ((item.x >= 0 && item.y >= 0) && (item.x <= pmap.width-1 && item.y <= pmap.height-1)) {
            this.editSpan(newSpan, { 
                test: 'value', 
                bgColor: '#FFAAAA',
                text:   item.char 
            });
        }

        //this.initialize();
    }

}


// ***********
// * Controls*
// ***********

class Controls {
    constructor(page) {
        page.addEventListener('keydown', function(e) {
            switch (e.key) {
                case 'ArrowLeft':
                    pmap.move('left', pmap.trackedItem)
                    break;
                case 'ArrowRight':
                    pmap.move('right', pmap.trackedItem)
                    break;
                case 'ArrowUp':
                    pmap.move('up', pmap.trackedItem)
                    break;
                case 'ArrowDown':
                    pmap.move('down', pmap.trackedItem)
                    break;
            }
        });
    }
}

var controls = new Controls(document);

let div = document.getElementById('partymap')
var pmap = new PartyMap(70,70,div);

pmap.initialize();
