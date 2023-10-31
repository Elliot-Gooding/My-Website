const colours = ["red", "green", "blue"];


class Ball{
    constructor(){
        this.x = 50;
        this.y = 50;
        this.offSetAmount = Math.floor(Math.random()*1000);
        this.speed = 0.0009;
        this.accel = 0.00005;
        this.size = 1;
        this.sizeInc = 0.0008;
        this.sizeAccel = 0.000015;
        this.colour = "rgb(140, 140, 140)"
        this.angle = Math.random() * (360 - 0) + 0;
        [this.xVec, this.yVec] = this.getVectors(this.angle);
        this.ballElement = this.createBall();
        this.startOffSet()
        this.startBall();
    }
    
    getVectors(angle){
        const x = this.sin(angle);
        const y = this.cos(angle);
        const vectors = [x,y];

        return [x,y];
    }

    startOffSet(){
        for (let i = 0; i<this.offSetAmount; i++){
            this.move();
            this.display();
        }
    }

    startBall(){
        this.offSet();
        const refreshCycle = setInterval(() => {
            this.move();
            this.display();
            if (this.ballOutOfRender()){
                clearInterval(refreshCycle);
                this.terminateBall();
            }
        }, 10);
    }

    createBall(){
        const backgroundContainer = document.getElementById("greeting-background");
        const ballElement = document.createElement("div");
        ballElement.className = "ball";
        setTimeout(() => {
            ballElement.classList.add("ball-fade-in")
        }, 100);
        ballElement.style.background = this.colour;
        backgroundContainer.append(ballElement);
        return ballElement;
    }

    offSet(){
        this.x += Math.random() * 10 * this.xVec;
        this.y += Math.random() * 10 * this.yVec;
    }

    move(){
        this.speed += this.accel;
        this.x += this.speed * this.xVec;
        this.y += this.speed * this.yVec;
        this.sizeInc += this.sizeAccel;
        this.size += this.sizeInc;
    }

    display(){
        this.ballElement.style.left = this.x + "vw";
        this.ballElement.style.top = this.y + "vh";
        this.ballElement.style.width = this.size/20 + "vw";
        this.ballElement.style.height = this.size/20 + "vw";
        this.ballElement.style.borderRadius = this.size/40 + "vw";
    }

    ballOutOfRender(){
        const minX = -this.size;
        const minY = -this.size;
        if (
            ( this.x > 100 || this.x < minX ) ||
            ( this.y > 100 || this.y < minY )
        ) {
            return true;
        } else {
            return false;
        }
    }

    terminateBall(){
        this.ballElement.remove();
    }

    sin(angle){
        return Math.sin( angle * Math.PI / 180 );
    }

    cos(angle){
        return Math.cos( angle * Math.PI / 180 );
    };

    tan(angle){
        return Math.tan( angle * Math.PI / 180 );
    };

}

setInterval(() => {
    const myBall = new Ball();
}, 100);

