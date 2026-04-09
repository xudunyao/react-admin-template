// @see https://cz-git.qbb.sh/guide/

/** 与 commitlint `type-enum`、cz-git 选项保持一致 */
const TYPES = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
  'wip',
  'workflow',
  'types',
  'release',
]

/** @type {import('cz-git').UserConfig} */
export default {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [2, 'always', TYPES],
  },
  prompt: {
    /** 不询问 scope / issue 前缀与 footer（提交信息为 `type: subject`） */
    skipQuestions: ['scope', 'footerPrefix', 'footer'],
    messages: {
      type: '选择类型:',
      subject: '简短描述:\n',
      body: '详细说明（可选，| 换行）:\n',
      breaking: '破坏性变更（可选）:\n',
      confirmCommit: '确认提交?',
    },
    types: [
      { value: 'feat', name: '🚀 feat · 新功能', emoji: '🚀' },
      { value: 'fix', name: '🧩 fix · 修复', emoji: '🧩' },
      { value: 'docs', name: '📚 docs · 文档', emoji: '📚' },
      { value: 'style', name: '🎨 style · 格式', emoji: '🎨' },
      { value: 'refactor', name: '♻️ refactor · 重构', emoji: '♻️' },
      { value: 'perf', name: '⚡ perf · 性能', emoji: '⚡' },
      { value: 'test', name: '✅ test · 测试', emoji: '✅' },
      { value: 'build', name: '📦 build · 构建', emoji: '📦' },
      { value: 'ci', name: '🎡 ci · CI', emoji: '🎡' },
      { value: 'chore', name: '🔧 chore · 杂项', emoji: '🔧' },
      { value: 'revert', name: '⏪ revert · 回滚', emoji: '⏪' },
      { value: 'wip', name: '🕔 wip · 进行中', emoji: '🕔' },
      { value: 'workflow', name: '📋 workflow · 工作流', emoji: '📋' },
      { value: 'types', name: '🔰 types · 类型', emoji: '🔰' },
      { value: 'release', name: '🏷 release · 发布', emoji: '🏷' },
    ],
    useEmoji: true,
    allowBreakingChanges: ['feat', 'fix'],
  },
}
