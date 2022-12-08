const { typedConfiguration } = require('@stylable/cli');

module.exports.stcConfig = typedConfiguration({
  projects: {
    '.': [
      {
        srcDir: 'src',
        outDir: 'dist',
        bundle: 'cl.css',
        esm: true,
        esmExt: '.js',
        includeCSSInJS: true,
        inlineRuntime: true,
        minify: true,
        useNamespaceReference: true,
        outputSources: true,
        dts: true,
        dtsSourceMap: true,
      },
      {
        srcDir: 'src',
        outDir: 'st-types',
        dts: true,
        dtsSourceMap: true,
      },
    ],
  },
  projectsOptions: {
    resolveRequests(projects) {
      return projects.map(({ options }) => {
        return {
          projectRoot: __dirname,
          options,
        };
      });
    },
  },
});
