//Handles 3D => 2D transformations

function projectObj(object){
    const vertices = object.vertexArr.map(toRelative); //Translations and rotations
    const clippedVertices = clip(vertices); //Clips to planes
    const triangles = reduceToTriangles(clippedVertices); //Cuts shapes into triangles
    const pixels = projectTriangles(triangles); //Projects and rasterises triangles into pixels
    return pixels;
}

function clip(vertices){
    vertices = clipperNP.clip(vertices);
    vertices = clipperR.clip(vertices);
    vertices = clipperL.clip(vertices);
    return vertices
}

//Returns transformed vertex with the player at the origin
function toRelative(vertex){
    //calculate coordinates relative to the player
    const characterPosition = new Vertex3([character.x,character.y,character.z]);
    const transVertex = vertex.subtract(characterPosition);

    //Apply rotation matrix - YAW
    const yawMat = new Mat3([
        [m.cos(cam.yaw), 0, -m.sin(cam.yaw)],
        [       0,       1,        0       ],
        [m.sin(cam.yaw), 0,  m.cos(cam.yaw)]
    ])
    rotatedVertex = yawMat.multiply(transVertex);
    return new Vertex3(rotatedVertex, vertex.id);
}

//Converts any (non-concave) shape into triangles
function reduceToTriangles(vertices){
    const triangles = [];
    while (vertices.length > 3){
        let removedVertex = vertices.pop();
        let triangle = new Triangle([removedVertex,vertices[0],vertices[vertices.length-1]]);
        triangles.push(triangle);
    }
    triangles.push(new Triangle(vertices));
    return triangles;
}

function projectTriangles(triangles){
    triangles.forEach(triangle => {
        if(triangle.vertexArr.length===3){
            let vertices3D = [...triangle.vertexArr];
            vertices = vertices3D.map(toNDC);
            vertices = vertices.map((vertex,index)=>{return toScreenSpace(vertex,vertices3D[index])});
            const newTriangle = new Triangle(vertices);
            newTriangle.rasterise();
        }
    });
}

//Convert to NDC
function toNDC(vertex){
    let maxX = vertex.z * m.tan(cam.hFOV / 2);
    let maxY = vertex.z * m.tan(cam.vFOV / 2);
    let x = (vertex.x + maxX) / (2 * maxX);
    let y = 1 - (vertex.y + maxY) / (2 * maxY);

    return new Vertex2([x, y]);
}

//Convert to Screen Space
function toScreenSpace(vertex,vertex3D){
    vertex.x *= cam.screenWidth;
    vertex.y *= cam.screenHeight;
    const scrnSpaceVert = [vertex.x, vertex.y];
    const realXYZ = vertex3D.flatMat;
    return new Vertex2(scrnSpaceVert,realXYZ);
}