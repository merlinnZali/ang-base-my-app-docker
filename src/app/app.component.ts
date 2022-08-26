import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app-docker';

  constructor() {
    let theme = Theme.RED;

    document.body.classList.add(theme);
  }
}


enum Theme{
  BLUE ="blue", // .blue
  RED = "red", // .red
  GREEN = "green" // .green
}
