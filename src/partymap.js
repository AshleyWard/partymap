class PartyMap {

    constructor (width, height) {

        this._width = width;
        this._height = height;

        this.pmap      = [
            [width, height]
        ];

    }

    get width() {
        return this._width
    }

    get height() {
        return this._height
    }



    output() {
        console.log(this.pmap[0][1])
        console.log(this.pmap)
    }



}

var pmap = new PartyMap(10,10);

pmap.output();