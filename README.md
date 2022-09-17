# MyAppDocker

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

-   ngBootstrap
-   ngx-bootstrap: better, "https://valor-software.com/ngx-bootstrap/#/components"
    -   Now not dispo on Angular 14
-   fontAwesome
-   ngSelect

# Http

-   ok

# RxJS

-   wip

# Form

-   not yet

# Build

> ng build --configuration test
> in order to apply the env within the angular.json

# Run

> npm start

# sourceMap

> npm install source-map-explorer --save-dev
> ng build --source-map
> List the generated bundles in the dist/project-name/
> ls dist/project-name/_.js
> Run the explorer to generate a graphical representation of one of the bundles.
> node_modules/.bin/source-map-explorer dist/project-name/main_

# baseHref, deployUrl or APP_BASE_HREF

-   If you deploy your Angular app to a subfolder, the ‘--base-href’ is important to generate the correct routes

-   A second parameter that is important is ‘--deploy-url’. This parameter will update the generated url’s for our assets(scripts, css) inside the index.html

```
    ng build --prod --base-href /subfolder/ --deploy-url /subfolder/
```

# Prettier lint husky

> npm install prettier --save-dev
> add: .prettierrc

```
{
    "tabWidth": 4,
    "singleQuote": true,
    "printWidth": 120,
    "bracketSpacing": true,
}
```

add .prettierignore

```
 package.json
 package-lock.json
 yarn.lock
 dist
```

> npm install --save-dev tslint-config-prettier

.tslint.json:

```
  {
    "extends": [
       "tslint:recommended",
       "tslint-config-prettier"
    ]
 }
```

> npm install --save-dev pretty-quick

> Add "pretty-quick": "pretty-quick --staged" to the "scripts" section of package.json.

This will run prettier to format staged files and those files will be re-staged automatically after formatting

> npx husky-init && npm install

> npx husky add .husky/pre-commit "npm run pretty-quick"

The above command will create a .husky folder in the root. And further, it is going to run the mentioned hook ( we are using pre-commit).

```
 #!/usr/bin/env sh
 . "$(dirname -- "$0")/_/husky.sh"

 npm test
 npm run pretty-quick
```

> i commented out the npm test

---

package.json/script:
add an npm script that will run prettier with the --check flag
"prettier:check": "prettier --config .prettierrc --check \"src/\*_/_.{ts,css,scss,html}\""

Setting up git hooks in package.json:
add pre-commit hook:
"husky": {  
 "hooks": {  
 "pre-commit": "npm run prettier:check"  
 }  
 }
At this point we can try to commit the package json
git add .
git commit -m "add prettier and husky"
We may have an error related to the that:
the files in the src directory were not formatted

Running git hooks only on staged files using lint-staged:
"lint-staged": {
"src/\*_/_.{ts,css,scss,html}": [
"npm run prettier:check"
]
},
"husky": {
"hooks": {
"pre-commit": "lint-staged"  
 }
}

Running tests on pre-push git hook

"lint-staged": {
"src/\*_/_.{ts,css,scss,html}": [
"npm run prettier:check"
]
},
"husky": {
"hooks": {
"pre-commit": "lint-staged",
"pre-push": "npm run test"  
 }
},
