module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'commitmsg': 'commitlint -e $GIT_PARAMS',
  },
};
