cc.Class({
    extends: cc.Component,

    properties: {
        stage: cc.Node,
        eye: cc.Node,
        isLeft: cc.Boolean
    },

    onLoad() {
        this.randX = 8;
        this.randY = 1.5;
        // this.stage.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveHandler, this);
        // this.stage.on(cc.Node.EventType.MOUSE_MOVE, this.mouseMoveHandler, this);
    },

    touchMoveHandler(evt) {
        //console.log(evt);
    },

    mouseMoveHandler(evt) {

        let worldPos = this.stage.convertToWorldSpaceAR(cc.v2(evt.getLocationX(), evt.getLocationY()));
        //console.log("world",worldPos.x, worldPos.y);
        worldPos = cc.v2(evt.getLocationX(), evt.getLocationY());
        let pos = this.node.convertToNodeSpaceAR(worldPos);
        //console.log(pos.x , pos.y);

        //this.eye.setPosition(pos.x, pos.y);

        let len = 0;
        let tan = 0;
        let ctan = 0;

        let posX = 0;
        let posY = 0;

        if (pos.x != 0 && pos.y != 0) {

            let mouseLen2 = Math.pow(pos.x, 2) * Math.pow(pos.y, 2) / (Math.pow(pos.x, 2) + Math.pow(pos.y, 2));
            if (mouseLen2 > Math.pow(150, 2)) {
                posX = 0;
                posY = 0;

            }
            else {
                let factor = Math.min(Math.pow(mouseLen2, 0.5) / 40, 1);
                //factor = Math.pow(factor, 2);
                if (this.isLeft) {
                    pos.x -= 40 * factor;
                }
                else {
                    pos.x += 40 * factor;
                }
                if (pos.x < 0) {
                    pos.x = Math.max(pos.x, -8);
                }
                else {
                    pos.x = Math.min(pos.x, 8);
                }
                if (pos.y < 0) {
                    pos.y = Math.max(pos.y, -2.5);
                }
                else {
                    pos.y = Math.min(pos.y, 2.5);
                }
                let len2 = Math.pow(pos.x, 2) * Math.pow(pos.y, 2) / (Math.pow(pos.x, 2) + Math.pow(pos.y, 2));
                len = Math.pow(len2, 0.5);

                tan = pos.y / len;
                ctan = pos.x / len;

                posX = len * ctan;
                posY = len * tan;

            }

        }

        this.eye.setPosition(posX, posY);
        //console.log("set pos", posX, posY);

    }
})