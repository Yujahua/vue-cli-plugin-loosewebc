const fs = require('fs')
const config = require('./config.json')
const path = require('path')
const {warn} = require('console')

/**
 * Write `fd` into a file as the appoint in `config.json`
 * @param {string} fd 
 */
const towrite = async (fd) => {
    const conf = readConfig();
    const writePath = path.resolve(__dirname, conf.path)
    console.log(`towrite log here`)

    await makeDir(writePath)

    // timestamp now only be supported
    if(conf.fileStyle === "timestamp") {
        let localpath = `${writePath}/${new Date().getTime()}.js`

        if(typeof fd === "object"){
            fd = JSON.stringify(fd)
        }

        writeFile(localpath, fd)
    } else {
        warn(`Cannot recognize the type '${conf.fileStyle}', check your config.json file for the type 'timestamp'`)
    }
    

}

/**
 * read the config.json, it maybe does not exist
 * and default one will repalce it.
 * @param {string object} data file data
 * @return {object}
 */
const readConfig = (data) => {

    data = (data!= null && data != "{}" && Object.keys(data).length !=0)
     ? JSON.parse(data)
     : config

    return data
}

/**
 * Write into file as config.json define for type
 * @param {string} path 
 * @param {string} fd 
 */
const writeFile = (path, fd) => {

    fs.writeFile(path, fd, (err) => {
        if(err) throw(`Write into file but an err occur: ${err}`)
        console.log(`Write into file '${path}' success!`)
    })
}

/**
 * create folders and files as string path expect
 * @param {String} path current path
 */
const makeDir = async(path) => {

    let pathStack = await pushItem(path)

    warnPushRes(pathStack)

    popItem(path, pathStack)
}

/**
 * warning info for pathStack
 */
const warnPushRes = (pathStack) => {
    console.dir(`-- pathStack to be created as below: --`)

    if(pathStack.length == 0) {warn(`Target dir has existed, none will be created`)} 
    else {console.log(pathStack)}

}

/**
 * push each item into pathStack until a existing path is found
 * @param {*} path current path
 * @param {*} pathStack all of not exist path are here
 * @return {Array} pathStack all of not exist path are here
 */
const pushItem = async (path, pathStack) => {
    // initial array, not exists path are collected for `pathStack`
    pathStack = pathStack || []

    const exists = await pathExists(path)
    if(!exists){
        // at the stack bottom is complete rootpath,
        // eg: "/Users/yujiahua/GitHub/GitLab/loosewebc-test/lib/components"
        pathStack.push(path)

        // mkdir err, back to dir's path of last level
        // eg: "/Users/yujiahua/GitHub/GitLab/loosewebc-test/lib
        path = path.replace(/(.*)\/[a-z0-9_]+/,'$1')
        await pushItem(path, pathStack)

    }
    return pathStack
}

/**
 * pop each item from pathStack until clear
 * @param {String} path current path
 * @param {Array} pathStack all of not exist path are here
 */
const popItem = async (path, pathStack) => {
    if(pathStack.length == 0){
        // when stack is clear means push action done, break the loop
        return
    }

    // replace `path` with last path as a new one
    // the last path folder will be created
    path = pathStack.pop()

    fs.mkdir(path, (err) => {
         if(err) {
            warn(`Cannot make path ${path}, err: ${err}`)
            return
         }
         popItem(path, pathStack)
     })
}

/**
 * path is exists or not
 * @param {String} path 
 */
const pathExists =  (path) => {
       return new Promise((resolve, reject) => 
        fs.stat(path, (err,stats) => {
            if(err) {
                warn(`Cannot find path ${path} to make dirs`)
                return resolve(false)
            }
            if(stats.isDirectory()) {
                return resolve(true)
            }

            return resolve(false)
        }))
}

module.exports = {
    towrite,
    readConfig,
    makeDir
}