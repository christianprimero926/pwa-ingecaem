import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initializeApp();

    // Query for the toggle that is used to change between themes
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    toggleDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

    // Add or remove the "dark" class based on if the media query matches
    function toggleDarkTheme(shouldAdd) {
      document.body.classList.toggle('dark', shouldAdd);
    }
  }

  initializeApp() {
    this.changeDarkMode();
  }

  changeDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) {
      document.body.classList.toggle('dark');
    }
  }

  //   async ngOnInit() {
  //   // Query for the toggle that is used to change between themes
  //   // Use matchMedia to check the user preference
  //   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  //   toggleDarkTheme(prefersDark.matches);

  //   // Listen for changes to the prefers-color-scheme media query
  //   prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

  //   // Add or remove the "dark" class based on if the media query matches
  //   function toggleDarkTheme(shouldAdd) {
  //     document.body.classList.toggle('dark', shouldAdd);
  //   }

  // }

}
