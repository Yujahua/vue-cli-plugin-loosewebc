// Prompting user to select certain options.
// Prompts are required to handle user choices when creating a new project or adding a new plugin to the existing one
// - for example, you can ask user if they want to create the example component mentioned above.

module.exports = pkg => {
    const prompts = [{
            type: 'confirm',
            name: 'confirmStart',
            message: `This utility will walk you through creating new output files with a loose way, the path that you must appoint. After runs, it will format
            vue web components by umd rules, while keeping the structure as your components folders exists.\n
            Is this Clear? (yes) Clear`,
            default: false
        }
    ]

    return prompts
}