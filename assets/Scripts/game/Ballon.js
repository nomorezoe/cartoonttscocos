// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        whiteBG: cc.Node,
        pinkBG: cc.Node,
        text: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},

    update() {
        if (this.updateTextHeight) {
            this.node.height = this.bg.height = Math.max(55, this.text.node.height + 20);
            this.updateTextHeight = false;
        }
    },

    init(text, isFurwee) {

        if (isFurwee) {
            this.text.node.color = new cc.Color("#63697B");
            this.pinkBG.active = false;
            this.whiteBG.active = true;

            this.bg = this.whiteBG;
        }
        else {
            this.text.node.color = new cc.Color("#FFFFFF");
            this.whiteBG.active = false;
            this.pinkBG.active = true;

            this.bg = this.pinkBG;
        }
        this.isFurwee = isFurwee;
        this.text.string = text;
        this.updateTextHeight = true;

    },

    step() {
        if (this.isFurwee) {
            this.node.x -= 20;
        }
        else {
            this.node.x += 20;
        }

        this.node.opacity -= 50;

        if(this.node.opacity <=0){
            this.node.parent.removeChild(this.node);
        }
    },


});
