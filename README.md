# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

## JS 代码规范一（ESLint + Prettier）

### 分工

| 工具 | 作用 |
|------|------|
| **ESLint** | 检查**逻辑与质量**：语法问题、未使用变量、React Hooks 规则、`react-refresh` 与 Vite 热更新相关约束等。 |
| **Prettier** | 统一**代码格式**：缩进、换行、引号、分号等，不负责业务逻辑。 |

两者配合：**ESLint 管「写得对不对」**，**Prettier 管「长什么样」**。

### 已安装的包（`devDependencies`）

| 包 | 作用 |
|----|------|
| **eslint** | ESLint 核心，执行规则检查。 |
| **@eslint/js** | 官方推荐的基础规则集（`recommended`）。 |
| **eslint-plugin-react-hooks** | 校验 Hooks 用法（依赖数组、`useEffect` 等）。 |
| **eslint-plugin-react-refresh** | 与 Vite 的 Fast Refresh 配合，避免导出写法导致整页刷新等问题。 |
| **eslint-config-prettier** | **关闭**会与 Prettier 冲突的 ESLint 格式类规则，避免两套工具「抢格式」。需在 `eslint.config.js` 里**最后**引入。 |
| **globals** | 为 ESLint 提供浏览器等环境的全局变量声明（如 `window`）。 |
| **prettier** | 格式化工具，由独立命令或编辑器执行，不通过 ESLint 重复跑一遍格式（未使用 `eslint-plugin-prettier`）。 |

### 配置文件

| 文件 | 说明 |
|------|------|
| `eslint.config.js` | ESLint 9 扁平配置：规则集、`languageOptions`、最后接入 `eslint-config-prettier/flat`。 |
| `.prettierrc.json` | Prettier 格式选项（如是否分号、单引号、行宽等）。 |
| `.prettierignore`  | Prettier 忽略的路径（如 `dist`、`node_modules`）。 |

### npm 脚本

| 命令 | 说明 |
|------|------|
| `npm run lint:js` | 仅检查 `src` 下 `.js` / `.jsx`，**不修改文件**。 |
| `npm run lint:js:fix` | 同上，并对 ESLint **可自动修复**的问题执行修复。 |
| `npm run format` | 用 Prettier **格式化**当前项目匹配的文件（会写盘）。 |
| `npm run format:check` | 仅检查格式是否符合 Prettier，**不修改文件**（适合 CI）。 |

建议：开发时先 `lint:js:fix` 再 `format`；提交前可跑 `lint:js` 与 `format:check` 确保通过。

