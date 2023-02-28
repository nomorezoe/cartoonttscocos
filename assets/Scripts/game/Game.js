let MusicToggle = require("MusicToggle");
let BodyAnim = require("BodyAnim");

cc.Class({
    extends: cc.Component,

    properties: {
        editBox: cc.EditBox,
        audioID: -1,
        mouthNode: cc.Node,
        mouthIsReset: true,
        historyObjects: [],
        sendButton: cc.Node,

        balloonPrefab: cc.Prefab,
        balloonNode: cc.Node,

        introSound: {
            type: cc.AudioClip,
            default: null
        },

        music: MusicToggle,
        blockerNode: cc.Node,
        idleMouthTimeout: -1,
        bodyAnim: BodyAnim,
        headAnim: cc.Animation,

        initialMsgJSON: null,

        introCameras: [cc.Camera],
        furweeIntialized:false,

        URL: "http://40.121.137.102"

    },

    start() {
        this.blockerNode.active = true;
    },

    onLoad() {

        let isLocalHost = false;
        if (window.location.href.indexOf("localhost") != -1 || window.location.href.indexOf("127.0.0.1") != -1) {
            isLocalHost = true;
        }
        console.log("isLocalHost", isLocalHost);

        /*
        this.urlAddress = isLocalHost ? "http://127.0.0.1:3000" : "http://13.115.222.147:3000";
        this.socket = new window.io(this.urlAddress, { transports: ['websocket', 'polling', 'flashsocket'] });

        this.socket.on("connect", this.handleConnect.bind(this));
        this.socket.on("onTTSCompleted", this.onTTSCompleted.bind(this));

        return;

*/
        this.onTextLenChange(this.editBox.string);
        this.startFurwee();

    },

    handleConnect() {
        console.log('connected', this.socket.id);
    },

    startFurwee_backup() {


        let msg = "Hi, my name is Furwee. What's your name?";
        this.addBallon(msg, true);
        //return;

        this.audioInfo = [{ "audio_offset_ms": 50, "viseme_id": 0 }, { "audio_offset_ms": 100, "viseme_id": 12 }, { "audio_offset_ms": 237.5, "viseme_id": 11 }, { "audio_offset_ms": 475, "viseme_id": 0 }, { "audio_offset_ms": 650, "viseme_id": 21 }, { "audio_offset_ms": 687.5, "viseme_id": 11 }, { "audio_offset_ms": 762.5, "viseme_id": 19 }, { "audio_offset_ms": 850, "viseme_id": 4 }, { "audio_offset_ms": 893.75, "viseme_id": 6 }, { "audio_offset_ms": 937.5, "viseme_id": 21 }, { "audio_offset_ms": 1000, "viseme_id": 6 }, { "audio_offset_ms": 1062.5, "viseme_id": 15 }, { "audio_offset_ms": 1150, "viseme_id": 18 }, { "audio_offset_ms": 1212.5, "viseme_id": 5 }, { "audio_offset_ms": 1287.5, "viseme_id": 13 }, { "audio_offset_ms": 1350, "viseme_id": 7 }, { "audio_offset_ms": 1400, "viseme_id": 6 }, { "audio_offset_ms": 1662, "viseme_id": 0 }, { "audio_offset_ms": 2425, "viseme_id": 0 }, { "audio_offset_ms": 2475, "viseme_id": 7 }, { "audio_offset_ms": 2575, "viseme_id": 1 }, { "audio_offset_ms": 2637.5, "viseme_id": 19 }, { "audio_offset_ms": 2687.5, "viseme_id": 15 }, { "audio_offset_ms": 2737.5, "viseme_id": 6 }, { "audio_offset_ms": 2787.5, "viseme_id": 3 }, { "audio_offset_ms": 2825, "viseme_id": 13 }, { "audio_offset_ms": 2862.5, "viseme_id": 19 }, { "audio_offset_ms": 2925, "viseme_id": 4 }, { "audio_offset_ms": 3025, "viseme_id": 6 }, { "audio_offset_ms": 3125, "viseme_id": 21 }, { "audio_offset_ms": 3300, "viseme_id": 0 }]
        this.audioID = cc.audioEngine.play(this.introSound);
        this.audioOffset = 0;
        this.updateMouth();

        this.bodyAnim.playIntro();
        this.headAnim.play();

        cc.audioEngine.setFinishCallback(this.audioID, function () {
            this.audioID = -1;
            this.mouthIsReset = false;
        }.bind(this));

    },

    startFurwee() {
        this.headAnim.play();
        this.bodyAnim.play();

        let that = this;
        let xhr = new XMLHttpRequest();
        let requestURL = this.URL + "/initial-message/";

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {

                    that.initialMsgJSON = JSON.parse(xhr.responseText);
                    if (!that.tryToStartFurweeIntro()) {
                        //preload sound
                        let remoteUrl = that.initialMsgJSON.audio_file_link;
                        cc.loader.load({ url: remoteUrl, type: 'wav' });
                    }
                }
            }
        }
        xhr.open('GET', requestURL, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send("");
    },

    tryToStartFurweeIntro() {
        if (this.blockerNode.active) {
            return false;
        }
        if (!this.initialMsgJSON) {
            return false;
        }

        if(this.furweeIntialized){
            return false;
        }
        this.furweeIntialized = true;

        this.onTTSCompleted(this.initialMsgJSON, function () {

            this.addBallon(this.initialMsgJSON.reply, true);
            this.bodyAnim.playIntro();

        }.bind(this));

        this.historyObjects.push({ "index": this.historyObjects.length, "reply": this.initialMsgJSON.reply, "message": this.initialMsgJSON.message });
        return true;
    },


    onTTSCompleted(info, soundloadedHandler = null) {
        if (!info) {
            return;
        }

        this.audioInfo = info.lip_sync_animation;

        let remoteUrl = info.audio_file_link;
        cc.loader.load({ url: remoteUrl, type: 'wav' }, function (err, res) {
            // Use texture to create sprite frame
            this.audioID = cc.audioEngine.play(res);
            this.audioOffset = 0;
            this.stopIdleMouth();
            this.updateMouth();

            if (soundloadedHandler) {
                soundloadedHandler();
            }

            cc.audioEngine.setFinishCallback(this.audioID, function () {
                this.audioID = -1;
                this.mouthIsReset = false;
            }.bind(this));
        }.bind(this));
    },

    didReturnHandler() {
        this.sendHandler();
        setTimeout(function () {
            this.editBox.focus();
        }.bind(this), 0);
    },


    sendHandler() {
        let sendText = this.editBox.string;
        if (sendText.trim().length == 0) {
            return;
        }

        /* this.socket.emit("tts", sendText);
         return;
 */

        this.addBallon(sendText, false);
        this.editBox.string = "";
        this.editBox.focus();

        this.onTextLenChange(this.editBox.string);

        let that = this;
        let xhr = new XMLHttpRequest();

        let requestURL = this.URL + "/messages/";
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    let json = JSON.parse(xhr.responseText);
                    that.onTTSCompleted(json);

                    that.historyObjects.push({ "index": that.historyObjects.length, "reply": json.reply, "message": json.message });

                    that.addBallon(json.reply, true);
                }
            }
        }
        let params = JSON.stringify({ "message": sendText, history: this.historyObjects });
        xhr.open('POST', requestURL, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(params);


        let xhr2 = new XMLHttpRequest();
        let requestURL2 = this.URL + "/emotion/";
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState == XMLHttpRequest.DONE) {
                if (xhr2.status == 200) {
                    console.log(xhr2.responseText);
                }
            }
        }
        let params2 = JSON.stringify({ "message": sendText });
        xhr2.open('POST', requestURL2, true);
        xhr2.setRequestHeader('Content-type', 'application/json');
        xhr2.send(params2);
    },

    updateMouth() {
        //audio_offset_ms: 1162.5, viseme_id: 11}
        let id = this.audioInfo[this.audioOffset].viseme_id;

        let node = this.mouthNode.getChildByName("mouth_" + id);
        if (node) {
            this.clearMouth();
            node.active = true;
        }
    },

    update(dt) {
        if (this.audioID != -1) {
            let time = cc.audioEngine.getCurrentTime(this.audioID)

            while (this.audioInfo.length > this.audioOffset
                && (this.audioInfo[this.audioOffset].audio_offset_ms < time * 1000 + 15)) {
                // && ((this.audioOffset + 1 >= this.audioInfo.length) || (Math.abs(this.audioInfo[this.audioOffset ].audioOffset - time* 1000 ) > (this.audioInfo[this.audioOffset +1].audioOffset - time* 1000 )))){
                this.updateMouth();
                this.audioOffset += 1;

            }
        }
        else {
            if (!this.mouthIsReset) {
                this.mouthIsReset = true;
                this.clearMouth();
                this.mouthNode.getChildByName("mouth_0").active = true;
                this.startIdleMouth();
            }
        }
    },

    onTextLenChange(textContent) {
        this.sendButton.active = textContent.length != 0
    },

    addBallon(message, isFurwee) {
        for (var i = 0; i < this.balloonNode.children.length; ++i) {
            this.balloonNode.children[i].getComponent("Ballon").step();
        }

        let balloon = cc.instantiate(this.balloonPrefab);
        balloon.getComponent('Ballon').init(message, isFurwee);
        this.balloonNode.addChild(balloon);


    },

    blockClickHandler() {
        this.blockerNode.active = false;
        this.music.initialize();
        this.tryToStartFurweeIntro();
        //this.introCameraAnim();
    },

    introCameraAnim() {
        for (let i = 0; i < this.introCameras.length; i++) {
            this.introCameras[i].getComponent(cc.Animation).play();
        }

        setTimeout(this.tryToStartFurweeIntro.bind(this), 2000);
    },

    clearMouth() {
        for (let i = 0; i <= 21; i++) {
            let node2 = this.mouthNode.getChildByName("mouth_" + i);
            node2.active = false;
        }

        for (let i = 0; i < 2; i++) {
            let node2 = this.mouthNode.getChildByName("idle_" + i);
            node2.active = false;
        }
    },

    startIdleMouth() {
        this.setIdleMouth();
    },

    setIdleMouth() {
        clearTimeout(this.idleMouthTimeout);
        this.idleMouthTimeout = -1;

        this.clearMouth();
        let idle = Math.floor(Math.random() * 2);
        this.mouthNode.getChildByName("idle_" + idle).active = true;

        setTimeout(this.setIdleMouth.bind(this), 3000 * Math.random() + 3000);
    },

    stopIdleMouth() {
        clearTimeout(this.idleMouthTimeout);
        this.idleMouthTimeout = -1;
    },

});
