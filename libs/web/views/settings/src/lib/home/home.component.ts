import { Component, inject, signal } from '@angular/core';
import { Language, Theme } from '@md/common/enums';
import { languages, themes } from '@md/web/common/constants';
import { LanguageAction, RootState, ThemeAction } from '@md/web/common/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'md-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  themes = themes as any;
  languages = languages as any;

  store = inject(Store<RootState>);

  onThemeChange(theme: Theme) {  
    this.store.dispatch(ThemeAction({ theme }));
  }

  onLanguageChange(language: Language) {
    this.store.dispatch(LanguageAction({ language }));
  }
}
