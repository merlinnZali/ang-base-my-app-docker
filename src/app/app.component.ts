import { Component, OnInit, TemplateRef } from '@angular/core'
import { EnvConfig } from './core/config/env-config'
import { EnvironmentLoaderService } from './core/config/environment-loader.service'
import { DefaultLangChangeEvent, LangChangeEvent, TranslateService, TranslationChangeEvent } from '@ngx-translate/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { LoggerService } from './core/config/logger-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  protected envConfig!: EnvConfig

  /*
    title = 'my-app-docker'
    param = { value: 'world' }

    modalRef?: BsModalRef
    selectedGender = 'male'
    itemQuantity = '1'

    selectedCar!: number

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ]
*/
  constructor(
    private readonly envService: EnvironmentLoaderService,
    public translate: TranslateService,
    //private modalService: BsModalService,
    private loggerService: LoggerService
  ) {
    let theme = Theme.GREEN
    document.body.classList.add(theme)
  }

  ngOnInit(): void {
    this.loggerService.log('Test logging ...')
    this.loggerService.debug('Test debugging ...')

    this.envConfig = this.envService.get()

    //init language
    this.translate.addLangs(['en', 'fr'])
    this.translate.setDefaultLang('en')
    const browserLang = this.translate.getBrowserLang() || ''
    this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en')

    //listener when specific information is loaded
    this.translate.get('HOME.TITLE').subscribe((res: string) => {
      console.log(res, '<======')
    })
    // only if we are sure that the translation is loaded
    //const value = this.translate.instant('key');
    //console.log(value)
    this.translate.get('HELLO', { value: 'world' }).subscribe((res: string) => {
      console.log(res)
      //=> 'hello world'
    })
    this.translate.get('HELLO2', { value: 'world' }).subscribe((res: string) => {
      console.log(res)
      //=> 'hello2 world'
    })

    //listener when lang change
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log('onLangChange', event)
    })

    //listener when translation change
    this.translate.onTranslationChange.subscribe((event: TranslationChangeEvent) => {
      console.log('onTranslationChange', event)
    })

    this.translate.onDefaultLangChange.subscribe((event: DefaultLangChangeEvent) => {
      console.log('onDefaultLangChange', event)
    })
  }
  /* 
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template)
    } */
}

enum Theme {
  BLUE = 'blue', // .blue
  RED = 'red', // .red
  GREEN = 'green', // .green
}
