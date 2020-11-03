// Service plugin serves for modifying webpack config
// Service plugins are loaded automatically when a Service instance is created

const { resolve } = require('path')

// A service plugin should export a function which receives two arguments:
// - A PluginAPI instance
// - An object containing project local options specified in vue.config.js, or in the "vue" field in package.json

module.exports = (api, options) => {
    
    api.chainWebpack(webpackConfig => {

        if(options.outputDir === "lib"){
        // log here
        // it shows execute three times, for each library (commonjs,umd,umd-min) for 3
        console.log(`webpck config plugin >>`)
        const path = require('path')
        webpackConfig
              .plugin('copy')
                .use(require('copy-webpack-plugin'), [[{
                  from: path.resolve("src/components"),
                  to: path.resolve("lib/components"),
                  toType: 'dir'
                }]])
        }
    })

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
        async args => {
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
            // test for untils/writefile.js
            // const wf = require('vue-cli-plugin-loosewebc/utils/writefile')
            
            const config = await require('./generator/gentemplate').install(api)
            const modulesArray = config;
            // wf.towrite(config)

            for( modul in modulesArray){
                const name = modul
                const options = {
                    entry: modulesArray[modul],
                    target: 'lib',
                    name: `${name[0].toUpperCase}${name.slice(1)}`,
                    dest: `lib/lib/${name}`
                }

                // except _[name], cause it is inner fns, not export web components
                if(modul[0]==="_"){
                    continue
                }

                console.log(`\ncompile..\nname: ${name}\nresource: ${modulesArray[modul]}`)
                await loadVueCli(options)
            }
            
        }
    )

}
/**
 * define config for vue-cli
 * and load local-vue-config call cli Service
 * @param options?
 */
const loadVueCli = (options) => {
    return new Promise((resolve,reject) => {
    const Service = require('@vue/cli-service/lib/Service.js')
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
        "entry": options.entry,    // "entry":path.resolve("src/components/index.js"),
        "target": options.target,    // "lib"
        "formats": "umd-min",      // commonjs | umd | umd-min
        "name": options.name,
        "filename": 'index',
        "dest": options.dest
      })

    service.run('build', args, []).catch(err => {
        if(err) throw(err)
        process.exit(1)
      })
      resolve()

    })

}
// Specifying mode for commands
module.exports.defaultModes = {
    loosewebc: 'production'
}