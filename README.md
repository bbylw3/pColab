# ColabHub

一个基于 [XyHK-HUC/Colab](https://github.com/XyHK-HUC/Colab) 项目的订阅管理界面，采用 PornHub 风格的 UI 设计。

## 项目简介

这是一个简单的代理订阅管理界面，支持 Shadowsocks、Singbox 和 Clash 三种协议。项目可以使用 Cloudflare Workers 或 Pages 部署，提供了一个美观的用户界面来管理和分发订阅链接。

### 主要特点

- 🎨 PornHub 风格的用户界面
- 🚀 支持多种代理协议
- 📋 一键复制订阅链接
- 💾 本地保存使用教程
- ☁️ 支持 Workers/Pages 双部署方式

## 部署说明

### 方式一：Cloudflare Workers 部署

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 Workers & Pages
3. 创建新的 Worker
4. 复制 `worker.js` 的内容到编辑器中
5. 修改 `baseUrl` 为你的订阅源地址
6. 点击 "保存并部署"

### 方式二：Cloudflare Pages 部署

1. Fork 本仓库到你的 GitHub 账号
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
3. 进入 Pages 页面
4. 点击 "创建项目" 按钮
5. 选择 "连接到 Git" 
6. 选择你 Fork 的仓库
7. 部署配置：
   - 构建命令：留空
   - 构建输出目录：留空
   - 环境变量：无需设置
8. 点击 "保存并部署"

部署完成后，Cloudflare 会提供一个 `*.workers.dev` 或 `*.pages.dev` 的域名。

### 绑定自定义域名

#### Workers 自定义域名
1. 确保你的域名已经添加到 Cloudflare
2. 在 Workers & Pages 中选择你的 Worker
3. 点击 "触发器" 标签
4. 在 "自定义域" 部分点击 "添加自定义域"
5. 输入你想要使用的域名（例如：`sub.yourdomain.com`）
6. 按照提示完成 DNS 记录的配置

#### Pages 自定义域名
1. 确保你的域名已经添加到 Cloudflare
2. 在 Pages 项目中点击 "自定义域" 标签
3. 点击 "设置自定义域"
4. 输入你想使用的域名
5. Cloudflare 会自动配置必要的 DNS 记录
6. 等待 SSL 证书部署完成

## 使用说明

1. 点击对应协议的按钮（Shadowsocks/Singbox/Clash）
2. 系统会自动复制订阅链接
3. 等待跳转到订阅内容
4. 在对应的客户端中使用订阅链接

## 部署方式对比

### Workers 部署
- ✅ 支持动态请求处理
- ✅ 可以自定义订阅源
- ✅ 适合需要代理或处理请求的场景
- ❌ 有每日请求限制（免费版）

### Pages 部署
- ✅ 完全免费，无使用限制
- ✅ 自动构建和部署
- ✅ 支持自定义域名
- ❌ 仅支持静态内容

## 技术栈

- HTML/CSS/JavaScript
- Cloudflare Workers/Pages

## 致谢

- [XyHK-HUC/Colab](https://github.com/XyHK-HUC/Colab) - 原始项目
- Cloudflare - 部署平台

## 许可证

本项目遵循 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 免责声明

本项目仅供学习和技术交流使用，请遵守当地法律法规。