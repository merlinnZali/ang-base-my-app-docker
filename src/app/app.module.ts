import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { EnvironmentLoaderService } from './core/config/environment-loader.service';
import { SecurityInterceptor } from './core/interceptor/SecurityInterceptor';

import { AppRoutingModule } from './app-routing.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
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

import { delay, take, catchError, Observable, of, switchMap, finalize, retry, forkJoin, interval, combineLatest } from 'rxjs';

// retrieve the json from api instead of loading it locally
export class CustomLoader implements TranslateLoader {
  suffix = '.json'
  assets_folder = 'assets/i18n/'
  constructor(private http: HttpClient, private envConfig: EnvironmentLoaderService){
  }

  getTranslation(lang: string): Observable<any> {

    if(lang === 'dev') {
      return of({});
    }

    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
     });
    const basePath = this.envConfig.get().serverUrl
    // http://localhost:8081/translation?lang=en
    const url = basePath + 'translation__?lang=' + lang
    const obs$ = this.http.get( url, { headers: header})
    .pipe(
      switchMap(result => {
        /*
        result
        {
            "label": "my label",
            "name": "my name",
            "count": 2
        }*/
        console.log('result', result)
        const flattenObj = (obj: any, objToAdd: { [x: string]: any; }) => {
          Object.entries(obj).map(([key, value]) => {
            objToAdd[key] = ""+value;
          })
        }
        let objFrFlat = {};
        flattenObj(result, objFrFlat);
        console.log('objFrFlat', objFrFlat)
        /*
        objFrFlat
        {
            "label": "my label", <= <h2>{{ 'label' | translate }}</h2>
            "name": "my name",
            "count": "2"
        } */
        return of(objFrFlat)
      }),
      catchError(_ => {
        console.log(_)
        let result = {}
        if(lang == 'en'){
          result = {
            "label": "my label when error in backend"
          }
        }else{
          result = {
            "label": "mon label quand erreur en backend"
          }
        }
        return of(
          result
        )
      }),
      retry(1),
      finalize(() => {
        console.log('obs$ done!')
      })
    );

    const obs2$ = this.http.get(`${this.assets_folder}/${lang}${this.suffix}`).pipe(
      switchMap(responses => {
        return of(responses)
      }),
      catchError(error => {
        console.log(error)
        return of('no more requests!!!')
      }),
      finalize(() => {
        console.log('obs2$ done!')
      })
    )

    return forkJoin([obs$, obs2$]).pipe(
      switchMap(responses => {
        const result = Object.assign({}, responses[0], responses[1])
        return of(result)
      })
    )
  }
}


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

// load config
const initAppFn = (envService: EnvironmentLoaderService) => {
  return () => envService.loadEnvConfig();
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgSelectModule,
    FontAwesomeModule,
    // Load json language
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,

        // load from api
        useClass: CustomLoader,
        deps: [HttpClient, EnvironmentLoaderService]

        // load from local
        //useFactory: HttpLoaderFactory,
        //deps: [HttpClient]
      },
      defaultLanguage: 'en',
      // plural
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    }),
    TooltipModule.forRoot()
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
    ,
    // set deployUrl BasePath
    {provide: APP_BASE_HREF, useValue: '/my-app-docker'}
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
