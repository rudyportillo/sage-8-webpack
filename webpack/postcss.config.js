module.exports = {
  parser: "postcss-safe-parser",
  plugins: {
    "postcss-import": {},
    "postcss-cssnext": { warnForDuplicates: false },
    cssnano: {}
  }
};
