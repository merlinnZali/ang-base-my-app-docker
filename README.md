[tektutorialshub.com/angular-tutorial/](https://www.tektutorialshub.com/angular-tutorial/)

Interpolation
Property Binding
Event Binding
Two-way Binding/Model Binding

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

# Http - Interceptors

-   ok

# Directives

-   Structure:

    -   ngFor
    -   ngSwitch
    -   ngIf

-   Attribute:

    -   ngClass
    -   ngStyle
    -   ngModel

-   Custom directive

```
import { Directive, ElementRef, Input, OnInit } from '@angular/core'

@Directive({
  selector: '[ttClass]',
})
export class ttClassDirective implements OnInit {

  @Input() ttClass: string;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.el.nativeElement.classList.add(this.ttClass);
  }

}

app.component.css :
.blue {
  background-color: lightblue;
}

Finally:
<button [ttClass]="'blue'">Click Me</button>

```

```
import { Directive, ElementRef, Renderer2, Input, HostListener, HostBinding } from '@angular/core'

@Directive({
  selector: '[ttToggle]',
})
export class ttToggleDirective {

  private elementSelected = false;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
  }

  @HostListener('click')
  private onClick() {
    this.elementSelected = !this.elementSelected;
    if (this.elementSelected) {
      this.el.nativeElement.classList.add('toggle')
    } else {
      this.el.nativeElement.classList.remove('toggle')
    }
  }

}
```

# pipes

-   [pipe-link](https://angular.io/api?query=pipe)

> custom:

```
import {Pipe, PipeTransform} from '@angular/core';

@pipe({
    name: 'tempConverter'
})
export class TempConverterPipe implements PipeTransform {
    transform(value: number, unit: string) {
        if(value && !isNaN(value)) {
            if (unit === 'C') {
                var temperature = (value - 32) /1.8 ;
                return temperature.toFixed(2);
            } else if (unit === 'F'){
                var temperature = (value * 1.8 ) + 32
                return temperature.toFixed(2);
            }
        }
        return;
    }
}
```

> use it: Fahrenheit : {{celcius | tempConverter:'F'}}

> use it into component:

```
  constructor(private tempConverterPipe:TempConverterPipe) {
  }
this.result = this.tempConverterPipe.transform(value, unit);
```

> Async Pipe

> KeyValue Pipe + comparator

```
obj = [
    { key:a, value:789 },
    { key:b, value:446 },
    { key:c, value:123 },
  ];

orderbyValueDsc = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
  return a.value > b.value ? 1 : (a.value > b.value) ? 0 : -1
}

<ul>
  <li *ngFor="let item of obj | keyvalue : orderbyValueDsc ">
    {{item.key}} ---> {{item.value}}</li>
</ul>

//Output
c ---> 123
b ---> 456
a ---> 789
```

```
 breeds=
    {
      "corgi": ["cardigan"],
      "bulldog": ["boston", "english", "french"],
      "hound": ["afghan", "basset", "blood", "english", "ibizan", "plott", "walker"],
    }

 orderClause = (a: KeyValue<number,[string]>, b: KeyValue<number,[string]>): number => {
    return a.value.length > b.value.length ? -1 : (a.value.length > b.value.length) ? 0 : 1
  }

<ul>
  <li *ngFor="let item of breeds | keyvalue : orderClause ">
    {{item.key}} ---> {{item.value}}</li>
</ul>

//Output:
hound ---> afghan,basset,blood,english,ibizan,plott,walker
bulldog ---> boston,english,french
corgi ---> cardigan


```

# Service

-   ok

# Injections

# modules

-   ok

# router - guard

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
