// Prompting user to select certain options.
// Prompts are required to handle user choices when creating a new project or adding a new plugin to the existing one
// - for example, you can ask user if they want to create the example component mentioned above.

module.exports = pkg => {
    const prompts = [{
            type: 'confirm',
            name: 'pluginStart',
            message: `This plugin will walk you through creating new output files which will format vue web components by umd with a loose way, while keeping the structure as your components folders exists.
Some options you must appoint, you may use commond below for help:
loosewebc --help
Is this Clear?`,
            validate: input => input ==='Clear'||input ==='clear'||input==='yes',
            default: false
        }
    ]

    return prompts
}