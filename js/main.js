var data = JSON.parse(api);
function Team(data,team) {
	
	var t = {
		blue:100,
		red:200
	}
	this.team = t[team];
    this.data = data;
    this.top = [];
    this.jug = [];
    this.mid = [];
    this.sup = [];
    this.ad = [];
    this.init();
}
var blueT = null;
var redT = null;
Team.prototype = { 
	role : ["top","jug","mid","ad","sup"],
	position : {"top":"TOP","jug":"JUNGLE","mid":"MIDDLE","ad":"DUO_CARRY","sup":"DUO_SUPPORT"},
    init: function() {
        this.getAll();
        this.check();
    },
    getAll:function () {
    	this.getTop();
    	this.getJug();
    	this.getMid();
    	this.getAd();
    	this.getSup();
    },
    change:function (role1,role2) {
    	console.log(role1,role2);
    	var mRole,lRole;
    	if (this[role1].length == 2) {
    		mRole = role1;
    		lRole = role2;	
    	}else{
    		mRole = role2;	
    		lRole = role1;	
    	}
    	this.changeRole[lRole](mRole,this);
    },
    changeRole:{
    	//中单位没有人选
    	mid:function (mRole,team) {
    		console.log("中单位置填补");
    		var that = team;
    		var mRole = that[mRole];
    		for (var i = 0; i < mRole.length; i++) {
    			//打野位有两个
    			for (var j = 0; j < mRole.length; j++) {
    				if (mRole[j].spell1Id != 11 && mRole[j].spell2Id != 11) {
    					that.mid.push(mRole.splice(j,1));
    					return;
    				}
    			}
    		}
    	}
    },
    check:function () {
    	var res = "team:"+this.team;
    	var wrong = false;
    	var wRole = [];
    	for (var i = 0; i < this.role.length; i++) {
    		if(this[this.role[i]].length != 1 ){
    			res+=(this.role[i]+this[this.role[i]].length);
    			wRole.push(this.role[i]);
    			wrong =true;
    		}
    	}
    	if (wrong) {
    		console.log("检测到错误");
    		this.change(wRole[0],wRole[1]);
    	}
    	console.log(res);
    },
    getTop: function() {
        for (var i = 0; i < this.data.participants.length; i++) {
        	if(this.data.participants[i].teamId == this.team && this.data.participants[i].timeline.lane == "TOP"){
        		this.top.push(this.data.participants[i]);
        	}
        }
    },
    getJug: function() {
        for (var i = 0; i < this.data.participants.length; i++) {
        	if(this.data.participants[i].teamId == this.team && this.data.participants[i].timeline.lane == "JUNGLE"){
        		this.jug.push(this.data.participants[i]);
        	}
        }
    },
    getMid:function() {
        for (var i = 0; i < this.data.participants.length; i++) {
        	if(this.data.participants[i].teamId == this.team && this.data.participants[i].timeline.lane == "MIDDLE"){
        		this.mid.push(this.data.participants[i]);
        	}
        }
    },
    getAd:function() {
        for (var i = 0; i < this.data.participants.length; i++) {
        	if(this.data.participants[i].teamId == this.team && this.data.participants[i].timeline.role == "DUO_CARRY"){
        		this.ad.push(this.data.participants[i]);
        	}
        }
    },
    getSup:function() {
        for (var i = 0; i < this.data.participants.length; i++) {
        	if(this.data.participants[i].teamId == this.team && this.data.participants[i].timeline.role == "DUO_SUPPORT"){
        		this.sup.push(this.data.participants[i]);
        	}
        }
    },
}
blueT = new Team(data,"blue");
redT = new Team(data,"red");