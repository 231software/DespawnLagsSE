const JsonFile=require("./lib/JsonFile.js");
const conf=new JsonFile("plugins/DespawnLags/config.json");
conf.init("Config",{});
const config=new JsonFile("plugins/DespawnLags/config.json",["Config"]);
config.init("Command","despawntime");
config.init("DespawnTicks",600);
config.init("Whitelist",[
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
])
module.exports=conf;