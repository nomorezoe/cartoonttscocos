let Helper = {};

Helper.callBacks = [];
Helper.initialized = false;
Helper.initialize = function(){
    if(Helper.initialized ){
        return;
    }
    Helper.initialized  = true;
    cc.view.setResizeCallback(Helper.handleResize);
}

Helper.handleResize = function(){
    for(let i =0 ; i < Helper.callBacks .length; i++){
        Helper.callBacks[i]();
    }
}

Helper.addCallback = function(func){
    Helper.initialize();
    Helper.callBacks.push(func);
}

Helper.removeCallback = function(func){
    let index = Helper.callBacks.indexOf(func);
    if(index != -1){
        Helper.splice(index,1);
    }
}

export {Helper};