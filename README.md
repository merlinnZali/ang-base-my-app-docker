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
-   ngx-bootstrap: better, "https://valor-software.com/ngx-bootstrap/#/documentation#getting-started"
    -   Now not dispo on Angular 14
-   fontAwesome
-   ngSelect

# Http

-   ok

# RxJS

-   ok

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

Prettier takes care of the formatting whereas tslint takes care of all the other things.

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

> into .husky/pre-commit

```
 #!/usr/bin/env sh
 . "$(dirname -- "$0")/_/husky.sh"

 #npm test
 npm run pretty-quick
 npm run lint
```

> i commented out the npm test

> npx husky add .husky/pre-push "npm run test"
> into .husky/pre-push

```
 #!/usr/bin/env sh
 . "$(dirname -- "$0")/_/husky.sh"

 #npm test
```

> i commented out the npm test

```
git add .
git commit -m "..."
```

# IF we want to use linting

> npm install --save-dev tslint

> Add "lint": "tslint 'src/\*_/_.ts'" to the "scripts" section of package.json.

> npx husky add .husky/pre-commit "npm run lint"
> into .husky/pre-commit

```
 #!/usr/bin/env sh
 . "$(dirname -- "$0")/_/husky.sh"

 #npm test
 npm run pretty-quick
 npm run lint
```

```
git add .
git commit -m "..."
```

# Linting more (did not worked)

> npm install --save-dev lint-staged

```
"lint-staged": {
    "*.ts": "tslint *p ./tsconfig.json"
}
ou
"lint-staged": {
    "*.ts": "tslint"
}
```

```
 #!/usr/bin/env sh
 . "$(dirname -- "$0")/_/husky.sh"

 #npm test
 npm run pretty-quick
 # no stash and quiet mode
 npx lint-staged --no-stash -q
```

# ngRX Store

...

# Angular Table

...

# primeNG

...

# graph

...

# map
