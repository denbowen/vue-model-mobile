module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'update',
        'fix',
        'format',
        'style',
        'refactor',
        'test',
        'chore',
        'revert',
        'merge',
        'docs',
      ],
    ],
    'subject-case': [0],
  },
};
