import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLangSubject = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLangSubject.asObservable();

  // constructor(private _translateService: TranslateService) {}
  _translateService = inject(TranslateService);

  setDefaultLang(lang: string): void {
    this._translateService.setDefaultLang(lang);
    this.currentLangSubject.next(lang);
  }

  switchLanguage(lang: string): void {
    this._translateService.use(lang);
    this.currentLangSubject.next(lang);
  }
}
