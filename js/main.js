$(function() {
    var blueT = null;
    var redT = null;
    var apikey = "";
    $("#bgSetB").click(function () {
        var bgcolor = $("#bgset").val();
        $("body").css("backgroundColor",bgcolor);
    });
    $("#getkey").click(function () {
        apikey = $("#apikey").val();
        if (apikey == "") {
            alert("APIKEY输入为空！！！");
            return
        }
        $("#apikey").fadeOut();
        $("#getkey").fadeOut(function () {
            $("#tips").text("已确认APIKEY，你输入的是"+apikey);
        });
        
    })
    $("#change").click(function () {
        var team = $("#team").val();
        var role1 = $("#role1").val();
        var role2 = $("#role2").val();
        console.log(team,role1,role2);
        if (team == "blue") {
            var temp = blueT[role1];
            blueT[role1] = blueT[role2];
            blueT[role2] = temp;
            blueT.set(blueT);
        }else{
            var temp = redT[role1];
            redT[role1] = redT[role2];
            redT[role2] = temp;
            redT.set(redT);
        }
    })


    //点击按钮开始运行
    var cnTime = 0;
    $("#btn").click(function() {
        cnTime++;
        if (cnTime > 3) {
            $("#tips").text("请求失败次数超过三次，请检查APIKEY或者网络链接是否正常！");
            return
        }
        $("#tips").text("初始化数据");
        init();
        var matchid = $("#matchid").val();
        $("#tips").text("开始请求数据,当前为第"+cnTime+"次");
        $.ajax({
            url: "https://kr.api.riotgames.com/api/lol/KR/v2.2/match/" + matchid + "?includeTimeline=false&api_key="+apikey,
            success: function(data) {
                $("#tips").text("请求数据成功！");
                blueT = new Team(data, "blue");
                redT = new Team(data, "red");
                blueT.set(blueT);
                redT.set(redT);
            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                $("#btn").click();
            }
        })
    });
    function init() {
        blueT = null;
        redT = null;
        $(".container>top").find("img").attr("src","images/ttt.png");
    }

    function Team(data, team) {

        var t = {
            blue: 100,
            red: 200
        }
        //最高击杀
        this.maxK = 0;
        //最高助攻
        this.maxA = 0;
        //最高刷兵
        this.maxMK= 0;
        //最高伤害
        this.maxD = 0;
        //最高金钱
        this.maxG = 0;
        //最高承受伤害
        this.maxDT = 0;
        //最高塔杀
        this.maxTK = 0;
        
        this.allKDA = [0,0,0]; 
        this.towerK = 0;
        this.dragonK =0;
        this.barlonK =0;
        this.size = team;
        this.team = t[team];
        this.data = data;
        this.top = [];
        this.jug = [];
        this.mid = [];
        this.sup = [];
        this.ad = [];
        this.init();
    }
    Team.prototype = {
        role: ["top", "jug", "mid", "ad", "sup"],
        position: { "top": "TOP", "jug": "JUNGLE", "mid": "MIDDLE", "ad": "DUO_CARRY", "sup": "DUO_SUPPORT" },
        init: function() {
            for (var i = 0; i < this.data.participants.length; i++) {
                this.data.participants[i].tag=[];
                this.data.participants[i].index = i;
                if(this.data.participants[i].teamId == this.team){                   
                    this.allKDA[0]+=this.data.participants[i].stats.kills;
                    this.allKDA[1]+=this.data.participants[i].stats.deaths;
                    this.allKDA[2]+=this.data.participants[i].stats.assists;
                }
                if (this.data.participants[i].stats.totalDamageDealtToChampions > this.maxD) {
                    this.maxD = this.data.participants[i].stats.totalDamageDealtToChampions;
                }
                if (this.data.participants[i].stats.kills > this.maxK) {
                    this.maxK = this.data.participants[i].stats.kills;
                }
                if (this.data.participants[i].stats.assists > this.maxA) {
                    this.maxA = this.data.participants[i].stats.assists;
                }
                if (this.data.participants[i].stats.minionsKilled > this.maxMK) {
                    this.maxMK = this.data.participants[i].stats.minionsKilled;
                }
                if (this.data.participants[i].stats.goldEarned > this.maxG) {
                    this.maxG = this.data.participants[i].stats.goldEarned;
                }
                if (this.data.participants[i].stats.totalDamageTaken > this.maxDT) {
                    this.maxDT = this.data.participants[i].stats.totalDamageTaken;
                }
                if (this.data.participants[i].stats.towerKills > this.maxTK) {
                    this.maxTK = this.data.participants[i].stats.towerKills;
                }
                if (this.data.participants[i].stats.pentaKills != 0) {
                    this.data.participants[i].tag.push("五杀");
                }else if (this.data.participants[i].stats.quadraKills != 0) {
                    this.data.participants[i].tag.push("四杀");
                }else if (this.data.participants[i].stats.tripleKills != 0) {
                    this.data.participants[i].tag.push("三杀");
                }
                if (this.data.participants[i].stats.largestMultiKill > 7) {
                    this.data.participants[i].tag.push("超神");
                }
            }
            for (var i = 0; i < this.data.participants.length; i++) {
                if (this.data.participants[i].stats.totalDamageDealtToChampions == this.maxD) {
                    this.data.participants[i].tag.push("输出狂");
                }
                if (this.data.participants[i].stats.kills == this.maxK) {
                    this.data.participants[i].tag.push("人头狗");
                }
                if (this.data.participants[i].stats.assists == this.maxA) {
                    this.data.participants[i].tag.push("雷锋侠");
                }
                if (this.data.participants[i].stats.minionsKilled == this.maxMK) {
                    this.data.participants[i].tag.push("刷兵王");
                }
                if (this.data.participants[i].stats.goldEarned == this.maxG) {
                    this.data.participants[i].tag.push("土豪");
                }
                if (this.data.participants[i].stats.totalDamageTaken == this.maxDT) {
                    this.data.participants[i].tag.push("主坦克");
                }
                if (this.data.participants[i].stats.towerKills == this.maxTK) {
                    this.data.participants[i].tag.push("拆迁队");
                }
            }
            this.towerK = this.data.teams[this.team/100-1].towerKills;
            this.dragonK = this.data.teams[this.team/100-1].dragonKills;
            this.barlonK = this.data.teams[this.team/100-1].baronKills;
            this.getAll();
            this.check();
        },
        set: function(team) {
            //设置塔龙杀
            $("."+this.size+"Baronk").text(this.barlonK);
            $("."+this.size+"Dragonk").text(this.dragonK);
            $("."+this.size+"Towerk").text(this.towerK);
            //设置全队KDA
            $("."+this.size+"K").text(this.allKDA[0]);
            $("."+this.size+"D").text(this.allKDA[1]);
            $("."+this.size+"A").text(this.allKDA[2]);
            for (var i = 0; i < team.role.length; i++) {
                //设置头像
                $("." + team.size + "-team>li>.sumer>.top>.sumer-icon>img").eq(i).attr("src",
                    "http://ddragon.leagueoflegends.com/cdn/7.11.1/img/champion/" + team.getChaName(team[team.role[i]][0].championId) + ".png");
                //设置召唤师技能
                var spells = $("." + team.size + "-team>li>.sumer>.top>.skill>.spells");
                $(spells[i]).children("img").eq(0).attr("src", "http://ddragon.leagueoflegends.com/cdn/7.11.1/img/spell/" + team.getSpell(team[team.role[i]][0]["spell1Id"]) + ".png");
                $(spells[i]).children("img").eq(1).attr("src", "http://ddragon.leagueoflegends.com/cdn/7.11.1/img/spell/" + team.getSpell(team[team.role[i]][0]["spell2Id"]) + ".png");
                //设置天赋基石
                var masteryId = this.getMastery(team[team.role[i]][0].masteries);
                var mastery = $("." + team.size + "-team>li>.sumer>.top>.skill>.mastery");
                $(mastery[i]).children("img").attr("src", "http://ddragon.leagueoflegends.com/cdn/7.11.1/img/mastery/"+masteryId+".png");
                //设置召唤师姓名
                $("." + team.size + "-team>li>.sumer>p").eq(i).text(this.data.participantIdentities[team[team.role[i]][0].index].player.summonerName);
                //设置KDA数据
                $("." + team.size + "-team>li>.kda>.kda-info").eq(i).text(team[team.role[i]][0].stats.kills +"/"+ team[team.role[i]][0].stats.deaths+"/"+team[team.role[i]][0].stats.assists);
                //设置伤害量
                $("." + team.size + "-team>li>.kda>.dps>p").eq(i).text("伤害量："+team[team.role[i]][0].stats.totalDamageDealtToChampions);
                //设置dps进度条
                $("." + team.size + "-team>li>.kda>.dps>.dps-box>.dps-num").eq(i).css("width",team[team.role[i]][0].stats.totalDamageDealtToChampions/this.maxD*80+"%");
                var dateP = $("." + team.size + "-team>li>.data-box>.data");
                //设置等级
                $(dateP[i]).children("p").eq(0).text("等级："+team[team.role[i]][0].stats.champLevel);
                //设置补刀
                $(dateP[i]).children("p").eq(1).text("补刀："+team[team.role[i]][0].stats.minionsKilled);
                //设置金钱
                $(dateP[i]).children("p").eq(2).text("金钱："+parseInt(team[team.role[i]][0].stats.goldEarned/1000)+"K");
                //设置装备
                var items = $("." + team.size + "-team>li>.items>ul");
                for (var j = 0; j < $(items).eq(i).children("li").length; j++) {
                    var itemid = team[team.role[i]][0].stats["item"+j];
                    if (itemid == 0) {
                        continue;
                    }
                    $(items).eq(i).children("li").eq(j).children("img").attr("src","http://ddragon.leagueoflegends.com/cdn/7.11.1/img/item/"+itemid+".png")
                }
                for (var j = 0; j < 3 && j < team[team.role[i]][0].tag.length; j++) {
                    $("." + team.size + "-team>li>.kda>.king").eq(i).children(".king-item").eq(j).css("visibility","visible").text(team[team.role[i]][0].tag[j]);
                    
                }


            }   
        },
        getChaName: function(id) {
            return champion.data[id].key;
        },
        getMastery:function (masteries) {
            for (var i = 0; i < masteries.length; i++) {
                if(masteries[i].masteryId%100 > 60){
                    return masteries[i].masteryId;
                }
            }
        },
        getSpell: function(id) {
            for (var key in spells.data) {
                if (spells.data[key].key == id) {
                    return key;
                }
            }
        },
        getAll: function() {
            this.getTop();
            this.getJug();
            this.getMid();
            this.getAd();
            this.getSup();
        },
        change: function(role1, role2) {
            console.log(role1, role2);
            var mRole, lRole;
            if (this[role1].length == 2) {
                mRole = role1;
                lRole = role2;
            } else {
                mRole = role2;
                lRole = role1;
            }
            this.changeRole[lRole](mRole, this);
        },
        changeRole: {
            //中单位没有人选
            top:function (mRole, team) {
               $("#tips").text("上单位置没有匹配，正在进行判断");
            },
            mid: function(mRole, team) {
                $("#tips").text("中单位置没有匹配，正在进行判断");
                var that = team;
                var mRole = that[mRole];
                for (var i = 0; i < mRole.length; i++) {
                    //打野位有两个
                    for (var j = 0; j < mRole.length; j++) {
                        if (mRole[j].spell1Id != 11 && mRole[j].spell2Id != 11) {
                            that.mid = mRole.splice(j, 1);
                            return;
                        }
                    }
                }
            },
            jug:function (mRole, team) {
               $("#tips").text("打野位置没有匹配，正在进行判断");
            },
            ad:function (mRole, team) {
                $("#tips").text("AD位置没有匹配，正在进行判断");
                var that = team;
                var mRole = that[mRole];
                for (var i = 0; i < mRole.length; i++) {
                    //辅助位有两个
                    for (var j = 0; j < mRole.length; j++) {
                        if (mRole[j].spell1Id != 3 && mRole[j].spell2Id != 3) {
                            that.ad = mRole.splice(j, 1);
                            $("#tips").text($("#tips").text()+"-----AD位置匹配完成");
                            return;
                        }
                    }
                }
                $("#tips").text("AD位置未完成,当前matchid是"+matchid+",请记录并跟子杰说");
            },
            sup:function (mRole, team) {
               $("#tips").text("辅助位置没有匹配，正在进行判断");
            },
        },
        check: function() {
            var res = "team:" + this.team;
            var wrong = false;
            var wRole = [];
            for (var i = 0; i < this.role.length; i++) {
                if (this[this.role[i]].length != 1) {
                    res += (this.role[i] + this[this.role[i]].length);
                    wRole.push(this.role[i]);
                    wrong = true;
                }
            }
            if (wrong) {
                console.log("检测到错误");
                this.change(wRole[0], wRole[1]);
            }
            console.log(res);
        },
        getTop: function() {
            for (var i = 0; i < this.data.participants.length; i++) {
                if (this.data.participants[i].teamId == this.team && this.data.participants[i].timeline.lane == "TOP") {
                    this.top.push(this.data.participants[i]);
                }
            }
        },
        getJug: function() {
            for (var i = 0; i < this.data.participants.length; i++) {
                if (this.data.participants[i].teamId == this.team && this.data.participants[i].timeline.lane == "JUNGLE") {
                    this.jug.push(this.data.participants[i]);
                }
            }
        },
        getMid: function() {
            for (var i = 0; i < this.data.participants.length; i++) {
                if (this.data.participants[i].teamId == this.team && this.data.participants[i].timeline.lane == "MIDDLE") {
                    this.mid.push(this.data.participants[i]);
                }
            }
        },
        getAd: function() {
            for (var i = 0; i < this.data.participants.length; i++) {
                if (this.data.participants[i].teamId == this.team && this.data.participants[i].timeline.role == "DUO_CARRY") {
                    this.ad.push(this.data.participants[i]);
                }
            }
        },
        getSup: function() {
            for (var i = 0; i < this.data.participants.length; i++) {
                if (this.data.participants[i].teamId == this.team && this.data.participants[i].timeline.role == "DUO_SUPPORT") {
                    this.sup.push(this.data.participants[i]);
                }else if(this.data.participants[i].teamId == this.team && this.data.participants[i].timeline.lane == "BOTTOM" && this.data.participants[i].timeline.role != "DUO_CARRY"){
                    this.sup.push(this.data.participants[i]);
                }
            }
        }
    }
    //使用备用数据
    // var data = JSON.parse(api);
    // $(".top").find("img").attr("src","images/ttt.png");
    // blueT = new Team(data, "blue");
    // redT = new Team(data, "red");
    // blueT.set(blueT);
    // redT.set(redT);

})
