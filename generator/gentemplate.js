// Create a lib's output directory as web components' (webc) way that already exists.
const { warn } = require('console')
const fs = require('fs')
const path = require('path')
const loosewebcconfig = require('./loosewebc.json')

/**
 * maybe gentemplate named is not suitable,
 * use -like instead
 */
const genTemplateLike = () => {
    console.log(`genntemplate or struncture:\n`)
    // read loosewebc local config
    fs.readFile("./loosewebc.json", 'utf8', (err, data) => {
        if (err) {warn(`Cannot find project config 'looseweb.json', use plugin default instead.`);}

        const webcConfig = readWebcConfig(data)
        const webcOutputPath = path.resolve("./", webcConfig.config.outputpath, webcConfig.config.componentspath)

        // just create dir folders of relative components path
        makedir(webcOutputPath);
    })
}

/**
 * read the loosewebc.json, it maybe does not exist
 * and default one will repalce it.
 * @param {string object} data file data
 * @return {object}
 */
const readWebcConfig = (data) => {

    data = (data!= null && data != "{}" && Object.keys(data).length !=0)
     ? JSON.parse(data)
     : loosewebcconfig

    return data
}

/**
 * create folders and files as string path expect
 * @param {String} path current path
 */
const makedir = async (path) => {

    let pathStack = await pushItem(path)

    warnPushRes(pathStack)

    popItem(path, pathStack)
}

/**
 * warning info for pathStack
 */
const warnPushRes = (pathStack) => {
    console.dir(`-- pathStack to be created as below: --`)

    if(pathStack.length == 0) {
        warn(`Dir folders has existed, none will be created`)
    } else {
        console.log(pathStack)
    }

}

/**
 * push each item into pathStack until a existing path is found
 * @param {*} path current path
 * @param {*} pathStack all of not exist path are here
 * @return {Array} pathStack all of not exist path are here
 */
const pushItem = async (path, pathStack) => {
    // initial array, not exists path are collected for `pathStack`
    pathStack = pathStack || [];

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
    install: genTemplateLike
}