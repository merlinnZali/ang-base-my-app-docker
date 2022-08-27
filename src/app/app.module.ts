import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { EnvironmentLoaderService } from './core/config/environment-loader.service';
import { SecurityInterceptor } from './core/interceptor/SecurityInterceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr)
registerLocaleData(localeEn)

const initAppFn = (envService: EnvironmentLoaderService) => {
  return () => envService.loadEnvConfig();
};

// retrieve the json from api instead of loading it locally
export class CustomLoader implements TranslateLoader {
    constructor(private http: HttpClient, private envConfig: EnvironmentLoaderService){
    }

    getTranslation(lang: string): Observable<any> {
      if(lang === 'dev') {return of({});}
      return this.http.get(this.envConfig.get().serverUrl + '/translation?lang=' + lang)
    }
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, HttpClientModule,
    AppRoutingModule,
    // Load language from api
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomLoader,
        deps: [HttpClient, EnvironmentLoaderService]
      }
    })
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
    { provide: LOCALE_ID, useValue:'fr-FR' },
    { provide: LOCALE_ID, useValue:'en-EN' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
