import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, lastValueFrom, map, Observable, of, switchMap } from 'rxjs'
import { environment } from 'src/environments/environment'
import { EnvConfig } from './env-config'

const EnvConfigDefault: EnvConfig = {
  apiUrl: 'default',
  serverUrl: '',
  hello: '',
  clientId: '',
  isServed: false,
}
@Injectable({
  providedIn: 'root',
})
export class EnvironmentLoaderService {
  // replace {} with default config
  private envConfig: EnvConfig = EnvConfigDefault

  // using loadAppConfig$
  // keep track of config, initialize with fall back Config
  private config = new BehaviorSubject<EnvConfig>(this.envConfig)
  config$: Observable<EnvConfig> = this.config.asObservable()

  // make a static member
  private static _config: EnvConfig

  // and a static getter with fallback
  static get Config(): EnvConfig {
    return this._config || EnvConfigDefault
  }

  constructor(private readonly http: HttpClient) {}

  async loadEnvConfig(): Promise<void> {
    console.log('Loading environment config!')
    this.envConfig = await lastValueFrom(this.http.get<EnvConfig>(environment.configPath))
  }

  async loadAppConfig2(): Promise<any> {
    this.envConfig = await lastValueFrom(
      this.http.get<EnvConfig>(environment.configPath).pipe(
        switchMap(response => {
          // do something to reflect into local model
          // this.CreateConfig(response);
          return of(response)
        }),
        catchError(error => {
          // if in error, set default fall back from environment
          // this.CreateConfig(defaultConfig);
          return of({} as EnvConfig)
        })
      )
    )
  }

  loadAppConfig$(): Observable<boolean> {
    return this.http.get<EnvConfig>(environment.configPath).pipe(
      switchMap(response => {
        // do something to reflect into local model
        const _config = this._createConfig(response)
        // here next
        this.config.next(_config)
        // or save it into a static var
        EnvironmentLoaderService._config = _config
        return of(true)
      }),
      catchError(error => {
        // if in error, return fall back from Config
        this.config.next(this.envConfig)
        console.log(error)
        return of(false)
      })
    )
  }

  private _createConfig(config: any): EnvConfig {
    // cast all keys as are
    const _config = { ...(<EnvConfig>config) }
    return _config
  }

  get(): EnvConfig {
    return this.envConfig
  }

  getConfigPath() {
    return environment.configPath
  }

  getAssetPath() {
    return environment.assetsPath
  }
}
