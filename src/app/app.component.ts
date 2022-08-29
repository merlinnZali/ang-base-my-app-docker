import { Component, OnInit } from '@angular/core';
import { EnvConfig } from './core/config/env-config';
import { EnvironmentLoaderService } from './core/config/environment-loader.service';
import { DefaultLangChangeEvent, LangChangeEvent, TranslateService, TranslationChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  protected envConfig!: EnvConfig;
  title = 'my-app-docker';
  param = {value: 'world'};
  selectedGender = 'male';
  itemQuantity ='1';

  constructor(private readonly envService: EnvironmentLoaderService, public translate: TranslateService) {
    let theme = Theme.GREEN;
    document.body.classList.add(theme);
  }

  ngOnInit(): void {
    this.envConfig = this.envService.get();

    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang() || "";
    this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');


    this.translate.get('HOME.TITLE').subscribe((res: string) => {
      console.log(res, '<======');
    });
    this.translate.get('HELLO', {value: 'world'}).subscribe((res: string) => {
      console.log(res);
      //=> 'hello world'
    });
    this.translate.get('HELLO2', {value: 'world'}).subscribe((res: string) => {
      console.log(res);
      //=> 'hello2 world'
    });

    this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
      console.log('onLangChange', event);
    });

    this.translate.onTranslationChange
    .subscribe((event: TranslationChangeEvent) => {
      console.log('onTranslationChange', event);
    });

    this.translate.onDefaultLangChange
    .subscribe((event: DefaultLangChangeEvent) => {
      console.log('onDefaultLangChange', event);
    });
    

    this.translate
    .get('HOME.TITLE')
    .subscribe((successMessage: string) => {
      alert(successMessage);
    });
  }
}


enum Theme{
  BLUE ="blue", // .blue
  RED = "red", // .red
  GREEN = "green" // .green
}
