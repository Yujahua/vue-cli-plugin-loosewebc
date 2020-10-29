# issue

Down  `stylus-loader` version `^4.1.1` to  `^3.0.2`, cause error: 
```log
Invalid options object. Stylus Loader has been initialized using an options object that does not match the API schema.
 - options has an unknown property 'preferPathResolver'. These properties are valid:
   object { stylusOptions?, sourceMap?, webpackImporter?, additionalData? }
```

now, my config is 
```json
{
      preferPathResolver: 'webpack'
    }
```
for `stylus-loader`
appoint special version for vue-cli 4.5
```sh
 npm i stylus-loader@^3.0.2
```