import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { filter, first, map, Observable, of, take } from 'rxjs'
import { EnvironmentLoaderService } from '../config/environment-loader.service'

@Injectable({ providedIn: 'root' })
export class ProjectResolve implements Resolve<boolean> {
    // inject the service
    constructor(private configService: EnvironmentLoaderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        // log the value of the configuration here
        // if this is too soon, the result is undefined
        //console.log('on resolve', this.configService.get().serverUrl);
        /*
    // in resolver, need to take 1 and return
    // This is the first attempt
    return this.configService.config$.pipe(
      take(1),
      map(n => {
          if (n.apiUrl === 'default') {
            // the first one will actually be the fallback
              return false;
          }
          return true;
      })
    );

    // attempt two: filter before you take
    return this.configService.config$.pipe(
      filter(n => n['somevalue to distinguish remote config']),
      take(1),
      map(n => {
          if (n.apiUrl === 'default') {
              return false;
          }
          // it will be true for sure
          return true;
      })
    );

    // last attempt, two in one:
    return this.configService.config$.pipe(
      first(n => n['somevalue to distinguish remote config']),
      map(n => {
          // it will be true for sure
          return true;
      })
    );
    */
        return this.configService.config$.pipe(
            first((n) => n['isServed']),
            map((n) => {
                return true
            })
        )
        // return of(true)
    }
}
