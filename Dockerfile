# 声明全局参数
ARG version='lts'

# === 第一阶段：构建并打包 ===
FROM node:${version} AS builder
WORKDIR /app

# 1. 复制所有源码
COPY . .

# 2. 独立执行安装
RUN npm install -g pnpm \
    && pnpm install \
    && pnpm run build

# === 第二阶段：导出阶段 ===
FROM scratch AS exporter
COPY --from=builder /app/dist /dist/
