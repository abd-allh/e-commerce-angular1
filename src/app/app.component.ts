import { Component, inject, OnInit } from '@angular/core';
// import { TranslationService } from './shared/translation.service';
import { UtilService } from './shared/services/util.service';
import { LanguagesEnum } from './shared/enums/LanguagesEnum';
import { TranslationService } from './shared/core/i18n/translation.service';
// import { TranslateService } from '@ngx-translate/core';
import { locale as enLang } from './shared/core/i18n/en';
import { locale as arLang } from './shared/core/i18n/ar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  lang: string = '';

  constructor(
    private _translationService: TranslationService,
    private _utilService: UtilService
  ) {
    // Set Language
    let lang = localStorage.getItem('lang');
    if (lang) {
      this.lang = lang;
    } else {
      this.lang = LanguagesEnum.English;
      localStorage.setItem('lang', this.lang);
    }

    this._translationService.setLanguage(this.lang);
    this._utilService.switchLang(this.lang);
    this._utilService.switchDirection(this.lang);
    this._translationService.loadTranslations(enLang, arLang);
  }

  // ngOnInit(): void {
  //   this._translationService.setDefaultLang('ar');
  //   this._translationService.currentLang$.subscribe((lang: string) => {
  //     document.documentElement.setAttribute(
  //       'dir',
  //       lang === 'ar' ? 'rtl' : 'ltr'
  //     );
  //   });
  // }

  // switchLanguage(lang: string) {
  //   this._translationService.switchLanguage(lang);
  // }
}
