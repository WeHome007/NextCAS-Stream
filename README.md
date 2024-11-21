<img src="https://cdn.wehome.cn/cmn/jpeg/META-8NA66KC1-OYLELYLD6GZZBDJJRXAM3-CZSJKLNL-T3.jpeg?_t=2023111150" ></img>

# NextHuman NextHuman2D/3D交互数字人"实时串流SDK"

### 串流SDK
“3D超写实/高模卡通、2D高保真数字人、神经网络数字人”等在业务集成上有几大特点：“渲染设备要求较高”、“需要对UE/Unity/深度学习有较为不错的编程经验”、“开发周期长”，为了降低企业对这类数字人集成难度，我们开放了“串流SDK数字人”。串流数字人主要满足以下两大使用场景：

“云端串流”：此串流方式可以跨越任何设备(支持WebRTC即可)，在设备支持联网的情况下快速将高质量的数字人带入小程序、移动端、便携设备、PC/Web等各种性能参差不齐的终端，是最轻量级的“瘦客户端”数字人集成方案。

“本地串流”：此串流方式限定为局域网内串流，在SDK调用前，需要在局域网中一台Windows宿主机上安装了"NextHuman的本地客户端"(SAAS版或离线版皆可），且登陆账号或版本开通了“本机串流”的权限，当进入串流模式后，此时该机器就可以充当一台局域网内的“云渲染服务器”，同一局域网内的设备可通过串流SDK进行数字人串流和数字人操控，该终端模式目前只支持一路并发渲染。

### 快速开始

##### 1.SDK安装

```bash

npm install webrtc-adapter
npm install @nextcas/stream

```

##### 2.云端串流(初始化)

**特别注意：**使用云端串流的开发者，在开发过程中如果需要获取形象、环境等资源清单，可通过以下方式获取：<br/>
&nbsp;&nbsp;&nbsp;&nbsp;a)、超写实3D资产可以从 [NextHuman3D数字人](https://nexthuman.cn/api-web/) 网站直接查看对应的资产ID，并进行资产调用；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;b)、如果是2D角色资产可从 [NextHuman2D数字人](https://nexthuman.cn/live2d/)网站直接查看对应的资产ID，并进行资产调用；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;c)、使用 [道具管理接口](https://nexthuman.cn/developer/#/open/docs/daoju)查询不同类型的数字人/场景等资产ID；

**其他：待补充**


##### 3.本地串流(初始化)

**特别注意：** 
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;a)、本地串流目前只提供了超写实3D的推流终端，如果是需要对2D数字人进行本机串流的客户，可具体咨询官方客服。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;b)、开发时请先联系官方客服获取本地串流的客户端下载地址并卡通本机串流权限，客户端安装好之后，在“系统托盘”中，有一个对应客户端的图标，通常存在两种以上的模式：Studio终端、本机串流。Studio模式通常用于开发者去创建形象、智能体、环境等资产，并查看资产ID以便于在串流SDK中进行调用，当要使用串流SDK进行调用时，请务必将模式切换到“本机串流“模式，否则SDK无法正常串流。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;c)、本地串流SDK调用之前，建议使用“Studio终端”进入“虚拟直播”**提前将SDK要访问的形象/环境资产下载**完成，这样串流SDK访问会更流畅，否则SDK首次加载形象会等待很久。

```typescript
import { NextStream, PresetCameraConfig } from '@nextcas/stream'

const stream = await NextStream.createLocal({
  ip: '192.168.20.157',//客户端所在局域网IP，如果是渲染应用和客户端在同一机器，使用127.0.0.1即可
  actorId: 'actor_102217',//替换为自己创建的智能体ID
  container: '#app' , 
  avatarId: 'avatar_63edcef5ea719833f2b1eaff',//替换为自己的形象ID
  scene: 'transparent',//
})
// 设置初始镜头
stream.setCamera(PresetCameraConfig.Full)

// 启动
stream.start()
```
参数说明：

| 参数名称  | 类型                                                  | require | 描述                     |
| --------- | ----------------------------------------------------- | ------- | ------------------------ |
| container | HtmlElement \| string                                 | true    | 挂载的dom容器            |
| avatarId  | string                                                | true    | 形象ID                   |
| actorId   | string                                                | true    | 智能体ID                 |
| scene     | `'transparent'` \| `{type:('nus'\|'scene',id:string}` | true    | 场景                     |
| ip        | string                                                | true    | 需要连接的客户端的ip地址 |


### SDK方法

SDK接口具体登录 [开发者中心](https://nexthuman.cn/developer/#/open/docs/stream)。![](Assets/Login.png)

