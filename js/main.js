$(function() {
    var blueT = null;
    var redT = null;
    //点击按钮开始运行
    $("#btn").click(function() {
        var matchid = $("#matchid").val();
        $.ajax({
            url: "https://kr.api.riotgames.com/api/lol/KR/v2.2/match/" + matchid + "?includeTimeline=false&api_key=",
            success: function(data) {
                blueT = new Team(data, "blue");
                redT = new Team(data, "red");
                blueT.set(blueT);
                redT.set(redT);
            }
        })
    });
    //使用备用数据
    // var data = JSON.parse(api);
    // blueT = new Team(data,"blue");
    // redT = new Team(data,"red");

    function Team(data, team) {

        var t = {
            blue: 100,
            red: 200
        }
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
            }
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

                console.log(team[team.role[i]][0]["spell1Id"]);
                $(spells[i]).children("img").eq(1).attr("src", "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + team.getSpell(team[team.role[i]][0]["spell1Id"]) + ".png")

                //设置召唤师姓名
                $("." + team.size + "-team>li>.sumer>p").eq(i).text(this.data.participantIdentities[team[team.role[i]][0].index].player.summonerName);
            }
        },
        getChaName: function(id) {
            return champion.data[id].key;
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

})
