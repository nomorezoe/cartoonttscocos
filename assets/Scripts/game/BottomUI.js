let SwitchWidget = require("SwitchWidget");

cc.Class({
    extends: cc.Component,

    properties: {
        switchwidget: SwitchWidget,
        musicWidget: cc.Widget,
        sendButton: cc.Node,
        musicButton: cc.Node,

        inputWidget: cc.Widget,

        mobileViews: [cc.Node],
        pcViews: [cc.Node],

        editBox: cc.EditBox,
        mobileEditBG: cc.Node,
        mobileSmile: cc.Node,

        pop: cc.Node,
        mobileFirst: cc.Node,
        isFirst: true
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.node.on("mobileView", this.mobileView.bind(this));
        this.node.on("pcView", this.pcView.bind(this));
        // this.node.on("mouseOver")

        if (this.switchwidget && !this.switchwidget.isPcView) {
            this.mobileView(this.switchwidget.fw);

        }
    },

    mobileView(w) {



        for (let i = 0; i < this.mobileViews.length; i++) {
            this.mobileViews[i].active = true;
        }

        for (let i = 0; i < this.pcViews.length; i++) {
            this.pcViews[i].active = false;
        }


        this.musicWidget.bottom = 70;
        this.musicWidget.left = -5;
        this.musicWidget.updateAlignment();

        this.inputWidget.bottom = 35.5;
        this.inputWidget.updateAlignment();

        this.musicButton.scale = 0.6;
        this.musicButton.x = 20;

        this.sendButton.scale = 0.5;

        this.setMobileView(w);

        if (this.isFirst) {
            this.isFirst = false;
            this.popMovileFirst();
        }
    },

    setMobileView(w) {
        let GAP_TEXTBG = 30;
        let GAP_BORDER = 10;
        let GAP_ICON = 8;
        let ICON = 36;

        this.editBox.node.width = Math.min(420, w - GAP_TEXTBG * 2 - GAP_BORDER * 2 - GAP_ICON - ICON);
        this.mobileEditBG.width = this.editBox.node.width + GAP_TEXTBG * 2;

        let len = this.editBox.node.width + GAP_TEXTBG * 2 + GAP_ICON + ICON;

        this.mobileEditBG.x = this.editBox.node.x = -len / 2 + this.editBox.node.width / 2 + GAP_TEXTBG;

        this.mobileSmile.x = this.mobileEditBG.x + this.mobileEditBG.width / 2 - 20;

        this.sendButton.x = this.editBox.node.x + this.editBox.node.width / 2 + GAP_TEXTBG + GAP_ICON + ICON / 2;
    },

    pcView() {
        for (let i = 0; i < this.mobileViews.length; i++) {
            this.mobileViews[i].active = false;
        }

        for (let i = 0; i < this.pcViews.length; i++) {
            this.pcViews[i].active = true;
        }

        this.musicWidget.bottom = 46;
        this.musicWidget.left = 62;
        this.musicWidget.updateAlignment();


        this.inputWidget.bottom = 83;
        this.inputWidget.updateAlignment();

        this.musicButton.scale = 1;
        this.musicButton.x = 0;

        this.sendButton.scale = 1;

        this.editBox.node.width = 420;
        this.editBox.node.x = 0;

        if (this.isFirst) {
            this.isFirst = false;
        }
    },

    popupComingSoon() {
        this.pop.active = true;
    },

    closeComingSoon() {
        this.pop.active = false;
    },

    popMovileFirst() {
        this.mobileFirst.active = true;

        this.mobileEditBG.width -= 80;
        this.editBox.node.width -= 80;
       // this.editBox.node.x -= 50;
        this.mobileEditBG.x -= 40;


        this.mobileFirst.x = this.sendButton.x - 80;

        this.mobileSmile.x = this.mobileEditBG.x - this.mobileEditBG.width / 2 + 20;

    },

    closeMobileFirst() {
        if (this.mobileFirst.active) {
            this.mobileFirst.active = false;
            this.setMobileView(this.switchwidget.fw);
        }
    }
});
