/**
 * 提交前顺序：ESLint（JS/React）→ Stylelint（CSS/SCSS）→ Prettier（格式化）
 * 需与 `npx lint-staged --concurrent false` 配合，保证阶段按顺序执行。
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,jsx}': 'eslint --fix',
  '*.{css,scss}': 'stylelint --fix',
  '*.{js,jsx,css,scss,json,md,cjs,mjs}': 'prettier --write',
}
