PLUGIN_NAME="DespawnLags"

log("DespawnLagsSE开始运行")

conf=new JsonConfigFile("plugins/"+PLUGIN_NAME+"/config.json")

conf.init("Config",{
    DespawnTicks: 600,
    Whitelist: [
        "minecraft:netherite_helmet",
        "minecraft:netherite_sword",
        "minecraft:netherite_chestplate",
        "minecraft:netherite_leggings",
        "minecraft:undyed_shulker_box",
        "minecraft:netherite_boots",
        "minecraft:shulker_box",
        "minecraft:elytra",
        "minecraft:dragon_egg",
        "minecraft:nether_star"
    ]
})

function getDespawnTime(){
    return conf.get("Config").DespawnTicks*50
}

const IntervalBase=1000

/*
算法：每隔一段时间就检测一次服务器中所有的掉落物
每个掉落物记下它的uuid
在插件内部，存储着每个uuid对应的第一次检测到它的时间
检测的时候，让检测过程在单独的线程中运行
如果距离第一次检测到这个掉落物已经过去的刻数超过了所预定最长时间，就把这个掉落物清除
*/

/**原定用于保存实时实体列表，应该是没用了 */
let items=[]
/**服务器中实体第一次出现的时间 */
let exist={}

function onServerStarted(){

}
mc.listen("onServerStarted",onServerStarted)

function refreshItems(){
    //let start=new Date().getTime()
    //log("refresh")
    //为了刷新物品列表，需要将其重置，才能重新向其中添加
    items=[]
    mc.getAllEntities().forEach((entity)=>{
        /**遍历发生时的时间 */
        //let currentTime=new Date().getTime();
        if(entity.isItemEntity()){
            //如果当前物品实体找不到uuid就直接中断(已弃用)
            //if(!entity.uniqueId==null)return;
            //如果当前物品在白名单中就直接中断
            if(conf.get("Config").Whitelist.includes(entity.toItem().type))return;
            //先检查exist中是否应该清除，再将当前物品的列表加入items（刷新items）
            if(exist[entity.uniqueId]!=undefined){
                //在已保存的物品实体列表中发现了当前遍历到的这个实体
                if(exist[entity.uniqueId]>=getDespawnTime()/IntervalBase){
                    //实体中保存的留存检测次数达到了实体最大留存检测次数（留存时间/循环间隔），证明这个实体应该被清除
                    //将实体清除
                    entity.despawn()
                    //将实体的相关记录清除
                    //将实体在exist中的记录清除
                    delete exist[entity.uniqueId]
                }
                else{
                    //没有超过，那么此次检测就将原记录+1
                    exist[entity.uniqueId]++
                }
            }
            else{
                //没有找到这个实体，说明这个实体是第一次出现在插件中，那就把它初始化
                //将新发现的uuid保存
                exist[entity.uniqueId]=1;
            }
            //刷新items
            //items.push(entity);            
            //log(typeof(item.getNbt().getData("UniqueID")))

        }
    })
    //let stop=new Date().getTime()
    //log("耗时"+(stop-start).toString())
}

/*
function checkItems(){
    let currentTime=new Date().getTime();
    for(let uuid in items){
        if(items[uuid]+getDespawnTime()<currentTime){
            
        }
    }
}
*/

/**创建检测循环 */
function refreshLoop(){
    return setInterval(refreshItems,IntervalBase)
}

/**
 * 获取指定实体的UUID
 * @param {LLSE_Entity} entity 要获取UUID的实体
 * @returns {number} 实体的UUID
 */
function getEntityUUID(entity){
    if(!entity.getNbt().getKeys().includes("UniqueID"))return null;
    return entity.getNbt().getData("UniqueID")
}

let mainloop=refreshLoop()

//每半小时清除一次exist防止缓存过大造成安全隐患
let clearCacheInterval=setInterval(()=>{
    exist={}
},1800000)



/*
def test():
    a=1 

testmp=multiprocessing.Process(target=test)

testmp.start()
testmp.join()
*/

//log("第一个掉落物的nbt：")
//log(items[0].getNbt().getKeys())

//测试uuid
/*
for item in items:
    for key in item.getNbt().getKeys():
        if key!="UniqueID":
            continue
        log("掉落物"+item.name+"的nbt中存在UniqueID标签，值为："+str(item.getNbt().getData("UniqueID")))
        break
*/


ll.registerPlugin("DespawnLags","DespawnLags的脚本引擎版",[0,0,1,Version.Dev],{Author:"Tsubasa6848,NewMoonMinecraftStudio",GitHub:"https://www.github.com/231software/DespawnLagsSE"})