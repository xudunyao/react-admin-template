# React + Vite

This template provides a minimal setup to get React working in Vite with HMR, ESLint, and Stylelint.

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

## CSS 代码规范二（Stylelint + Prettier）

### 分工

| 工具 | 作用 |
|------|------|
| **Stylelint** | 检查 **CSS/SCSS 质量**：语法与可维护性、`stylelint-config-standard-scss` 的通用与 SCSS 规则、`stylelint-config-recess-order` 的**声明顺序**等；不负责替代 Prettier 做全文排版。 |
| **Prettier** | 统一 **样式文件格式**（与其它文件共用同一套 `.prettierrc.json`）：缩进、换行等。 |

两者配合：**Stylelint 管「写得是否合理、顺序是否一致」**，**Prettier 管「长什么样」**。自 Stylelint 15 起，核心已弱化大量纯格式类规则，与 Prettier 的冲突远少于早年；**不再使用**已停更且仅支持旧版 Stylelint 的 `stylelint-config-prettier`；若仍希望「格式问题在 Stylelint 里一并报错」，可另选社区方案 **`stylelint-prettier`**（可选，本模板未安装）。

### 已安装的包（`devDependencies`）

| 包 | 作用 |
|----|------|
| **stylelint** | Stylelint 核心。 |
| **stylelint-config-standard-scss** | 在 **`stylelint-config-standard`** 之上叠加 SCSS 约定（内部已依赖 `stylelint-config-standard`，无需再单独安装后者）。 |
| **stylelint-config-recess-order** | Recess/Bootstrap 风格的 **属性排序**（依赖 `stylelint-order`）。 |
| **stylelint-order** | 属性顺序等规则插件，供 `recess-order` 使用。 |
| **postcss**、**postcss-scss** | 供 Stylelint 正确解析 **`.scss`**（在配置里仅对 `*.scss` 启用 `customSyntax`）。 |
| **prettier** | 与其它语言共用，见上一节。 |

### 配置文件

| 文件 | 说明 |
|------|------|
| `stylelint.config.mjs` | `extends`：`stylelint-config-standard-scss`、`stylelint-config-recess-order`；`overrides` 中为 `**/*.scss` 指定 `postcss-scss` 解析。 |
| `.prettierrc.json`、`.prettierignore` | 与 JS 规范共用，格式化时一并覆盖样式文件。 |

### npm 脚本

| 命令 | 说明 |
|------|------|
| `npm run lint:css` | 检查 `src` 下 `.css` / `.scss`，**不修改文件**。 |
| `npm run lint:css:fix` | 同上，并对 Stylelint **可自动修复**的问题执行修复（含部分顺序类问题）。 |

建议：与 JS 类似，修复后可再跑 `format`；CI 中可与 `format:check`、`lint:js` 一起执行。

## Git 提交流程（Husky + lint-staged + Commitizen）

### 分工

| 工具 | 作用 |
|------|------|
| **Husky** | Git 钩子管理器：在 `pre-commit` 等节点自动执行脚本，保证不论命令行还是 IDE 提交都能触发检查。 |
| **lint-staged** | 只对 **已暂存文件** 运行检查/修复命令，提交前按规则执行 ESLint、Stylelint、Prettier。 |
| **Commitizen** | 提供 `cz` 交互式提交流程，避免手写 commit message。 |
| **cz-git** | Commitizen 的适配器，提供更友好的中文提示与提交类型选择。 |
| **cross-env** | 跨平台设置环境变量（Windows/macOS/Linux），用于在 `npm run commit` 场景下跳过重复 `pre-commit` 校验。 |

### 已安装的包（`devDependencies`）

| 包 | 作用 |
|----|------|
| **husky** | 安装并管理 Git hooks（如 `.husky/pre-commit`）。 |
| **lint-staged** | 针对 staged 文件执行 lint/format 任务。 |
| **commitizen** | 提供 `cz` 命令。 |
| **cz-git** | Commitizen 的交互式适配器。 |
| **cross-env** | 在脚本里稳定设置 `SKIP_LINT_STAGED=1`。 |

### 配置文件

| 文件 | 说明 |
|------|------|
| `lint-staged.config.mjs` | 定义 staged 文件处理顺序：`ESLint (*.js,*.jsx)` → `Stylelint (*.css,*.scss)` → `Prettier`。 |
| `.husky/pre-commit` | 兜底执行 `lint-staged --concurrent false`；若检测到 `SKIP_LINT_STAGED=1` 则跳过，避免 `npm run commit` 重复执行。 |
| `package.json` | `scripts.commit` 配置为先 `git add .`、再 `lint-staged`、最后进入 `cz`。 |

### npm 脚本与执行顺序

| 命令 | 说明 |
|------|------|
| `npm run commit` | 推荐提交流程：`git add .` → `lint-staged --concurrent false` → `cross-env SKIP_LINT_STAGED=1 cz`。 |

执行顺序如下：

1. `git add .`
2. 跑 `lint-staged --concurrent false`
   - `ESLint`（`*.{js,jsx}`）
   - `Stylelint`（`*.{css,scss}`）
   - `Prettier`（`*.{js,jsx,css,scss,json,md,cjs,mjs}`）
3. 通过后进入 `cz-git` 交互填写提交信息

这样可以先做代码校验，再填写 commit message，避免填完信息后才因为代码规范失败。

### 兜底机制（直接 `git commit` 也生效）

- 直接运行 `git commit` 时，`pre-commit` 仍会执行 `lint-staged`，不会绕过规范检查。
- 使用 `npm run commit` 时，前面已执行过一次 `lint-staged`，因此会通过环境变量跳过 hook 里的重复执行。

