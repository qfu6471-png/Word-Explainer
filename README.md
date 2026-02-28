deepseek-word-explainer/  # 仓库根目录（命名简洁易懂）
├── content.js            # 核心逻辑文件
├── manifest.json         # 插件配置文件
├── icon.png              # 插件图标（可选，48x48/128x128 PNG 格式）
└── README.md             # 使用说明文档（核心）

# DeepSeek 划词解释插件

一款轻量级浏览器插件，支持划词后右键触发解释，弹窗固定在网页右上角，点击任意位置可关闭，适配所有网页。

 ✨ 核心功能
- 🖱️ 划词后右键选中区域，触发解释弹窗（空白处右键保留原生菜单）；
- 📍 弹窗固定在网页右上角，无背景变暗，不遮挡核心内容；
- ❌ 点击页面任意位置可关闭弹窗（无需点击关闭按钮）；
- 🌐 适配所有网页（小红书/百度/知乎等），无兼容性问题；
- ⚡ 轻量无冗余，仅依赖 DeepSeek API，无其他第三方依赖。

📥 安装方法（Edge/Chrome 通用）
1. 下载源码
- 方式 1：GitHub 页面点击 `Code` → `Download ZIP`，解压到本地；
- 方式 2：Git 克隆：`git clone https://github.com/qfu6471-png/Word-Explainer.git`。

2. 浏览器加载插件
1. 打开浏览器扩展页面：
   - Edge：`edge://extensions/`；
   - Chrome：`chrome://extensions/`；
2. 开启右上角「开发者模式」；
3. 点击「加载已解压的扩展程序」，选择解压后的插件目录；
4. 加载完成后，插件会显示在扩展列表中，启用即可。

🚀 使用说明
1. 打开任意网页，选中需要解释的文本；
2. 右键点击**选中的文本区域**（不是空白处），触发解释弹窗；
3. 弹窗会显示 DeepSeek 返回的解释内容，点击页面任意位置可关闭弹窗；
4. 未选中文本时，右键空白处仍显示浏览器原生右键菜单（不干扰正常使用）。

⚙️ 配置修改
 1. 替换 DeepSeek API Key（核心）
打开 `content.js`，找到以下行，替换为你的有效 API Key：
```javascript
const API_KEY = "Bearer sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // 替换为你的 Key
