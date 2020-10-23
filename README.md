# vue-cli-plugin-loosewebc 

[![Windows Build status](https://ci.appveyor.com/api/projects/status/8cdonrkbg6m4k1tm/branch/master?svg=true)]()

> vue cli plugin for loose Vue3 Web Components (webc) library build,

**NOTE:** 

1. The master branch now hosts the code for v0.9.9-beta.1! Release tag is [v1.0.0]().

2. Maybe support 2.6.0+, if there's issues you've got, please let me know it.

Thanks^

- [loosewebc Documentation](https://github.com/Yujahua/vue-cli-plugin-loosewebc/docs/loosewebc.md)

## Install

Via `@vue/cli` to create a project, and then

runs

```
vue add loosewebc

loosewebc build
```

## What is?

`vue-cli-plugin-loosewebc` is a pulgin based [@vue-cli]() allows you to author Vue components in formate and output a wc lib called `Looser-Web-Coompoent(looserwc)`


Creating new files in the project with structure as same as your components library, output path may be `lib` or others as you config in `vue.config.js`.

## Why I use?

If you start a vue3 project with `@vue/cli`, it can help you build components looser structure to import as you wish.

## How to create vue3 project via cli command

Maybe, you'd like to run `@vue/cli` to create your vue3 project.
  
As of v4.5.0, use `@vue/cli` built-in option to choose Vue 3 preset when creating a vue 3 project, like this:
  ```sh
  vue create <your vue 3 project name>
  ``` 
Ps: 

If it doesn't work, you need to upgrade npm version, run `npm i -g npm`.Caused by cli command with older npm, it cannot understand the `@vue-cli` config:
  
  `{"vue-loader-v16": "npm:vue-loader@^16.0.0-beta.3}`,

and then the dependency `vue-loader-v16` cannot be created.


## Alternative Name is called `async`, like vue-cli-plugin-asyncwebc

