import { Component } from '@angular/core';

const themes = {
  'dark': 'dark-theme',
  'light': 'light-theme'
} 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'shopping-cart';
  public themeClass = 'dark-theme';
}
