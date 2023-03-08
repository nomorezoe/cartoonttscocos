let SwitchWidget = require("SwitchWidget");

cc.Class({
    extends: cc.Component,

    properties: {
        whiteBG: cc.Node,
        pinkBG: cc.Node,
        text: cc.Label,
        switchwidget: SwitchWidget,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad() {
        this.node.on("mobileView", this.mobileView.bind(this));
        this.node.on("pcView", this.pcView.bind(this));
        // this.node.on("mouseOver")

        if(this.switchwidget && !this.switchwidget.isPcView ){
            this.mobileView();
        }
    },

    // update (dt) {},

    lateUpdate() {
        if (this.updateTextHeight >0) {
            this.updateTextHeight --;
            this.node.height = this.bg.height = Math.max(55, this.text.node.height + 20);
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
            //this.text.node.color = new cc.Color("#FFFFFF");
            this.whiteBG.active = false;
            this.pinkBG.active = true;

            this.bg = this.pinkBG;
        }
        this.isFurwee = isFurwee;
        this.text.string = text;
        this.updateTextHeight = 2;

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

    mobileView(){
        this.text.fontSize = 15;
        this.text.lineHeight = 17;
        this.text.string = this.text.string;

        this.updateTextHeight = 2;
    },

    pcView(){
        this.text.fontSize = 12;
        this.text.lineHeight = 15;
        this.text.string = this.text.string;

        this.updateTextHeight = 2;
    }


});
