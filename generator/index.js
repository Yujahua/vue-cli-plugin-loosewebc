// A Generator part of the CLI plugin is usually needed when you want to extend your package
// with new dependencies, create new files in your project or edit existing ones.

// When the plugin is installed after project's creation and invoked individually via vue add or vue invoke

// A generator should export a function which receives three arguments:
// - A GeneratorAPI instance
// - The generator options for this plugin
// - The entire preset will be passed as the third argument

module.exports = async (api) => {
    // Gen template and files structrue,
    // for example, build targt output, copy components folder as they are before
    // use webpack copy plugin to take place gentemplate or structure
    // require('./gentemplate').install(api);

    // Extending package, create a new npm script or modify `package.json`

    // should named a variable to save `./components/index.js` entry path
    api.extendPackage({
        scripts: {
            "build:csii-vx-mobile": "vue-cli-service build --target lib --name csii-vx-mobile ./components/index.js",
            "build:csii/vx-mobile-wc": "vue-cli-service build --target wc --name csii-vx-mobile ./components/index.js",
            "loosewebc": 'vue-cli-service loosewebc --target lib --origin ./components/index.js',
        },
        devDependencies: {
            "glob": "^7.1.6",
            "copy-webpack-plugin": "^5.1.1",
            "webpack": "^4.0.0"
        }
    })

}