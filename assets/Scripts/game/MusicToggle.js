
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
        anim: cc.Animation,
        bgVolumn: 0.8,

        bgSlider: cc.Slider,
        bgProgress: cc.ProgressBar,
        offTimer: -1

    },

    initialize() {
        this.isMusicOn = cc.sys.localStorage.getItem("music");
        if (this.isMusicOn == null) {
            this.isMusicOn = true;
        }

        if (this.isMusicOn) {
            this.toggleOn();
        }
        else {
            this.toggleOff();
        }

        this.bgSlider.node.on('slide', this.sliderAdjust.bind(this));

        this.bgSlider.node.on(cc.Node.EventType.TOUCH_CANCEL, this.volumnCancelled, this);
        this.bgSlider._N$handle.node.on(cc.Node.EventType.TOUCH_END, this.volumnCancelled, this);

    },

    toggleOver() {
        this.hintNode.active = true;
    },

    toggleOut() {
        this.hintNode.active = false;
    },


    toggleOff() {
        clearTimeout(this.offTimer);

        this.offTimer = -1;

        this.onNode.active = true;
        this.offNode.active = false;
        this.hintText.string = "Turn Volumn On";

        this.bgSlider.node.active = false;

        if (this.audioId != null) {
            cc.audioEngine.pauseMusic();
        }


    },

    toggleOn() {
        this.offNode.active = true;
        this.onNode.active = false;
        this.hintText.string = "Turn Volumn Off";

        this.bgSlider.node.active = true;

        if (!this.audioId) {
            this.audioId = cc.audioEngine.playMusic(this.music, true, this.bgVolumn);
        }
        else {
            cc.audioEngine.resumeMusic();
        }

        if (this.bgVolumn == 0) {
            this.bgProgress.progress = this.bgSlider.progress = this.bgVolumn = 0.8;
            cc.audioEngine.setMusicVolume(this.bgVolumn);
        }
    },

    sliderAdjust(value) {
          clearTimeout(this.offTimer);
        this.bgProgress.progress = value.progress;
        this.bgVolumn = value.progress;
        cc.audioEngine.setMusicVolume(this.bgVolumn);
       
    },

    volumnCancelled() {
        clearTimeout(this.offTimer);
        if (this.bgVolumn == 0) {
           
            this.offTimer = setTimeout(() => {
                this.checkVolumnToggle();
            }, 1000);
        }
    },

    checkVolumnToggle(){
        clearTimeout(this.offTimer);
        if (this.bgVolumn == 0){
            this.toggleOff();
        }
    },


});