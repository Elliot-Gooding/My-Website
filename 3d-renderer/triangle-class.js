//Contains the triangle class which has methods for rasterising and interpolation

class Triangle extends Shape{
    constructor(vertices){
        super(vertices);
    }

    rasterise(){
        const [v1,v2,v3] = this.vertexArr;
        const edgePixels = [];
        edgePixels.push(...this.getLinePixels(v1,v2));
        edgePixels.push(...this.getLinePixels(v2,v3));
        edgePixels.push(...this.getLinePixels(v3,v1));
        edgePixels.forEach(drawPixel)
    }

    getLinePixels(v1,v2){
        let pixels = [];
        let [x1,y1] = v1.flatMat;
        let [x2,y2] = v2.flatMat;
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        const m = deltaY/deltaX;
        let adjust;
        m >= 0 ? adjust=1 : adjust=-1;
        let offset = 0;
        let threshold = 0.5;
        if (Math.abs(deltaX)>Math.abs(deltaY)){
            const delta = Math.abs(m);
            let y = y1;
            let start = v1.realXYZ;
            let end = v2.realXYZ;
            if (x2 < x1){
                [x1, x2] = [x2, x1];
                y = y2;
                [start,end] = [end,start];
            }
            const sequenceLength = x2-x1;
            let count = 0;
            for (let x = x1; x <= x2; x++) {
                const [dx,dy,dz] = this.interpolate(sequenceLength,start,end,count);
                const dist = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2)+Math.pow(dz,2));
                pixels.push(new Pixel([x,y],this.colour,dist))
                offset += delta;
                if (offset > threshold){
                    y += adjust;
                    threshold += 1;
                }
                count++;
            }
        } else {
            const delta = Math.abs(deltaX/deltaY);
            let x = x1;
            let start = v1.realXYZ;
            let end = v2.realXYZ;
            if (y2 < y1){
                [y1, y2] = [y2, y1];
                x = x2;
                [start,end] = [end,start]
            }
            const sequenceLength = y2-y1;
            let count = 0;
            for (let y = y1; y <= y2; y++) {
                const [dx,dy,dz] = this.interpolate(sequenceLength,start,end,count);
                const dist = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2)+Math.pow(dz,2));
                pixels.push(new Pixel([x,y],this.colour,dist))
                offset += delta;
                if (offset > threshold){
                    x += adjust;
                    threshold += 1;
                }
                count++;
            }
        }
        return pixels
    }

    scanLine(p1,p2){
        if (p1.x>p2.x){
            [p1,p2] = [p2,p1];
        }
        const minX = p1.x;
        const maxX = p2.x;
        const y = p1.y;
        const pixels = []
        for (let x = minX; x <= maxX; x++){
            pixels.push(new Pixel([x,y]))
        }
        return pixels
    }

    interpolate(sequenceLength,end,start,iteration){
        const newXYZ = [0,0,0];
        return newXYZ;
        for (let i = 0; i < 3; i++) {
            let startCoord = start[i];
            let endCoord = end[i];
            let resultCoord = (iteration / sequenceLength) * startCoord + (1 -  (iteration / sequenceLength) ) * endCoord;
            newXYZ[i] = resultCoord;
        }
    }
}