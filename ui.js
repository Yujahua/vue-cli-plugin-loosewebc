// Vue UI
module.exports = api => {
    api.describeConfig({
        id: 'org.yujahua.vue-build-loosewebc.config',
        name: 'build configurationn',
        description: 'This config defines extra options of loosewebc build',
        link: 'https://github.com/Yujahua/vue-cli-plugin-build-loosewebc#readme',
        files: {
            loosewebc: {
                json: ['loosewebc.json']
            }
        },
        // to show config via ui
        onRead: ({data}) => ({
            prompts: [
                {
                    name: 'outputpath',
                    type: 'input',
                    message: 'Define the output path for the new build web components',
                    value: data.loosewebc && data.loosewebc.outputpath,
                    default: './lib',
                }
            ]
        }),
        // set ui config , and write into the local file
        async onWrite({api, prompts}) {
            const res = {}
            for(const prompt of prompts) {
                res[`${prompt.id}`] = await api.getAnswer(prompt.id)
            }
            api.setData('loosewebc',res)
        }
    })
}