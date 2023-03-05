let SwitchWidget = require("SwitchWidget");
cc.Class({
    extends: cc.Component,

    properties: {
        switchwidget: SwitchWidget,
        musicWidget: cc.Widget,
        sendButton: cc.Node,
        musicButton: cc.Node,

        inputWidget: cc.Widget,

        mobileViews:[cc.Node],
        pcViews: [cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.on("mobileView", this.mobileView.bind(this));
        this.node.on("pcView", this.pcView.bind(this));
        // this.node.on("mouseOver")

        if(this.switchwidget && !this.switchwidget.isPcView ){
            this.mobileView();
        }
    },

    mobileView(){

        for(let i = 0; i < this.mobileViews.length; i++){
            this.mobileViews[i].active = true;
        }

        for(let i = 0; i < this.pcViews.length; i++){
            this.pcViews[i].active = false;
        }


        this.musicWidget.bottom = 70;
        this.musicWidget.left = -5;
        this.musicWidget.updateAlignment();

        this.inputWidget.bottom = 35.5;
        this.inputWidget.updateAlignment();

        this.musicButton.scale = 0.6;
        this.musicButton.x = 20;

       
    },

    pcView(){
        for(let i = 0; i < this.mobileViews.length; i++){
            this.mobileViews[i].active = false;
        }

        for(let i = 0; i < this.pcViews.length; i++){
            this.pcViews[i].active = true;
        }

        this.musicWidget.bottom = 46;
        this.musicWidget.left = 62;
        this.musicWidget.updateAlignment();


        this.inputWidget.bottom = 83;
        this.inputWidget.updateAlignment();

        this.musicButton.scale = 1;
        this.musicButton.x = 0;

    }
});
