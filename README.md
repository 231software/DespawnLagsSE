# DespawnLagsSE
DespawnLagsSE是Tsubasa6848作品DespawnLags的脚本引擎版。该插件参考了Tsubasa6848的发布的DespawnLags模板https://www.minebbs.com/resources/despawnlags-template-llse.6844/ ，添加了相应代码以还原DespawnLags功能。    
同时，DespawnLagsSE借助其平台优势，将通过LNSDK同时支持LeviLamina和LiteLoaderBDS。此外，DespawnLagsSE还计划通过LNSDK支持PowerNukkitX，实现同一个插件安装包和配置文件即可在大部分基岩版服务器上运行，即使核心、版本等不同。  
虽然因使用了LLSE原生接口导致插件无法跨bds版本兼容，但是目前插件正在开发一个通过调用基本LLSE接口来实现控制掉落物存在时长的功能。该功能虽然性能不如调用原生接口，但可以保证插件在符号或偏移量未知的bds版本、LNSDK未公布符号和偏移量配置文件、在PowerNukkitX等无法使用原生接口的服务端上运行时能够正常工作，不致服务器崩溃。该插件预期能够自动检测其运行环境，如果无法调用原生接口，则开启算法。
## 安装方法  
### 0.0.1-？  
1. 请将下载的zip文件解压。
2. - 对于LiteLoader/LeviLamina：在plugins/nodejs文件夹中新建叫DespawnLags的文件夹，然后将解压出的文件复制到其中。
   - 对于PowerNukkitX：请在服务器中安装LLSE-Lib，然后在plugins文件夹中新建叫@DespawnLags的文件夹，将解压出的文件复制到其中。
  
## 更新方法
### 0.0.1-？更新到0.0.1-？
1. 请将下载的zip文件解压。
2. - 对于LiteLoader/LeviLamina：将解压出的文件复制到plugins/nodejs/DespawnLags，对于相同名称的文件选择全部替换。
   - 对于PowerNukkitX：将LLSE-Lib更新至最新版，将解压出的文件复制到plugins/@DespawnLags，对于相同名称的文件选择全部替换。
## 使用方法
请参考[插件原帖](https://www.minebbs.com/resources/despawnlags-addon.4796/)  
## 更新符号和偏移量配置方法
由于使用了LLSE原生接口，插件无法做到全版本通用，因此更新服务器版本时，请更新插件的符号和偏移量配置文件。本插件遵守LNSDK相关标准，您可直接按照LNSDK提供的说明进行操作。  
**LNSDK相关开发工作尚未完成，敬请期待**
## 注意事项
- 由于使用了LLSE原生接口，插件无法做到全版本通用，因此更新服务器版本时，需要按本文 更新符号和偏移量配置方法 为插件更新符号和偏移量。
- 详细说明和操作方法，请参考插件readme。
- 也不要在服务器运行时使用`ll load/reload/unload`等加载卸载插件指令操作此插件，这将导致服务器崩溃，并可能造成数据丢失或损坏。
