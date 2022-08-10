import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app-docker';

  constructor() {
    let theme = Theme.BLUE;

    document.body.classList.add(theme);
  }
}


enum Theme{
  BLUE ="blue",
  RED = "red",
  GREEN = "green"
}
