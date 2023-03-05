// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const {Helper} = require("Helper");

cc.Class({
    extends: cc.Component,

    properties: {
        minWidth: -1, 
        minHeight: -1,
        fitHeight: 640,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad() {
        Helper.addCallback(this.onResize.bind(this));

        this.canvas = this.node.parent.getComponent(cc.Canvas);

        this.onResize();
    },

    // update (dt) {},

    onResize: function () {
        if (!this.node) return;
        var frameSize = cc.view.getFrameSize();
        let w = this.fitHeight / frameSize.height * frameSize.width;

        if (w < this.minWidth) {
            this.node.scale = w / this.minWidth;
        }
    }
});
