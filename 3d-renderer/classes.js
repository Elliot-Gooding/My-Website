//Contains custom classes

class Pixel{
    constructor([x,y], colour="black", dist = 0, id=0){
        this.x = x;
        this.y = y;
        this.flatMat = [x,y]
        this.dist = dist;
        this.colour = colour;
        this.id = id;
    }
}

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

class Vertex{
    add(operandVertex) {
        const resultVertex = [];
        if (this.matrix.length === operandVertex.matrix.length){
            for (let i = 0; i<this.matrix.length; i++){
                resultVertex.push(this.matrix[i][0]+operandVertex.matrix[i][0]);
            }
        }
        return new this.constructor(resultVertex);
    }

    subtract(operandVertex) {
        const resultVertex = [];
        if (this.matrix.length === operandVertex.matrix.length){
            for (let i = 0; i<this.matrix.length; i++){
                resultVertex.push(this.matrix[i][0]-operandVertex.matrix[i][0]);
            }
        }
        return new this.constructor(resultVertex);
    }
}

class Vertex2 extends Vertex{
    constructor([x, y], realXYZ = [0, 0, 0], zIndex = 0, id = 0){
        super();
        this.x = x;
        this.y = y;
        this.flatMat = [this.x,this.y];
        this.matrix = [
            [this.x],
            [this.y]
        ];
        this.realXYZ = realXYZ;
        this.id = id;
    }
}

class Vertex3 extends Vertex{
    constructor([x, y, z], id = 0){
        super();
        this.x = x;
        this.y = y;
        this.z = z;
        this.flatMat = [this.x,this.y,this.z];
        this.matrix = [
            [this.x],
            [this.y],
            [this.z]
        ];
        this.id = id;
    }
}

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

class Mat{
    constructor(arrayOfValues){
        this.matrix=arrayOfValues;
    }

    multiply(operand){
        if (operand.matrix.length == this.matrix[0].length){
            let result = [];
            for (let i = 0; i < this.matrix.length; i++){
                result[i] = [];
                for (let j = 0; j < operand.matrix[0].length; j++){
                    result[i][j] = 0;
                    for (let k = 0; k < this.matrix.length; k++){
                        result[i][j] += this.matrix[i][k] * operand.matrix[k][j];
                    }
                }
            }
            return result.map((element)=>element[0]);
        } else {
            console.log("Dimension error");
            return NaN;
        }
    }
}

class Mat2 extends Mat{
    constructor(arrayOfValues){
        super(arrayOfValues);
    }
}

class Mat3 extends Mat{
    constructor(arrayOfValues){
        super(arrayOfValues);
    }
}

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

class Shape{
    constructor(vertices){
        this.vertexArr = vertices;
        for (let i = 0; i < this.vertexArr.length; i++) {
            this.vertexArr[i].id = i+1; //Sets vertex ID as its position in vertexArr
        }
    }
}

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

//Trig functions that take degrees
class DegreeMaths{
    sin(angle){
        return Math.sin( angle * Math.PI / 180 );
    };
    cos(angle){
        return Math.cos( angle * Math.PI / 180 );
    };
    tan(angle){
        return Math.tan( angle * Math.PI / 180 );
    };
    asin(angle){
        return Math.asin( angle * Math.PI / 180 );
    };
    acos(angle){
        return Math.acos( angle * Math.PI / 180 );
    };
    atan(angle){
        return Math.atan( angle * Math.PI / 180 );
    };
    toDegrees(angle){
        return angle*180/Math.PI;
    };
}