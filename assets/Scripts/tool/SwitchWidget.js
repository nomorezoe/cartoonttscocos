// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const {Helper} = require("Helper");

let SwitchWidget = cc.Class({
    extends: cc.Component,

    properties: {
        minWidth: -1, 
        minHeight: -1,
        fitHeight: 640,
        isPcView: true,
        fw : -1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad() {

        Helper.addCallback(this.onResize.bind(this));

        this.canvas = this.node.parent.getComponent(cc.Canvas);

        this.onResize();
    },

    onDestroy(){
        Helper.removeCallback(this.onResize.bind(this));
    },
    // update (dt) {},

    onResize: function () {
        if (!this.node) return;
        var frameSize = cc.view.getFrameSize();
        let w = this.fitHeight / frameSize.height * frameSize.width;
        this.fw = w;
        console.log("W",w);
        if (w < this.minWidth) {
            this.node.emit("mobileView", w);
            this.isPcView = false;
        }
        else{
            this.node.emit("pcView", w);
            this.isPcView = true;
        }
    }
});
