let CamAdjust = cc.Class({
    extends: cc.Component,

    properties:{
        cameras: [cc.Camera],

        isKeyA:false,
        isKeyD:false,
        isKeyW:false,
        isKeyS:false,

        isKeyO:false,
        isKeyP:false,

        isK:false,
        isL:false,

        isM:false,
        isN:false
       
    },

    statics:{
    },

    onLoad: function(){

       cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
       cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy: function(){
       cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
       cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    update: function(){

        if(this.isKeyA){
            for(let i = 0; i < this.cameras.length; i ++){
                this.cameras[i].node.z +=1;
             }
        }

        if(this.isKeyD){
            for(let i = 0; i < this.cameras.length; i ++){
                this.cameras[i].node.z -=1;
             }
        }

        if(this.isKeyW){
            for(let i = 0; i < this.cameras.length; i ++){
                this.cameras[i].node.y +=1;
             }
        }

        if(this.isKeyS){
            for(let i = 0; i < this.cameras.length; i ++){
                this.cameras[i].node.y -=1;
             }
        }

         if(this.isM){
            for(let i = 0; i < this.cameras.length; i ++){
                this.cameras[i].node.x +=1;
             }
        }

         if(this.isN){
            for(let i = 0; i < this.cameras.length; i ++){
                this.cameras[i].node.x -=1;
             }
        }

        if(this.isKeyO){
            for(let i = 0; i < this.cameras.length; i ++){
                this.cameras[i].node.rotationX +=0.1;
             }
        }

        if(this.isKeyP){
            for(let i = 0; i < this.cameras.length; i ++){
                this.cameras[i].node.rotationX -=0.1;
             }
        }

        if(this.isK){
            for(let i = 0; i < this.cameras.length; i ++){
                this.cameras[i].fov +=0.1;
             }
        }

        if(this.isL){
            for(let i = 0; i < this.cameras.length; i ++){
                this.cameras[i].fov -=0.1;
             }
        }
    },

    onKeyDown: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.isKeyA = true;
                break;
            case cc.macro.KEY.d:
                this.isKeyD = true;
                break;
            case cc.macro.KEY.w:
                this.isKeyW = true;
                break;
            case cc.macro.KEY.s:
                this.isKeyS = true;
                break;
            case cc.macro.KEY.o:
                this.isKeyO = true;
                break;
            case cc.macro.KEY.p:
                this.isKeyP = true;
                break;
            case cc.macro.KEY.k:
                this.isK= true;
                break;
            case cc.macro.KEY.l:
                this.isL = true;
                break;
            case cc.macro.KEY.m:
                this.isM = true;
                break;
            case cc.macro.KEY.n:
                this.isN = true;
                break;
        }
    },

    onKeyUp: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.isKeyA = false;
                break;
            case cc.macro.KEY.d:
                this.isKeyD = false;
                break;
            case cc.macro.KEY.w:
                this.isKeyW = false;
                break;
            case cc.macro.KEY.s:
                this.isKeyS = false;
                break;
            case cc.macro.KEY.o:
                this.isKeyO = false;
                break;
            case cc.macro.KEY.p:
                this.isKeyP = false;
                break;
            case cc.macro.KEY.k:
                this.isK= false;
                break;
            case cc.macro.KEY.l:
                this.isL = false;
                break;
            case cc.macro.KEY.u:
                console.log(this.cameras[0].node.position, this.cameras[0].node.rotationX,this.cameras[0].fov);
                break;
            case cc.macro.KEY.m:
                this.isM = false;
                break;
            case cc.macro.KEY.n:
                this.isN = false;
                break;
        }
    }
});