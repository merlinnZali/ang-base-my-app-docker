import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AppConfig {
  /*envConfig!: EnvConfig;
  
    constructor(private http: HttpClient) {}
  
    loadConfig() {
      return this.http
        .get<EnvConfig>(environment.configPath)
        .toPromise()
        .then(envConfig => {
          this.envConfig = envConfig;
        });
    }

    getConfigPath(){
        return environment.configPath;
    }
    
    getEnvConfig(): EnvConfig {
      return this.envConfig;
    }
  */
}
