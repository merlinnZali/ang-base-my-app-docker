import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { EnvironmentLoaderService } from './core/config/environment-loader.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const initAppFn = (envService: EnvironmentLoaderService) => {
  return () => envService.loadEnvConfig();
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    EnvironmentLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: initAppFn,
      multi: true,
      deps: [EnvironmentLoaderService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
