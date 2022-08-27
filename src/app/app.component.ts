import { Component } from '@angular/core';
import { EnvConfig } from './core/config/env-config';
import { EnvironmentLoaderService } from './core/config/environment-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  protected envConfig!: EnvConfig;
  title = 'my-app-docker';

  constructor(private readonly envService: EnvironmentLoaderService) {
    let theme = Theme.RED;
    document.body.classList.add(theme);
  }

  ngOnInit(): void {
    this.envConfig = this.envService.get();
  }
}


enum Theme{
  BLUE ="blue", // .blue
  RED = "red", // .red
  GREEN = "green" // .green
}
