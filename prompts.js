// Prompting user to select certain options.
// Prompts are required to handle user choices when creating a new project or adding a new plugin to the existing one
// - for example, you can ask user if they want to create the example component mentioned above.

module.exports = pkg => {
    const prompts = [{
            type: 'confirm',
            name: 'confirmStart',
            message: `This plugin will walk you through creating new output files which will format vue web components by umd with a loose way,
            keep the structure as your components folders exists. And some options you must appoint, you can use commond below for help:\n
            npm run loosewebc --help\n
            Is this Clear? (yes) Clear`,
            default: false
        }
    ]

    return prompts
}