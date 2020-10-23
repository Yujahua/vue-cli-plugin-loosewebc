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
          console.dir(`production`)
          console.dir(config);
        } else {
          // config set for development...
          console.dir(`development`)
          console.dir(config);
        }
    })
    console.dir(api)

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
                console.log(`[target]👋👋👋   ${args.target}`)
            }
            // -- origin [originPathName]
            if(args.origin) {
                console.log(`[origin]👋👋👋  ${args.origin}`)
            }else if(args.help) {
                // to do help things
                // show things
                // like;
                // Usage: npm <command>

                // where <command> is one of:
                //     access, adduser, audit, bin, bugs, c, cache, ci, cit,
                //     clean-install, clean-install-test, completion, config,
                //     create, ddp, dedupe, deprecate, dist-tag, docs, doctor,
                //     edit, explore, fund, get, help, help-search, hook, i, init,
                //     install, install-ci-test, install-test, it, link, list, ln,
                //     login, logout, ls, org, outdated, owner, pack, ping, prefix,
                //     profile, prune, publish, rb, rebuild, repo, restart, root,
                //     run, run-script, s, se, search, set, shrinkwrap, star,
                //     stars, start, stop, t, team, test, token, tst, un,
                //     uninstall, unpublish, unstar, up, update, v, version, view,
                //     whoami

                // npm <command> -h  quick help on <command>
                // npm -l            display full usage info
                // npm help <term>   search for help on <term>
                // npm help npm      involved overview
                console.log(`[command] loosewebc --help`)
            }
        }
    )

}
// Specifying mode for commands
module.exports.defaultModes = {
    build: 'development'
}