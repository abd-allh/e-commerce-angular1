// import { Injectable } from '@angular/core';

// declare var $: any;

// @Injectable({ providedIn: 'root' })
// export class UtilService {
//   switchDirections = document.getElementById('switchDirection');
//   switchLangs = document.getElementById('switchLang');

//   // ------------ switch direction ------------
//   switchDirection = (lang: string) => switchDirections.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
//   switchLang = (lang: string) => switchLangs.setAttribute('lang', lang === 'en' ? 'en' : 'ar');
// }
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  // ------------ switch direction ------------
  switchDirection(lang: string): void {
    const switchDirectionElement = document.getElementById('switchDirection');
    if (switchDirectionElement) {
      switchDirectionElement.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
    }
  }

  switchLang(lang: string): void {
    const switchLangElement = document.getElementById('switchLang');
    if (switchLangElement) {
      switchLangElement.setAttribute('lang', lang === 'en' ? 'en' : 'ar');
    }
  }
}
