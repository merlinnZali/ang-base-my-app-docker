# DOCS

> [tektutorialshub.com/angular-tutorial/](https://www.tektutorialshub.com/angular-tutorial/)

> [angular-component-communication-sharing-data/](https://www.tektutorialshub.com/angular/angular-component-communication-sharing-data/)

> [select-options-example-in-angular/](https://www.tektutorialshub.com/angular/select-options-example-in-angular/)

> [replaysubject-behaviorsubject-asyncsubject/](https://www.tektutorialshub.com/angular/replaysubject-behaviorsubject-asyncsubject-in-angular/)

> [angular-reactive-forms/](https://www.tektutorialshub.com/angular/angular-reactive-forms/)

-   <b>Interpolation</b>: {{property}}

-   <b>Property Binding</b>: [value]="property"

-   <b>Event Binding</b>: (click)="property = something ou function"

-   <b>Two-way Binding</b>: [(size)]="property"

    ```
    <input type="text" [value]="name" (input)="name=$event.target.value">
    <p> You entered {{name}}</p>
    <button (click)="clearName()">Clear</button>
    ```

-   <b>NG-Model Binding</b>:

    ```
    <input type="text" name="value" ngModel (ngModelChange)="valueChanged($event)">
    <input type="text" name="value" [(ngModel)]="value">

    <p>Name: <input type="text" name="customer.name" [(ngModel)]="customer.name"></p>
    ```

-   <b>NG-Model Binding <span style="color: green;">CUSTOM</span></b>:

    ```
    // In the parent view:
    <childComponent [(count)]="count"></childComponent>
    <p> Current Count {{count}}</p>
    <button (click)="clearCount()">Clear</button>

    // ChildComponent
    <p>
      Count: {{ count }}
      <button (click)="increment()">Increment</button>
    </p>
    class ChildComponent{
      @Input count = 0;
      // the implicit event-word should end with Change
      @output countChange: EventEmitter<number> = new EventEmitter<number>();

      increment() {
        this.count++;
        this.countChange.emit(this.count);
      }
    }
    ```

-   <b>Input-Output</b>:

    -   [childProp@Input]="parentProp"
    -   (childEventEmitter@output) ="parentMethod($event)".

    ```
    @Input('customName') childProp;
    @output childEventEmitter: EventEmitter<any> = new EventEmitter<any>();

    // Intercept input property changes with a setter
    private _customName = '';
    @Input()
    set customer(parentProp: Customer) {
      //You can add some custom logic here
      this._customerData = customer;
      console.log(this._customerData)
    }
    get customer(): string { return this._customerData; }
    ```

-   <b>LocalVariable</b>:
    ```
     <h2>{{tag.name}}</h2>
     <childComponent #tag></childComponent>
     <b>Welcome {{lastName.value}} </b>
     <input (keyup)="0" type="text" #lastName id="lastName">
    ```

# View communication Stuff

-   > <b>ElemenRef</b>: any html with tagName
    > `<div #ElementRefDiv></div>`

-   > <b>TemplateRef</b>: (ng-template) with tagName or and var like (let-name or let-wellDone=true): use to instantiate a component or to be used into the template

    ```
    <ng-template #tpl>
      <span>I am span in template</span>
    </ng-template>
    ```

-   > <b>ViewRef</b>

-   > <b>ViewContainerRef</b>: container where one or more view can be attached
    > has createEmbededView(TemplateRef) or createComponent(ComponentFactoryResolver ... ComponentRef)

-   > <b>ComponentRef</b>

-   > <b>ng-container-ngComponentOutlet</b>:

    ```
    <div *ngIf="details">
      <div *ngFor="let info of details">
          {{ info.content }}
      </div>
    </div>

    // replace the undesired div with ng-container
    <ng-container *ngIf="details">
      <div *ngFor="let info of details">
        {{ info.content }}
      </div>
    </ng-container>

    // ngComponentOutlet
    <ng-container *ngComponentOutlet="ColorComponentOrTemplate"></ng-container>
    ```

-   > <b>ng-content</b>: is used to project content into Angular components

    ```
    // in child:
    <h1>Child Info</h1>
    <ng-content select="[input], [form-field]"></ng-content>

    // in parent:
    <app-child>
      <h1 input>Content1!</h3>
      <h2 form-field>Content2!</h2>
      <h3 input form-field>Content1 & Content2!</h1> <------ the used one
    </app-child>
    ```

-   > <b>ViewChild</b>: Any component, directive, or element which is part of a template is ViewChild and any component or element which is projected in the template is ContentChild

    ```
    // child: selector app-view-child
    <div #header>
      <ng-content></ng-content> [ContentChild] <- the h4 and app-message(MessageComponent) both ll be here
    </div>

    // parent:
    <app-view-child>
     <h4 #content></h4>  [ViewChild as ElemenRef]
     <app-message [message]="message"></app-message> [ViewChild as ComponentRef]
     //ou
     <app-message *ngFor="let f of messages" [message]='f'></app-message>
    </app-view-child>

    @ViewChild(MessageComponent) messageViewChild: MessageComponent;
    // ou
    @ViewChildren(MessageComponent) messageViewChildren: QueryList<MessageComponent>;

    constructor(private cd: ChangeDetectorRef) {}

    ngAfterViewInit() {
      console.log(this.messageViewChild);
      this.messageViewChild.message = 'Passed as View Child';
      // ou
      console.log(this.messageViewChildren);
      this.messageViewChildren.forEach((item) => { item.message = 'Infragistics';

      // the value will change but the console will show an error
      // error: Expression has changed after it was last checked
      This error can be fixed two ways,
        - By changing the ViewChild property in ngAfterContentInit life cycle hook
        - Manually calling change detection using ChangeDetectorRef

      solution 1:
      this.cd.detectChanges();
    }
    solution 2:
    ngAfterContentInit() {
      this.messageViewChild.message = 'Passed as View Child';
      //ou
      this.messageViewChildren.forEach((item) => { item.message = 'Infragistics';
    }
    ngOnInit() {
      this.message = 'Hello World !';
    }
    ```

-   > <b>ContentChild</b>: Any component, directive, or element which is part of a template is ViewChild and any component or element which is projected in the template is ContentChild

    ```
    // child: selector app-view-child
    <div #header>
      <ng-content select="app-message"></ng-content> [ContentChild] <- only app-message(MessageComponent) ll be here
    </div>

    @ContentChild(MessageComponent) MessageComponnetContentChild: MessageComponent;
    // ou
    @ContentChildren(MessageComponent) MessageComponnetContentChild: QueryList<MessageComponent>;

    ngAfterContentInit() {
      console.log(this.MessageComponnetContentChild);
      // in case of ContentChildren
      this.MessageComponnetContentChild.forEach((m) => m.message = 'Foo');
    }

    // parent:
    <app-view-child>
     <h4 #content></h4>  [ViewChild as ElemenRef]
     <app-message [message]="message"></app-message> [ViewChild as ComponentRef]
     // ou
     <app-message *ngFor='let m of messages' [message]='m'></app-message>
    </app-view-child>
    ```

# MyAppDocker

> <b>AppComponent.ts</b>

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

<b>The plural</b>

> npm install ngx-translate-messageformat-compiler messageformat

Custom loader for using also backend data for translation

# Bootstrap

-   <b>ngBootstrap</b>
-   <b>ngx-bootstrap</b>:
    -   better than ngBootstrap
    -   https://valor-software.com/ngx-bootstrap/#/documentation#getting-started
-   <b>fontAwesome</b>
-   <b>ngSelect</b>
-   <b>Bootstrap-icons</b>
-   <b>ngx-bootstrap-icons</b>: npm i ngx-bootstrap-icons --save

# Http - Interceptors

-   ok

# Directives

-   <b>Structure</b>:

    -   ngFor
    -   ngSwitch
    -   ngIf

-   <b>Attribute</b>:

    -   ngClass
    -   ngStyle
    -   ngModel

-   <b>Custom directive</b>:

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

> <b>Custom</b>:

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

> use it: Fahrenheit : {{ celcius | tempConverter:'F' }}

> use it into component:

```
  constructor(private tempConverterPipe:TempConverterPipe) {
  }
this.result = this.tempConverterPipe.transform(value, unit);
```

> <b>Async Pipe</b>: {{ value |lowercase | async }}

> <b>KeyValue Pipe + comparator</b>

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

add <b>.prettierignore</b>

```
 package.json
 package-lock.json
 yarn.lock
 dist
```

Prettier takes care of the formatting whereas tslint takes care of all the other things.

> npm install --save-dev tslint-config-prettier

<b>.tslint.json</b>:

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
