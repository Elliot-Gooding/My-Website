//Contains the objects to be displayed in the world

function buildScene(){
    objectsToRender = [];
    num=10;
    const rect2 = new Shape([
        new Vertex3([num,num,-num]),
        new Vertex3([-num,num,-num]),
        new Vertex3([-num,-num,-num]),
        new Vertex3([num,-num,-num])
    ],"wall1", "green")
    objectsToRender.push(rect2)

    const rect3 = new Shape([
        new Vertex3([num,num,num]),
        new Vertex3([-num,num,num]),
        new Vertex3([-num,-num,num]),
        new Vertex3([num,-num,num])
    ],"wall2", "green")
    objectsToRender.push(rect3)

    const rect4 = new Shape([
        new Vertex3([num,num,num]),
        new Vertex3([num,num,-num]),
        new Vertex3([num,-num,-num]),
        new Vertex3([num,-num,num])
    ],"wall3", "green")
    objectsToRender.push(rect4)

    const rect5 = new Shape([
        new Vertex3([-num,num,num]),
        new Vertex3([-num,num,-num]),
        new Vertex3([-num,-num,-num]),
        new Vertex3([-num,-num,num])
    ],"wall4", "green")
    objectsToRender.push(rect5)
    return objectsToRender;
}