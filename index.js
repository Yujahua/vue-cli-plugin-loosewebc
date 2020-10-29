// Service plugin serves for modifying webpack config
// Service plugins are loaded automatically when a Service instance is created

// A service plugin should export a function which receives two arguments:
// - A PluginAPI instance
// - An object containing project local options specified in vue.config.js, or in the "vue" field in package.json

module.exports = (api, options) => {
    // Adding a new cli-service command
    api.registerCommand(
        'loosewebc',
        {
            description: 'Build a looser vue3 web components(webc) library',
            usage: 'vue-cli-service loosewebc [options]',
            options: {
                '--help': 'Shows options for plugin arguments',
                '--target': 'Specifies a output path for loosewebc',
                '--origin': 'Origin webc source path to be import and prebuild'
            }
        },
        args => {
            // Use genterator to create files structure by list traversal of the components folder

            // add args:
            // -- target [outputPathName]
            if(args.target) {
                console.log(`[target]👋👋👋   ${args.target}`)
            }
            // -- origin [originPathName]
            if(args.origin) {
                console.log(`[origin]👋👋👋  ${args.origin}`)
            }else if(args.help) {
                // to do help things
                // show things like;
                // Usage: loosewebc <command>

                // where <command> is one of:
                //     --target, --origin, v, version,
                //     whoami

                // loosewebc <command> -h  quick help on <command>
                // loosewebc -l            display full usage info
                // loosewebc help <term>   search for help on <term>
                console.log(`[command]👋👋👋   loosewebc --help`)
            }

            loadVueCli(options)
        }
    )

}
/**
 * // define config for vue-cli
    // local-vue-config
 */
const loadVueCli = () => {
    const path = require('path')
    const localVueConfigOptions = {
        outputDir: './lib/components'
    }
    const localCommand = {
        scripts: {
            "build:@csii/vx-mobile": "vue-cli-service build --target lib --name csii-vx-mobile ./src/components/index.js",
            "build:@csii/vx-mobile-wc": "vue-cli-service build --target wc --name ~ ./src/components/index.js"
        }
    }

    // Local plugins

    // test for untils/writefile.js
    // const wf = require('vue-cli-plugin-loosewebc/utils/writefile')
    // wf.towrite

    const Service = require('../@vue/cli-service/lib/Service')
    service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())

    const args = require('minimist')([],{
        boolean: [
          // build
          'modern',
          'report',
          'report-json',
          'inline-vue',
          'watch',
          // serve
          'open',
          'copy',
          'https',
          // inspect
          'verbose'
        ]
      })

      Object.assign(args,{
        "entry":path.resolve("src/components/index.js"),
        "target":"lib",
        "formats":"umd", // commonjs | umd | umd-min
        "name": "Icon",
        "filename": "Icon",
        "dest": "lib/components"
      })

      console.log(path.resolve("src/components/index.js"))
    service.run('build', args, []).catch(err => {
        error(err)
        process.exit(1)
      })

}
// Specifying mode for commands
module.exports.defaultModes = {
    loosewebc: 'production'
}