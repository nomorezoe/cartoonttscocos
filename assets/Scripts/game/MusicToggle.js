let MusicToggle = cc.Class({
    extends: cc.Component,

    properties: {
        onNode: cc.Node,
        offNode: cc.Node,
        hintNode: cc.Node,
        hintText: cc.Label,
        audioId: null,
        music: {
            type: cc.AudioClip,
            default: null
        },
        anim: cc.Animation
    },

    initialize() {
        this.isMusicOn = cc.sys.localStorage.getItem("music");
        if (this.isMusicOn == null) {
            this.isMusicOn = true;
        }

        if (this.isMusicOn) {
            this.toggleOn();
            /*setTimeout(function(){ 
                cc.sys.__audioSupport.context.resume();
                cc.game.canvas.dispatchEvent(new Event("mousedown"))
            }, 3000);*/
        }
        else {
            this.toggleOff();
        }



        // this.node.on("mouseOver")

    },

    toggleOver() {
        this.hintNode.active = true;
    },

    toggleOut() {
        this.hintNode.active = false;
    },


    toggleOff() {
        this.onNode.active = true;
        this.offNode.active = false;
        this.hintText.string = "Turn Volumn On";

        if (this.audioId != null) {
            cc.audioEngine.pauseMusic();
        }


    },

    toggleOn() {
        this.offNode.active = true;
        this.onNode.active = false;
        this.hintText.string = "Turn Volumn Off";

        if (!this.audioId) {
            this.audioId = cc.audioEngine.playMusic(this.music, true);
        }
        else {
            cc.audioEngine.resumeMusic();
        }
    }

});