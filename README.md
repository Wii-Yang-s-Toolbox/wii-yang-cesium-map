# Wii Yang Cesium Map

基于 Vue 3 + Vite 8 + Cesium.js 的 3D 地图应用，使用天地图作为默认底图。

## 技术栈

- **构建工具**: Vite 8
- **前端框架**: Vue 3 + TypeScript
- **地图引擎**: Cesium.js 1.142
- **UI 组件库**: Ant Design Vue 4（自动按需导入）
- **路由**: Vue Router 5（Hash 模式）
- **代码规范**: ESLint + Prettier
- **样式**: Less

## 快速开始

```bash
# 安装依赖
pnpm install

# 配置天地图 Token（从 https://www.tianditu.gov.cn 注册获取）
# 编辑 .env 文件，设置你的 Token：
#   VITE_TDT_TOKEN=your_token_here

# 启动开发服务
pnpm dev
```

访问 `http://localhost:5000`

## 可用命令

| 命令                   | 说明 |
|----------------------|------|
| `pnpm run dev`       | 启动开发服务器（端口 5000） |
| `pnpm run build`     | 类型检查 + 生产构建 |
| `pnpm run preview`   | 预览生产构建 |
| `pnpm run lint`      | ESLint 检查 |
| `pnpm run format`    | Prettier 格式化 |
| `pnpm run typecheck` | TypeScript 类型检查 |

## 项目结构

```
src/
├── components/        # 通用组件
│   └── CesiumMap.vue  # Cesium 地图组件
├── layouts/           # 布局组件
│   └── DefaultLayout.vue
├── views/             # 页面视图
│   └── Home/
├── router/            # 路由配置
├── App.vue
├── main.ts
└── style.css

types/                 # TypeScript 类型声明
.env                   # 环境变量（不提交）
Dockerfile             # Docker 构建
```

## 功能特性

- **天地图底图**: 使用天地图 WMTS 服务作为默认影像底图 + 中文标注
- **代理转发**: 开发环境通过 `/tdt` 代理天地图请求，解决跨域
- **隐藏默认 UI**: 禁用 Cesium 所有默认控件及底部版权信息
- **路由布局**: Layout 加载地图，路由页面浮于地图之上
- **自动导入**: Ant Design Vue 组件自动按需导入

## Docker 构建

```bash
docker build --build-arg version=24.16.0 --output type=local,dest=. .
```

导出产物在 `./dist/` 目录。

## 生产部署

将 `dist/` 目录部署到 Web 服务器（如 Nginx），参考 `nginx.conf` 配置。

## 环境变量

| 变量 | 说明 | 必填 |
|------|------|------|
| `VITE_TDT_TOKEN` | 天地图开发者 Token | 是 |
