module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  plugins:["react-hooks"],
  rules:{
    "react-hooks/rules-of-hooks":'error',
    "react-hooks/exhaustive-deps":'warn',
    "no-unused-vars":'off',
    "@typescript-eslint/no-unused-vars":'off',
  }
};
