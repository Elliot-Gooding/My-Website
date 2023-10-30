//Clips a given shape
class Clipper{
    getMaxID(vertices){
        return vertices.reduce((max, obj) => {
            return obj.id > max ? obj.id : max;
        }, -Infinity);
    }

    removeDuplicates(myArr){
        let count = 0 
        let outputArr = [...myArr];
        let stringedArray = myArr.map((array)=>array.map(object=>{return object.x+", "+object.y+", "+object.z}).toString());
        let stringSet = new Set();
        stringedArray.forEach((element, idx) => {
            if (!stringSet.has(element)){
                stringSet.add(element)
            } else {
                stringSet.delete(element)
            }
        });
        const newArr = outputArr.filter((element,index,array)=>{
            return stringSet.has(element.map(object=>{return object.x+", "+object.y+", "+object.z}).toString())
        });
        return newArr;
    }
    
    getID(id1, id2, maxID){
        if (
            ( id1=== 1 && id2 === maxID )||
            ( id1=== maxID && id2 === 1 )
        ){
            return maxID+1
        } else {
            return ( id1 + id2 ) / 2
        }
    }
}


class ClipperNearPlane extends Clipper{
    clip(vertices){
        let maxID = this.getMaxID(vertices);
        let clipVertices = this.getClipVertices(vertices);
        clipVertices = this.removeDuplicates(clipVertices);
        let clipedPoints = this.getClippedPoints(clipVertices,maxID);
        let unclippedPoints = this.getUnclippedPoints(vertices);
        const clippedVertices = clipedPoints.concat(unclippedPoints);
        clippedVertices.sort((a,b)=>{return a.id-b.id});
        return clippedVertices; 
    }
    
    
    getClipVertices(vertices){
        let clipVertices = [];
        vertices.forEach((vertex,index) => {
            if (vertex.z < cam.nearPlane){
                let currentVert = vertex;
                let prevVert = vertices.slice(index-1)[0];
                let nextVert = vertices[index+1];
                if (nextVert===undefined){
                    nextVert=vertices[0];
                }
                clipVertices.push([prevVert,currentVert]);
                clipVertices.push([currentVert,nextVert]);
            }
        });
        return clipVertices
    }
    
    
    getClippedPoints(clipVertices,maxID){
        const clippedPoints = [];
        clipVertices.forEach(vertexSet => {
            const { x: x1, y: y1, z: z1, id: id1 } = vertexSet[0];
            const { x: x2, y: y2, z: z2, id: id2 } = vertexSet[1];
            const np = cam.nearPlane 
            let x = x1 + ( (np - z1) / (z1 - z2) ) * (x1 - x2);
            let y = y1 + ( (np - z1) / (z1 - z2) ) * (y1 - y2);
            let z = np;
            let id = this.getID(id1, id2, maxID);
            const clippedPoint = new Vertex3([x,y,z],id);
            clippedPoints.push(clippedPoint);
        });
        return clippedPoints;
    }
    
    
    getUnclippedPoints(vertices){
        const unclippedPoints = [];
        vertices.forEach((vertex)=>{
            if (vertex.z>cam.nearPlane){
                unclippedPoints.push(vertex);
            }
        });
        return unclippedPoints
    }
}

class ClipperRightPlane extends Clipper{
    clip(vertices){
        let maxID = this.getMaxID(vertices);
        let clipVertices = this.getClipVertices(vertices);
        clipVertices = this.removeDuplicates(clipVertices);
        let clippedPoints = this.getClippedPoints(clipVertices,maxID);
        let unclippedPoints = this.getUnclippedPoints(vertices);
        const clippedVertices = clippedPoints.concat(unclippedPoints);
        clippedVertices.sort((a,b)=>{return a.id-b.id});
        return clippedVertices; 
    }
    
    
    getClipVertices(vertices){
        let clipVertices = [];
        vertices.forEach((vertex,index) => {
            if (this.testOutsideRightPlane(vertex)){
                let currentVert = vertex;
                let prevVert = vertices.slice(index-1)[0];
                let nextVert = vertices[index+1];
                if (nextVert===undefined){
                    nextVert=vertices[0];
                }
                clipVertices.push([prevVert,currentVert]);
                clipVertices.push([currentVert,nextVert]);
            }
        });
        return clipVertices;
    }

    testOutsideRightPlane(vertex){
        const maxX = vertex.z * m.tan( cam.hFOV / 2 );
        if (vertex.x > maxX){
            return true;
        } else {
            return false;
        }
    }
    
    
    getClippedPoints(clipVertices,maxID){
        const clippedPoints = [];
        clipVertices.forEach(vertexSet => {
            const { x: x1, y: y1, z: z1, id: id1 } = vertexSet[0];
            const { x: x2, y: y2, z: z2, id: id2 } = vertexSet[1];
            
            const m = ( z1 - z2 ) / ( x1 - x2 );
            const c = z1 - ( m * x1 );

            const x = ( 3 * c ) / ( Math.sqrt(3) - ( 3 * m ) )
            const y = ( x1 - x ) / ( x1 - x2 ) * ( y1 - y2 ) + y1; //Interpolate y from x
            const z = ( Math.sqrt(3) * x ) / 3

            const id = this.getID(id1, id2, maxID);
            const clippedPoint = new Vertex3([x,y,z],id);
            clippedPoints.push(clippedPoint);
        });
        return clippedPoints;
    }
    
    
    getUnclippedPoints(vertices){
        const unclippedPoints = [];
        vertices.forEach((vertex)=>{
            if (!this.testOutsideRightPlane(vertex)){
                unclippedPoints.push(vertex);
            }
        });
        return unclippedPoints
    }
}

class ClipperLeftPlane extends Clipper{
    clip(vertices){
        let maxID = this.getMaxID(vertices);
        let clipVertices = this.getClipVertices(vertices);
        clipVertices = this.removeDuplicates(clipVertices);
        let clippedPoints = this.getClippedPoints(clipVertices,maxID);
        let unclippedPoints = this.getUnclippedPoints(vertices);
        const clippedVertices = clippedPoints.concat(unclippedPoints);
        clippedVertices.sort((a,b)=>{return a.id-b.id});
        return clippedVertices; 
    }
    
    
    getClipVertices(vertices){
        let clipVertices = [];
        vertices.forEach((vertex,index) => {
            if (this.testOutsideLeftPlane(vertex)){
                let currentVert = vertex;
                let prevVert = vertices.slice(index-1)[0];
                let nextVert = vertices[index+1];
                if (nextVert===undefined){
                    nextVert=vertices[0];
                }
                clipVertices.push([prevVert,currentVert]);
                clipVertices.push([currentVert,nextVert]);
            }
        });
        return clipVertices;
    }

    testOutsideLeftPlane(vertex){
        const minX = -1 * vertex.z * m.tan( cam.hFOV / 2 );
        if (vertex.x < minX){
            return true;
        } else {
            return false;
        }
    }
    
    
    getClippedPoints(clipVertices,maxID){
        const clippedPoints = [];
        clipVertices.forEach(vertexSet => {
            const { x: x1, y: y1, z: z1, id: id1 } = vertexSet[0];
            const { x: x2, y: y2, z: z2, id: id2 } = vertexSet[1];
            
            const m = ( z1 - z2 ) / ( x1 - x2 );
            const c = z1 - ( m * x1 );

            const x = (( 3 * c ) / ( - Math.sqrt(3) - ( 3 * m ) )) //hard coded for 120 hFOV
            const y = -( x1 - x ) / ( x1 - x2 ) * ( y1 - y2 ) + y1;
            const z = ( - Math.sqrt(3) * x ) / 3

            const id = this.getID(id1, id2, maxID);
            const clippedPoint = new Vertex3([x,y,z],id);
            clippedPoints.push(clippedPoint);
        });
        return clippedPoints;
    }
    
    
    getUnclippedPoints(vertices){
        const unclippedPoints = [];
        vertices.forEach((vertex)=>{
            if (!this.testOutsideLeftPlane(vertex)){
                unclippedPoints.push(vertex);
            }
        });
        return unclippedPoints
    }
}