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
-   fontAwesome
-   ngSelect
-   Bootstrap-icons
-   ngx-bootstrap-icons: npm i ngx-bootstrap-icons --save

# Http

-   ok

# RxJS

-   ok

# Form

> see [link](https://www.tektutorialshub.com/angular/formcontrol-in-angular/)

```
let address= new FormGroup({
    street : new FormControl(""),
    city : new FormControl(""),
    pinCode : new FormControl("")
})
--
address.value => {street :"", city:"",  Pincode:""}
address.get("street")
--
address.errors     // returns the list of errors
address.dirty /pristine     // true if the value of one of the child control has changed (dirty)
address.touched/untouched   // true if one of the child control is touched : onblur
address.valid /invalid     // true if all the child controls passed the validation
status:
  VALID: The FormControl has passed all validation checks.
  INVALID: This control has failed at least one validation check.
  PENDING: This control is in the midst of conducting a validation check.
  DISABLED: This control is exempt from validation checks
enabled/disabled // control enabled or disabled. if disabled this control is exempt from validation checks
pending



```

> SetValue & PatchValue
> statuschanges and valueChanges: emitEvent, onlySelf

```

    this.reactiveForm.get("firstname").statusChanges.subscribe(newStatus=> {
      console.log('firstname status changed')
      console.log(newStatus)
      console.log(this.reactiveForm.get("firstname").status)
      console.log(this.reactiveForm.status)

      setTimeout(() => {
        console.log(this.reactiveForm.status)
      })

    })
    ##########
    this.reactiveForm.get("firstname").valueChanges.subscribe(selectedValue => {
    console.log('firstname value changed')
    console.log(selectedValue)
    console.log(this.reactiveForm.get("firstname").value)
    console.log(this.reactiveForm.value)   //still shows the old first name
    })
    ...
    // we dont want to emit the statusChange when setting the firstName value
    this.reactiveForm.get("firstname").setValue("", { emitEvent: false });
```

> set[Async]Validators / clear[Async]Validators / updateValueAndValidity

> errors / setError / getError / hasError

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
