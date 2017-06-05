$(function() {
    var blueT = null;
    var redT = null;
    $("#bgSetB").click(function () {
        var bgcolor = $("#bgset").val();
        $("body").css("backgroundColor",bgcolor);
    })


    //点击按钮开始运行
    // $("#btn").click(function() {
    //     var matchid = $("#matchid").val();
    //     $.ajax({
    //         url: "https://kr.api.riotgames.com/api/lol/KR/v2.2/match/" + matchid + "?includeTimeline=false&api_key=",
    //         success: function(data) {
    //             blueT = new Team(data, "blue");
    //             redT = new Team(data, "red");
    //             blueT.set(blueT);
    //             redT.set(redT);
    //         }
    //     })
    // });
    

    function Team(data, team) {

        var t = {
            blue: 100,
            red: 200
        }
        this.maxD = 0;
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
                this.data.participants[i].index = i;
                if (this.data.participants[i].stats.totalDamageDealtToChampions > this.maxD) {
                    this.maxD = this.data.participants[i].stats.totalDamageDealtToChampions;
                }
            }
            console.log(this.maxD);
            this.getAll();
            this.check();
        },
        set: function(team) {
            for (var i = 0; i < team.role.length; i++) {
                //设置头像
                $("." + team.size + "-team>li>.sumer>.top>.sumer-icon>img").eq(i).attr("src",
                    "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/" + team.getChaName(team[team.role[i]][0].championId) + ".png");
                //设置召唤师技能
                var spells = $("." + team.size + "-team>li>.sumer>.top>.skill>.spells");
                $(spells[i]).children("img").eq(0).attr("src", "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + team.getSpell(team[team.role[i]][0]["spell1Id"]) + ".png");
                $(spells[i]).children("img").eq(1).attr("src", "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + team.getSpell(team[team.role[i]][0]["spell2Id"]) + ".png");
                //设置天赋基石
                var masteryId = this.getMastery(team[team.role[i]][0].masteries);
                var mastery = $("." + team.size + "-team>li>.sumer>.top>.skill>.mastery");
                $(mastery[i]).children("img").attr("src", "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/mastery/"+masteryId+".png");
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
                    $(items).eq(i).children("li").eq(j).children("img").attr("src","http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/"+itemid+".png")
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
            mid: function(mRole, team) {
                console.log("中单位置填补");
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
            }
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
                }
            }
        }
    }
    //使用备用数据
    var data = JSON.parse(api);
    blueT = new Team(data, "blue");
    redT = new Team(data, "red");
    blueT.set(blueT);
    redT.set(redT);

})
