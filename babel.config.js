module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          reactCompiler: {
            sources: filename => {
              // Match file names to include in the React Compiler.
              return filename.includes('src/path/to/dir');
            },
          },
        },
      ],
    ],
    plugins: [],
  };
};
