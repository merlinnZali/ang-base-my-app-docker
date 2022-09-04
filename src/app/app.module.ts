import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { EnvironmentLoaderService } from './core/config/environment-loader.service';
import { SecurityInterceptor } from './core/interceptor/SecurityInterceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// i18n
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// in order to load the local json for translation
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// plural, n a pas fonctionne
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { TranslateCompiler } from '@ngx-translate/core';
//Add all of the locales you want to support
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
//register local
registerLocaleData(localeFr, 'fr')
registerLocaleData(localeEn, 'en')

//
import { Observable, of } from 'rxjs';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare  as fasSquare, faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import {
  faSquare as farSquare,
  faCheckSquare as farCheckSquare,
  faCircleUp,
  faCircleDown,
} from '@fortawesome/free-regular-svg-icons';
import {
  faStackOverflow,
  faGithub,
  faMedium,
} from '@fortawesome/free-brands-svg-icons';



const initAppFn = (envService: EnvironmentLoaderService) => {
  return () => envService.loadEnvConfig();
};


// retrieve the json from api instead of loading it locally
export class CustomLoader implements TranslateLoader {
    constructor(private http: HttpClient, private envConfig: EnvironmentLoaderService){
    }

    getTranslation(lang: string): Observable<any> {
      if(lang === 'dev') {return of({});}
      const basePath = this.envConfig.get().serverUrl
      return this.http.get( basePath + '/translation?lang=' + lang)
    }
}


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, HttpClientModule,
    AppRoutingModule,

    // Load json language
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,

        // load from api
        //useClass: CustomLoader,
        //deps: [HttpClient, EnvironmentLoaderService]

        // load from local
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en',
      // plural
      /*
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }*/
    }),
     NgbModule,
     FontAwesomeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SecurityInterceptor, multi: true},
    //EnvironmentLoaderService provided in root,
    {
      provide: APP_INITIALIZER,
      useFactory: initAppFn,
      multi: true,
      deps: [EnvironmentLoaderService],
    },

    //Set the current locale
    { provide: LOCALE_ID, useValue:'fr-FR' }
    //{ provide: LOCALE_ID, useValue:'en-EN' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary) {
    library.addIcons(
      fasSquare,
      faCheckSquare,
      faCoffee,
      farSquare,
      farCheckSquare,
      faCircleUp,
      faCircleDown,
      faStackOverflow,
      faGithub,
      faMedium
    );
  }
}
