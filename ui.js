// Vue UI
module.exports = api => {
    api.describeConfig({
        id: 'org.yujahua.vue-loosewebc.config',
        name: 'build configurationn',
        description: 'This config defines extra options of loosewebc build',
        link: 'https://github.com/Yujahua/vue-cli-plugin-loosewebc#readme',
        files: {
            loosewebc: {
                json: ['loosewebc.json']
            }
        },
        // to show config via ui
        onRead: ({data}) => ({
            prompts: [
                {
                    name: 'entrypath',
                    type: 'input',
                    message: 'Appoint the entry path for web components build',
                    value: data.loosewebc && data.loosewebc.entrypath,
                    default: './components',
                },
                {
                    name: 'outputpath',
                    type: 'input',
                    message: 'Define the root output path for build',
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
            api.setData('loosewebc',{config: res})
        }
    })
}