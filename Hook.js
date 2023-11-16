// LiteLoader-AIDS automatic generated
/// <reference path="./dts/HelperLib-master/src/index.d.ts"/> 
const conf=require("./Config.js");
const JsonFile=require("./lib/JsonFile.js");

function getDespawnTimeOffset(protocol) {         // IDA: ItemActor::postNormalTick()
    if (protocol >= 594) {  // Since 1.20.10
        return 1364;
    }
    else if (protocol >= 589) {  // Since 1.20.0
        return 1396;
    }
    else if (protocol >= 575) {  // Since 1.19.70
        return 1316;
    }
    else if (protocol >= 568) {  // Since 1.19.60
        return 1332;
    }
    else if (protocol >= 560) {  // Since 1.19.50
        return 1644;
    }
    else if (protocol >= 557) {  // Since 1.19.40
        return 1692;
    }
    else if (protocol >= 554) {  // Since 1.19.30
        return 1748;
    }
    else if (protocol >= 545) {  // Since 1.19.20
        return 1956;
    }
    else if (protocol >= 534) {  // Since 1.19.10
        return 1948;
    }
    else if (protocol >= 503) {  // Since 1.18.30
        return 2012;
    }
    else if (protocol >= 486) {  // Since 1.18.10
        return 1996;
    }
    else if (protocol >= 475) {  // Since 1.18.0
        return 2020;
    }
    return 0;  // Before 1.18.0 is NOT supported
}

const BDS_PROTOCOL = mc.getServerProtocolVersion();
const DESPAWN_TIME_OFFSET = getDespawnTimeOffset(BDS_PROTOCOL);

const ItemSpawnEvent = NativeFunction.fromSymbol("?spawnItem@Spawner@@QEAAPEAVItemActor@@AEAVBlockSource@@AEBVItemStack@@PEAVActor@@AEBVVec3@@H@Z").hook(ItemSpawnEventHandler);
function ItemSpawnEventHandler(ptr1, ptr2, ptr3, ptr4, ptr5, ptr6){
    let result = ItemSpawnEvent.call(ptr1, ptr2, ptr3, ptr4, ptr5, ptr6);
    if (!result.isNull()) {
        let entity = result.asEntity();        // 获取掉落物实体（此处entity一定不为null，无需再次判断）
        let item = entity.toItem();            // 获取掉落物物品对象（此处的entity一定是掉落物实体，无需再次判断）

        // 以下内容仅为模板，其余内容自行完善（配置文件、命令等）
        // 示例：如果掉落物是基岩，则将该掉落物存在时长设置为 114514 ticks
        if (!conf.get("Config").Whitelist.includes(item.type)) {
            result.offset(DESPAWN_TIME_OFFSET).int32 = conf.get("Config").DespawnTicks;
        }
    }
    return result;
}

let maincmd = mc.newCommand(conf.get("Config").Command,"设置掉落物存在时长");
maincmd.mandatory("time",ParamType.Int)
maincmd.overload(["time"])
maincmd.setCallback(function(cmd,origin,output,results){
	new JsonFile("plugins/DespawnLags/config.json",["Config"]).set("DespawnTicks",results.time);
    conf.reload();
    logger.info("将掉落物存在时长设置为",results.time)
})
maincmd.setup();