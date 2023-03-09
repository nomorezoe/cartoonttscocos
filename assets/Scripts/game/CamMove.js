let Game = require("Game");

let CamAdjust = cc.Class({
    extends: cc.Component,

    properties: {
        cameras: [cc.Camera],
        sceneNodes: [cc.Node],
        infos: null,
        vx: 0,
        vy: 0,
        ax: 0.5,
        maxV: 1,

        /*rotX:0,
        rotY:0,

        posX: 0, 
        posY: 0,*/

        rotRangeX: 10,
        rotRangeY: 10,

        //moveRangeX: 50,
        //moveRangeY: 10,

        screenWidth: 0,
        screenHeight: 0,
        designResolutionHeight: 0,
        designResolutionHeight_2: 0,

        game:Game
    },

    onLoad: function () {
        this.screenWidth = cc.view.getDesignResolutionSize().height / cc.view.getCanvasSize().height * cc.view.getCanvasSize().width;
        this.screenHeight = cc.view.getDesignResolutionSize().width / cc.view.getCanvasSize().width * cc.view.getCanvasSize().height;
        

        this.designResolutionHeight = cc.view.getDesignResolutionSize().height;
        this.designResolutionHeight_2 = cc.view.getDesignResolutionSize().height / 2;
        /*this.rotX =  this.cameras[0].node.eulerAngles.x;
        this.rotY =  this.cameras[0].node.eulerAngles.y;

        this.posX = this.cameras[0].node.position.x;
        this.posY = this.cameras[0].node.position.y;
        //console.log(this.rotX, this.rotY);*/
        this.infos = [];
        for (let i = 0; i < this.sceneNodes.length; i++) {
            let info = { x: this.sceneNodes[i].eulerAngles.x, y: this.sceneNodes[i].eulerAngles.y };
            this.infos.push(info);
        }

        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);


    },

    onDestroy: function () {
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
    },

    onTouchMove: function (evt) {
        // this.onMouseMove(evt);
    },

    onMouseMove: function (evt) {
        if(!this.game.furweeIntialized){
            return;
        }
        // console.log(this.screenWidth/2 - evt._x, this.screenWidth/2);
        let targetY = (this.screenWidth / 2 - evt._x) / (this.screenWidth / 2) * this.rotRangeY;
        let targetX = (this.screenHeight / 2 - evt._y) / (this.screenHeight / 2) * this.rotRangeX ;

        //let targetMoveX = (this.screenWidth/2 - evt._x)/ (this.screenWidth/2) * this.moveRangeX + this.posX;
        //let targetMoveY = ( evt._y - this.designResolutionHeight_2 ) / this.designResolutionHeight_2 *this.moveRangeY + this.posY;

        // console.log("target", targetX, targetY);
        let currentX = this.sceneNodes[0].eulerAngles.x;
        let currentY = this.sceneNodes[0].eulerAngles.y;
        //console.log("currentX", currentX, "currentY", currentY);

        let timeY = Math.abs(targetY - currentY) / this.rotRangeY;
        let timeX = Math.abs(targetX - currentX) / this.rotRangeX;
        //console.log('time', timeX, timeY);

        for (let i = 0; i < this.sceneNodes.length; i++) {

            let rotate3DTo = cc.rotate3DTo(Math.max(timeX, timeY), cc.v3(targetX + this.infos[i].x, targetY + this.infos[i].y, 0));
            // let move3DTo = cc.moveTo(1, cc.v3(targetMoveX, targetMoveY, 0));
            //    console.log(targetX, targetY);
            // this.cameras[i].node.stopAllActions();
            // this.cameras[i].node.runAction(cc.spawn(rotate3DTo, move3DTo));


            this.sceneNodes[i].stopAllActions();
            this.sceneNodes[i].runAction(rotate3DTo);

        }

    },
});