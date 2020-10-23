// Service plugin serves for modifying webpack config
// Service plugins are loaded automatically when a Service instance is created

// A service plugin should export a function which receives two arguments:
// - A PluginAPI instance
// - An object containing project local options specified in vue.config.js, or in the "vue" field in package.json

module.exports = (api, options) => {

    api.chainWebpack(webpackConfig => {
        console.log(`service webpackConfig: `)
        console.log(webpackConfig)
    })

    //Modifying configration for webpack
    api.configureWebpack(config => {   // todo after vue.cofing settings
        if (process.env.NODE_ENV === 'production') {
          // build for production...
          console.dir(config);
        } else {
          // config set for development...
        }
    })

    // Adding a new cli-service command
    api.registerCommand(
        'loosewebc',
        {
            description: 'Build a looser vue3 web components(webc) library',
            usage: 'vue-cli-service loosewebc [options] [entry]',
            options: {
                '--help': 'Shows options for plugin arguments',
                '--target': 'Specifies a output path for loosewebc',
                '--origin': 'Origin webc source path to be import and prebuild'
            }
        },
        args => {
            // Use genterator to create files structure by list traversal of the components folder
            // to do

            console.dir(`args`)
            console.dir(args)

            // add args:
            // -- target [outputPathName]
            if(args.target) {
                console.log(`👋  ${args.target}`)
            }
            // -- origin [originPathName]
            if(args.origin) {
                console.log(`👋👋  ${args.origin}`)
            }else if(args["_"].length>0) {
                console.log(`👋👋  ${args["_"].slice(-1)[0]}`)
            }else if(args.help) {
                console.log(`This is a help`)
            }
        }
    )

}
// Specifying mode for commands
module.exports.defaultModes = {
    build: 'development'
}