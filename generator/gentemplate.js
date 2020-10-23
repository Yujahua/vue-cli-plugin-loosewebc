// Create a lib's output directory as web components' (webc) way that already exists.
const { warn } = require('console')
const fs = require('fs')
const path = require('path')
const loosewebcconfig = require('./loosewebc.json')

const gentemplate = () => {
    // todo
    console.log(`genntemplate or struncture`)
    
    // read loosewebc local config
    fs.readFile("./loosewebc.json", 'utf8', (err, data) => {
        if (err) warn(`Cannot find config 'looseweb.json', use default instead.`);

        const loosewebcConfig = readLoosewebcConfig(data)

        const componentsOutputPath = path.resolve("./", loosewebcConfig.config.outputpath, loosewebcConfig.config.componentspath)

        // just write dir components folder
        mkComponentsDir(componentsOutputPath);
    })
}

/**
 * Read the loosewebc.json, maybe does not exist, default will be repalced.
 * @param {string object} data file data
 */
const readLoosewebcConfig = (data) => {

    data = (data!= null && data != "{}" && Object.keys(data).length !=0)
     ? JSON.parse(data)
     : loosewebcconfig

    return data
}

const mkComponentsDir = async (path, rootPath) => {

    // config path test is ok
    const exist = await exists(path);

    if(!exist){
        // set rootPath for the first time
        // eg: "/Users/yujiahua/GitHub/GitLab/loosewebc-test/lib/components"
        rootPath = rootPath || path
    }
    // if does not exist, then make it
    fs.mkdir(path, (err)=> {
        if(err) {
            warn(`Cannot make path ${path}, err: ${err}`)

            // mkdir err, back to dir's path of last level
            path = path.replace(/(.*)\/[a-z0-9_]+/,'$1') // eg: "/Users/yujiahua/GitHub/GitLab/loosewebc-test/lib
            mkComponentsDir(path, rootPath)
            return
        }

        console.dir(`Create folder ${path} success`)
        path = path + rootPath.replace(rootPath,path).replace(/(\/[a-z0-9_])+\/.*/,'$1')
        mkComponentsDir(path, rootPath)
    });
}

const exists =  (path) => {
       return new Promise((resolve, reject) => 
        fs.stat(path, (err,stats) => {
            if(err) {
                warn(`Cannot find path ${path}, mkdirs`)
                return resolve(false)
            }
            if(stats.isDirectory()) {
                return resolve(true)
            }

            return resolve(false)
        }))
}

module.exports = {
    install: gentemplate
}