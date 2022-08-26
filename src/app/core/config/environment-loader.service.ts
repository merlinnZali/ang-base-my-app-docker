import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnvConfig } from './env-config';

@Injectable()
export class EnvironmentLoaderService {
  private envConfig!: EnvConfig;

  constructor(private readonly http: HttpClient) {}

  async loadEnvConfig(): Promise<void> {
    console.log('Loading environment config!');
    this.envConfig = await lastValueFrom(this.http.get<EnvConfig>(environment.configPath));
  }

  getEnvConfig(): EnvConfig {
    return this.envConfig;
  }

  getConfigPath(){
    return environment.configPath;
  }
}
