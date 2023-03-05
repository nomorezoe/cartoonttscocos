
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

        this.bgSlider.node.on('slide', this.sliderAdjust.bind(this));

       

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
    },

    sliderAdjust(value){
        this.bgProgress.progress = value.progress;
        this.bgVolumn = value.progress;
        cc.audioEngine.setMusicVolume(this.bgVolumn);
    },

   
});