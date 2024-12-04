import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<div class="overlay">
    <div class="overlay__inner">
      <div class="overlay__content"><span class="spinner"></span></div>
    </div>
  </div>`,
  styleUrl: './loader.component.css',
})
export class LoaderComponent {}
