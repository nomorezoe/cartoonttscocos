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
        isPcView: true,

        mobileNode: cc.Node,
        pcNode: cc.Node
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
        let w = 640 / frameSize.height * frameSize.width;

        if (w < this.minWidth) {
            this.isPcView = false;
            this.mobileNode.active = true;
            this.pcNode.active = false;

            this.mobileNode.getComponent("cc.Widget").updateAlignment();
        }
        else{
            this.isPcView = true;
            this.mobileNode.active = false;
            this.pcNode.active = true;

            this.pcNode.getComponent("cc.Widget").updateAlignment();
        }
    }
});
