# 万物CP - AI CP故事生成器

![万物CP](./public/preview.png)

一个基于 AI 的 CP 故事生成器，可以为任意两个角色生成浪漫故事和相关图片。

## ✨ 特性

- 🤖 基于 GPT-4 的故事生成
- 🎨 使用 DALL-E 3 或硅基流动生成角色头像和CP合照
- 🌓 支持深色模式
- 💫 流畅的动画效果
- 📱 响应式设计
- ⚙️ 可自定义 API 设置

## 🚀 在线体验

## 🚀 Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fcp-story-generator)

1. 点击 "Deploy" 按钮开始部署
2. 在项目设置中配置以下环境变量：

### 必需的环境变量
- `VITE_OPENAI_API_KEY`: OpenAI API密钥
- `VITE_OPENAI_MODEL`: 文本生成模型（默认：gpt-4o-mini）
- `VITE_OPENAI_IMAGE_MODEL`: 图像生成模型（默认：dall-e-3）
- `VITE_API_BASE_URL`: API基础URL（默认：/api）

### 可选的环境变量
- `VITE_SILICON_FLOW_KEY`: 硅基流动API密钥
- `VITE_USE_SILICON_FLOW`: 是否使用硅基流动（true/false）
- `VITE_SITE_PASSWORD`: 站点访问密码

## 🛠️ 技术栈

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- OpenAI API
- 硅基流动 API (可选)

## 📦 安装

1. 克隆项目

2. 输入两个角色的信息
3. 点击"开始创作"生成故事和图片
4. 可以点击"开磕"查看 CP 合照
5. 使用"重新生成"获取新的故事或图片

## 🤝 贡献

项目基于bolt和cursor开发，但仍然欢迎提交 Issue 和 Pull Request！我会尽可能优化和维护。

## 🙏 大模型调用

- [OpenAI](https://openai.com/)
- [硅基流动](https://siliconflow.cn/)