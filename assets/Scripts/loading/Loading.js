// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        progressBar:cc.ProgressBar,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad () {
        cc.director.preloadScene("game", this.onProgress.bind(this), this.onComplete.bind(this));
    },

    onProgress(completedCount, totalCount){
        this.progressBar.progress = completedCount/totalCount;
    },

    onComplete(error){
        if(!error){
            cc.director.loadScene("game");
        }

    }

    
});
