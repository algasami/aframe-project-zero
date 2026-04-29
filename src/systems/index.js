const modules = import.meta.webpackContext("./", {
  recursive: true,
  regExp: /(?<!index)\.js$/,
});

modules.keys().forEach(modules);
