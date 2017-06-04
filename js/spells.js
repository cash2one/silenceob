var spells ={"type":"summoner","version":"6.24.1","data":{"SummonerBarrier":{"id":"SummonerBarrier","name":"Barrier","description":"Shields your champion from 115-455 damage (depending on champion level) for 2 seconds.","tooltip":"Temporarily shields {{ f1 }} damage from your champion for 2 seconds.","maxrank":1,"cooldown":[180],"cooldownBurn":"180","cost":[0],"costBurn":"0","effect":[null,[95],[20]],"effectBurn":[null,"95","20"],"vars":[],"key":"21","summonerLevel":4,"modes":["ARAM","CLASSIC","TUTORIAL","ODIN","ASCENSION","FIRSTBLOOD"],"costType":"NoCost","maxammo":"-1","range":[1200],"rangeBurn":"1200","image":{"full":"SummonerBarrier.png","sprite":"spell0.png","group":"spell","x":0,"y":0,"w":48,"h":48},"resource":"No Cost"},"SummonerBoost":{"id":"SummonerBoost","name":"Cleanse","description":"Removes all disables (excluding suppression) and summoner spell debuffs affecting your champion and lowers the duration of incoming disables by 65% for 3 seconds.","tooltip":"Removes all disables (excluding suppression) and summoner spell debuffs affecting your champion and reduces the duration of disables by 65% for the next {{ f1 }} seconds.","maxrank":1,"cooldown":[210],"cooldownBurn":"210","cost":[0],"costBurn":"0","effect":[null,[0.65],[3]],"effectBurn":[null,"0.65","3"],"vars":[{"link":"@text","coeff":3.0,"key":"f1"}],"key":"1","summonerLevel":6,"modes":["CLASSIC","ODIN","TUTORIAL","ARAM","ASCENSION","FIRSTBLOOD"],"costType":"NoCost","maxammo":"-1","range":[200],"rangeBurn":"200","image":{"full":"SummonerBoost.png","sprite":"spell0.png","group":"spell","x":48,"y":0,"w":48,"h":48},"resource":"No Cost"},"SummonerDot":{"id":"SummonerDot","name":"Ignite","description":"Ignites target enemy champion, dealing 70-410 true damage (depending on champion level) over 5 seconds, grants you vision of the target, and reduces healing effects on them for the duration.","tooltip":"Ignite deals <span class=\"colorFEFCFF\">{{ f1 }}</span> true damage to target enemy champion over 5 seconds, grants you vision of the target and applies Grievous Wounds for the duration.<br><br><i>(Grievous Wounds reduces healing effects by 40%. This vision does not reveal stealthed enemies.)</i>","leveltip":{"label":[""],"effect":[""]},"maxrank":1,"cooldown":[210],"cooldownBurn":"210","cost":[0],"costBurn":"0","effect":[null,[5],[10],[4],[100]],"effectBurn":[null,"5","10","4","100"],"vars":[{"link":"@player.level","coeff":[70.0,90.0,110.0,130.0,150.0,170.0,190.0,210.0,230.0,250.0,270.0,290.0,310.0,330.0,350.0,370.0,390.0,410.0],"key":"f1"}],"key":"14","summonerLevel":10,"modes":["CLASSIC","ODIN","TUTORIAL","ARAM","ASCENSION","FIRSTBLOOD"],"costType":"NoCost","maxammo":"-1","range":[600],"rangeBurn":"600","image":{"full":"SummonerDot.png","sprite":"spell0.png","group":"spell","x":144,"y":0,"w":48,"h":48},"resource":"No Cost"},"SummonerExhaust":{"id":"SummonerExhaust","name":"Exhaust","description":"Exhausts target enemy champion, reducing their Movement Speed and Attack Speed by 30%, their Armor and Magic Resist by 10, and their damage dealt by 40% for 2.5 seconds.","tooltip":"Exhausts target enemy champion, reducing their Movement Speed and Attack Speed by {{ f3 }}%, their Armor and Magic Resist by {{ f4 }}, and their damage dealt by {{ f2 }}% for 2.5 seconds.","maxrank":1,"cooldown":[210],"cooldownBurn":"210","cost":[0],"costBurn":"0","effect":[null,[2.5],[40],[30],[10],[30]],"effectBurn":[null,"2.5","40","30","10","30"],"vars":[],"key":"3","summonerLevel":4,"modes":["CLASSIC","ODIN","TUTORIAL","ARAM","ASCENSION","FIRSTBLOOD"],"costType":"NoCost","maxammo":"-1","range":[650],"rangeBurn":"650","image":{"full":"SummonerExhaust.png","sprite":"spell0.png","group":"spell","x":192,"y":0,"w":48,"h":48},"resource":"No Cost"},"SummonerFlash":{"id":"SummonerFlash","name":"Flash","description":"Teleports your champion a short distance toward your cursor's location.","tooltip":"Teleports your champion a short distance toward your cursor's location.","maxrank":1,"cooldown":[300],"cooldownBurn":"300","cost":[0],"costBurn":"0","effect":[null,[400]],"effectBurn":[null,"400"],"vars":[],"key":"4","summonerLevel":8,"modes":["CLASSIC","ODIN","TUTORIAL","ARAM","ASCENSION","FIRSTBLOOD"],"costType":"NoCost","maxammo":"-1","range":[425],"rangeBurn":"425","image":{"full":"SummonerFlash.png","sprite":"spell0.png","group":"spell","x":240,"y":0,"w":48,"h":48},"resource":"No Cost"},"SummonerHaste":{"id":"SummonerHaste","name":"Ghost","description":"Your champion can move through units and has 28-45% (depending on champion level) increased Movement Speed for 10 seconds.","tooltip":"Your champion can move through units and has {{ f1 }}% increased Movement Speed for 10 seconds.","maxrank":1,"cooldown":[180],"cooldownBurn":"180","cost":[0],"costBurn":"0","effect":[null,[27],[1]],"effectBurn":[null,"27","1"],"vars":[{"link":"@text","coeff":27.0,"key":"f1"}],"key":"6","summonerLevel":1,"modes":["CLASSIC","ODIN","TUTORIAL","ARAM","ASCENSION","FIRSTBLOOD"],"costType":"NoCost","maxammo":"-1","range":[200],"rangeBurn":"200","image":{"full":"SummonerHaste.png","sprite":"spell0.png","group":"spell","x":288,"y":0,"w":48,"h":48},"resource":"No Cost"},"SummonerHeal":{"id":"SummonerHeal","name":"Heal","description":"Restores 90-345 Health (depending on champion level) and grants 30% Movement Speed for 1 second to you and target allied champion. This healing is halved for units recently affected by Summoner Heal.","tooltip":"Restores {{ f1 }} Health and grants 30% Movement Speed for 1 second to your champion and target allied champion. This healing is halved for units recently affected by Summoner Heal.<br><br><span class=\"colorFFFF00\">If this spell cannot find a target, it will cast on the most wounded allied champion in range.</span>","maxrank":1,"cooldown":[240],"cooldownBurn":"240","cost":[0],"costBurn":"0","effect":[null,[0.3],[75],[15],[0.5],[826]],"effectBurn":[null,"0.3","75","15","0.5","826"],"vars":[{"link":"@player.level","coeff":[90.0,105.0,120.0,135.0,150.0,165.0,180.0,195.0,210.0,225.0,240.0,255.0,270.0,285.0,300.0,315.0,330.0,345.0],"key":"f1"}],"key":"7","summonerLevel":1,"modes":["CLASSIC","ODIN","TUTORIAL","ARAM","ASCENSION","FIRSTBLOOD"],"costType":"NoCost","maxammo":"-1","range":[850],"rangeBurn":"850","image":{"full":"SummonerHeal.png","sprite":"spell0.png","group":"spell","x":336,"y":0,"w":48,"h":48},"resource":"No Cost"},"SummonerMana":{"id":"SummonerMana","name":"Clarity","description":"Restores 50% of your champion's maximum Mana. Also restores allies for 25% of their maximum Mana.","tooltip":"Restores {{ f1 }}% maximum Mana to your Champion and {{ f2 }}% to nearby allies.","maxrank":1,"cooldown":[240],"cooldownBurn":"240","cost":[0],"costBurn":"0","effect":[null,[50],[25]],"effectBurn":[null,"50","25"],"vars":[{"link":"@player.level","coeff":[190.0,220.0,250.0,280.0,310.0,340.0,370.0,400.0,430.0,460.0,490.0,520.0,550.0,580.0,610.0,640.0,670.0,700.0],"key":"f1"},{"link":"@player.level","coeff":[95.0,110.0,125.0,140.0,155.0,170.0,185.0,200.0,215.0,230.0,245.0,260.0,275.0,290.0,305.0,320.0,335.0,350.0],"key":"f2"}],"key":"13","summonerLevel":1,"modes":["ODIN","ARAM","ASCENSION"],"costType":"NoCost","maxammo":"-1","range":[600],"rangeBurn":"600","image":{"full":"SummonerMana.png","sprite":"spell0.png","group":"spell","x":384,"y":0,"w":48,"h":48},"resource":"No Cost"},"SummonerPoroRecall":{"id":"SummonerPoroRecall","name":"To the King!","description":"Quickly travel to the Poro King's side.","tooltip":"<span class=\"colorFFE076\">Passive:</span> Hitting an enemy champion with a Poro gives your team a Poro Mark. Upon reaching 10 Poro Marks, your team summons the Poro King to fight alongside them. While the Poro King is active, no Poro Marks can be scored by either team.<br><br><span class=\"colorFFE076\">Active:</span> Quickly dash to King Poro's side. Can only be cast while the Poro King is summoned for your team. <br><br><i><span class=\"colorFDD017\">''Poros tug the heartstrings. The rest of you just comes along for the ride.''</span></i>","maxrank":1,"cooldown":[10],"cooldownBurn":"10","cost":[0],"costBurn":"0","effect":[null,[3000]],"effectBurn":[null,"3000"],"vars":[],"key":"30","summonerLevel":1,"modes":["KINGPORO"],"costType":"NoCost","maxammo":"-1","range":[200],"rangeBurn":"200","image":{"full":"SummonerPoroRecall.png","sprite":"spell0.png","group":"spell","x":432,"y":0,"w":48,"h":48},"resource":"No Cost"},"SummonerPoroThrow":{"id":"SummonerPoroThrow","name":"Poro Toss","description":"Toss a Poro at your enemies. If it hits, you can quickly travel to your target as a follow up.","tooltip":"Toss a Poro a long distance, dealing {{ f2 }} true damage to the first enemy unit hit. This ability can be recast for 3 seconds if it hits an enemy to dash to the target hit. Dashing to the target will reduce the cooldown of Poro Toss by 5 seconds.<br><br>Poros are not blocked by spell shields or wind walls because they are animals, not spells!<br><br><i><span class=\"colorFDD017\">''Poros are a model for Runeterran aerodynamics.''</span></i>","maxrank":1,"cooldown":[20],"cooldownBurn":"20","cost":[0],"costBurn":"0","effect":[null,[20],[10]],"effectBurn":[null,"20","10"],"vars":[],"key":"31","summonerLevel":1,"modes":["KINGPORO"],"costType":"NoCost","maxammo":"-1","range":[2500],"rangeBurn":"2500","image":{"full":"SummonerPoroThrow.png","sprite":"spell0.png","group":"spell","x":0,"y":48,"w":48,"h":48},"resource":"No Cost"},"SummonerSmite":{"id":"SummonerSmite","name":"Smite","description":"Deals 390-1000 true damage (depending on champion level) to target epic or large monster or enemy minion. Restores Health based on your maximum life when used against monsters.","tooltip":"Deals <span class=\"colorFEFCFF\">{{ f1 }}</span> true damage to target epic or large monster or enemy minion.  Against monsters, additionally restores <span class=\"colorFFFFFF\">{{ f6 }}</span> <span class=\"colorFF6666\">(+{{ f7 }})</span> Health.<br><br>Smite regains a charge every {{ f3 }} seconds, up to a maximum of 2 charges.","maxrank":1,"cooldown":[75],"cooldownBurn":"75","cost":[0],"costBurn":"0","effect":[null,[15]],"effectBurn":[null,"15"],"vars":[{"link":"@player.level","coeff":[390.0,410.0,430.0,450.0,480.0,510.0,540.0,570.0,600.0,640.0,680.0,720.0,760.0,800.0,850.0,900.0,950.0,1000.0],"key":"f1"}],"key":"11","summonerLevel":10,"modes":["CLASSIC","TUTORIAL","FIRSTBLOOD"],"costType":"NoCost","maxammo":"2","range":[500],"rangeBurn":"500","image":{"full":"SummonerSmite.png","sprite":"spell0.png","group":"spell","x":48,"y":48,"w":48,"h":48},"resource":"No Cost"},"SummonerSnowball":{"id":"SummonerSnowball","name":"Mark","description":"Throw a snowball in a straight line at your enemies. If it hits an enemy, they become marked and your champion can quickly travel to the marked target as a follow up.","tooltip":"Throw a snowball a long distance, dealing {{ f1 }} true damage to the first enemy unit hit. If it hits an enemy, this ability can be recast for {{ f2 }} seconds to Dash to the tagged unit, dealing an additional {{ f5 }} true damage. Dashing to the target will reduce the cooldown of Mark by {{ f3 }}%.<br><br><span class=\"colorFFFF00\">Mark projectiles are not stopped by spell shields or projectile mitigation.</span>","maxrank":1,"cooldown":[80],"cooldownBurn":"80","cost":[0],"costBurn":"0","effect":[null,[1200],[20],[10],[0.5]],"effectBurn":[null,"1200","20","10","0.5"],"vars":[],"key":"32","summonerLevel":1,"modes":["ARAM","FIRSTBLOOD"],"costType":"NoCost","maxammo":"-1","range":[1600],"rangeBurn":"1600","image":{"full":"SummonerSnowball.png","sprite":"spell0.png","group":"spell","x":96,"y":48,"w":48,"h":48},"resource":"No Cost"},"SummonerTeleport":{"id":"SummonerTeleport","name":"Teleport","description":"After channeling for 4.5 seconds, teleports your champion to target allied structure, minion, or ward.","tooltip":"After channeling for {{ f1 }} seconds, your champion teleports to target allied structure, minion, or ward.<br><br>You may reactivate Teleport to cancel it, placing it on a {{ f3 }} second cooldown.","maxrank":1,"cooldown":[300],"cooldownBurn":"300","cost":[0],"costBurn":"0","effect":[null,[4.5],[200]],"effectBurn":[null,"4.5","200"],"vars":[{"link":"@text","coeff":4.0,"key":"f1"}],"key":"12","summonerLevel":6,"modes":["CLASSIC","TUTORIAL"],"costType":"NoCost","maxammo":"-1","range":[25000],"rangeBurn":"25000","image":{"full":"SummonerTeleport.png","sprite":"spell0.png","group":"spell","x":144,"y":48,"w":48,"h":48},"resource":"No Cost"}}}