
//main.jsを利用

//zon'sキャラ
phina.define('ZonChara', {
  superClass : 'CharaBase',
  init : function(x, y, no){
    this.superInit({
      x : x,
      y : y,
      no : no,
      name : 'zon',
      color : '#7f7',
    });
  },
  
  move : function(){
    var id = this.selectTargetNearest();
    console.log(id);
    if(id != -1 && this.hp > 20){
      //this.moveAwayFromTarget(id);
      this.moveCertainDistanceOfTarget(id, 350);
    }else{
      this.moveRandom();
    }

  },
  
  shot : function(){
    
  },
  
  //-------------------------------------------------------------
  //思考パターン
  //-------------------------------------------------------------
  //対象決定:最も近い敵
  selectTargetNearest : function(){
    var index = 0;
    var targetId = -1;
    var minLen = Infinity;
    for(var index = 0; index < CMN.charaAry.length; index++){
      var len = Math.pow(( CMN.charaAry[index].x - this.x), 2) + Math.pow(( CMN.charaAry[index].y - this.y), 2);  //平方根は省略
      //console.log("target["+ index + "]:(" + CMN.charaAry[0].x + ", " +  CMN.charaAry[0].y + ")");
      if(len != 0 && minLen > len){
        minLen = len;
        targetId = index;
      }
    }
    //console.log(targetId + " " + minLen);
    return targetId;
  },
  
  //対象決定:最も遠い敵
  selectTargetFarthest : function(){
    var index = 0;
    var targetId = -1;
    var maxLen = 0;
    for(var t in CMN.charaAry){
      var len = Math.pow((t.x - this.x), 2) + Math.pow((t.y - this.y), 2);  //平方根は省略
      if(maxLen < len){
        maxLen = len;
        targetId = index;
      }
      index++;
    }
    return targetId;
  },
  
  //行動：ランダムに動く
  moveRandom : function(){
    var moveX = CMN.func.randInt(
       - PRM.CHARA_STATUS.speed, 
         PRM.CHARA_STATUS.speed
         );
    var moveY = CMN.func.randInt(
       - PRM.CHARA_STATUS.speed, 
         PRM.CHARA_STATUS.speed
         );
    this.moveCharaBy(moveX, moveY, this.mp);
  },
  
  //行動：targetから離れる
  moveAwayFromTarget : function(id){
    //var target = CMN.charaAry[id];
    var rad = Math.atan2(CMN.charaAry[id].y - this.y, CMN.charaAry[id].x - this.x);
    var len = Math.pow(Math.pow((CMN.charaAry[id].x - this.x), 2) + Math.pow((CMN.charaAry[id].y - this.y), 2), 0.5);
    
    var moveX = -Math.round(PRM.CHARA_STATUS.speed * Math.cos(rad));
    var moveY = -Math.round(PRM.CHARA_STATUS.speed * Math.sin(rad));
    
    this.moveCharaBy(moveX, moveY, this.mp);
    
  },
  
  //行動：targetに近づく
  moveCloserToTarget : function(id){
    //var target = CMN.charaAry[id];
    var rad = Math.atan2(CMN.charaAry[id].y - this.y, CMN.charaAry[id].x - this.x);
    var len = Math.pow(Math.pow((CMN.charaAry[id].x - this.x), 2) + Math.pow((CMN.charaAry[id].y - this.y), 2), 0.5);
    
    var moveX = Math.round(PRM.CHARA_STATUS.speed * Math.cos(rad));
    var moveY = Math.round(PRM.CHARA_STATUS.speed * Math.sin(rad));
    
    this.moveCharaBy(moveX, moveY, this.mp);
    
  },
  
  //行動: targetから一定距離を保つ
  moveCertainDistanceOfTarget : function(id, distance){
    //var target = CMN.charaAry[id];
    var rad = Math.atan2(CMN.charaAry[id].y - this.y, CMN.charaAry[id].x - this.x);
    var len = Math.pow(Math.pow((CMN.charaAry[id].x - this.x), 2) + Math.pow((CMN.charaAry[id].y - this.y), 2), 0.5);
    var moveX = 0;
    var moveY = 0;
    if(distance > len){
      moveX = -Math.round(PRM.CHARA_STATUS.speed * Math.cos(rad));
      moveY = -Math.round(PRM.CHARA_STATUS.speed * Math.sin(rad));
    }else{
      moveX = Math.round(PRM.CHARA_STATUS.speed * Math.cos(rad));
      moveY = Math.round(PRM.CHARA_STATUS.speed * Math.sin(rad));
    }
    this.moveCharaBy(moveX, moveY, this.mp);
    
  },
  
});
