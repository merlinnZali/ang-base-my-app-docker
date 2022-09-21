//--------------- ElementRef----------------------


@ViewChild('foo', {static: false}) foo: ElementRef;



@Component({
    selector: 'sample',
    template: `
        <span #tref>I am span</span>
    `
})
export class SampleComponent implements AfterViewInit {
    @ViewChild("tref", {read: ElementRef}) tref: ElementRef;

    ngAfterViewInit(): void {
        // outputs `I am span`
        console.log(this.tref.nativeElement.textContent);
    }
}

//--------------- TemplateRef----------------------

@Component({
    selector: 'sample',
    template: `
        <ng-template #tpl>
            <span>I am span in template</span>
        </ng-template>
    `
})
export class SampleComponent implements AfterViewInit {
    @ViewChild("tpl") tpl: TemplateRef<any>;

    ngAfterViewInit() {
        let elementRef = this.tpl.elementRef;
        // outputs `template bindings={}`
        console.log(elementRef.nativeElement.textContent);
    }
}

//--------------- ViewRef ----------------------

// Angular supports two types of views:

// Embedded Views which are linked to a Template
// Host Views which are linked to a Component

// Creating embedded view
// A template simply holds a blueprint for a view. 
// A view can be instantiated from the template using aforementioned createEmbeddedView method like this

ngAfterViewInit() {
    let view = this.tpl.createEmbeddedView(null);
}

// Creating host view
// Host views are created when a component is dynamically instantiated. 
// A component can be created dynamically using ComponentFactoryResolver:

constructor(private injector: Injector,
            private r: ComponentFactoryResolver) {
    let factory = this.r.resolveComponentFactory(ColorComponent);
    let componentRef = factory.create(injector);
    let view = componentRef.hostView;
}



//--------------- ViewContainerRef ----------------------


// Represents a container where one or more views can be attached.

 // This is similar to how router-outlet inserts components.


@Component({
    selector: 'sample',
    template: `
        <span>I am first span</span>
        <ng-container #vc></ng-container>
        <span>I am last span</span>
    `
})
export class SampleComponent implements AfterViewInit {
    @ViewChild("vc", {read: ViewContainerRef}) vc: ViewContainerRef;

    ngAfterViewInit(): void {
        // outputs `template bindings={}`
        console.log(this.vc.element.nativeElement.textContent);
    }
}

// Manipulating views
// ViewContainer provides a convenient API for manipulating the views:

class ViewContainerRef {
    ...
    clear() : void
    insert(viewRef: ViewRef, index?: number) : ViewRef
    get(index: number) : ViewRef
    indexOf(viewRef: ViewRef) : number
    detach(index?: number) : ViewRef
    move(viewRef: ViewRef, currentIndex: number) : ViewRef
}



@Component({
    selector: 'sample',
    template: `
        <span>I am first span</span>
        <ng-container #vc></ng-container>
        <span>I am last span</span>
        <ng-template #tpl>
            <span>I am span in template</span>
        </ng-template>
    `
})

export class SampleComponent implements AfterViewInit {
    @ViewChild("vc", {read: ViewContainerRef}) vc: ViewContainerRef;
    @ViewChild("tpl") tpl: TemplateRef<any>;

    ngAfterViewInit() {
        let view = this.tpl.createEmbeddedView(null);
        this.vc.insert(view);
    }
}

// html looks like this:

<sample>
    <span>I am first span</span>
    <!--template bindings={}-->
    <span>I am span in template</span>
    <!--template bindings={}-->

    <span>I am last span</span>
</sample>


// Creating Views
// ViewContainer also provides API to create a view automatically:

class ViewContainerRef {
    element: ElementRef
    length: number

    createComponent(componentFactory...): ComponentRef<C>
    createEmbeddedView(templateRef...): EmbeddedViewRef<C>
    ...
}

// ngTemplateOutlet and ngComponentOutlet
    
   // ngTemplateOutlet 
    @Component({
    selector: 'sample',
    template: `
        <span>I am first span</span>
        <ng-container [ngTemplateOutlet]="tpl"></ng-container>
        <span>I am last span</span>
        <ng-template #tpl>
            <span>I am span in template</span>
        </ng-template>
    `
})
export class SampleComponent {}


// ngComponentOutlet
<ng-container *ngComponentOutlet="ColorComponent"></ng-container>




