// A Generator part of the CLI plugin is usually needed when you want to extend your package
// with new dependencies, create new files in your project or edit existing ones.

// When the plugin is installed after project's creation and invoked individually via vue add or vue invoke

// A generator should export a function which receives three arguments:
// - A GeneratorAPI instance
// - The generator options for this plugin
// - The entire preset will be passed as the third argument

module.exports = api => {
    // Gen template and files structrue
    const gentemplate = require('./gentemplate')

    gentemplate.install();

    // Extending package, create a new npm script or modify `package.json`
    api.extendPackage({
        dependencies: {},
        scripts: {
            loosewebc: 'ue-cli-service loosewebc --target lib ./src/components/index.js'
        }
    })

}