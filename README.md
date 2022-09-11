# MyAppDocker
lklklkl
> AppComponent.ts
```
change the theme value in order to see the theme changing
```

# SAAS
https://sass-lang.com/documentation/at-rules/mixin

# Font
see assets/fonts and styles.scss

# translate
> npm i @ngx-translate/core
> npm i @ngx-translate/http-loader

The plural
> npm install ngx-translate-messageformat-compiler messageformat

Custom loader for using also backend data for translation

# Bootstrap
- ngBootstrap
- ngx-bootstrap: better, "https://valor-software.com/ngx-bootstrap/#/components"
   - Now not dispo on Angular 14
- fontAwesome
- ngSelect

# Http
- ok

# RxJS
- wip

# Form
- not yet

# Build
> ng build --configuration test
in order to apply the env within the angular.json

# Run
> npm start

# sourceMap
> npm install source-map-explorer --save-dev
> ng build --source-map
List the generated bundles in the dist/project-name/
> ls dist/project-name/*.js
Run the explorer to generate a graphical representation of one of the bundles.
> node_modules/.bin/source-map-explorer dist/project-name/main*

# baseHref, deployUrl or APP_BASE_HREF

- If you deploy your Angular app to a subfolder, the ‘--base-href’ is important to generate the correct routes

- A second parameter that is important is ‘--deploy-url’. This parameter will update the generated url’s for our assets(scripts, css) inside the index.html

```
    ng build --prod --base-href /subfolder/ --deploy-url /subfolder/
```
