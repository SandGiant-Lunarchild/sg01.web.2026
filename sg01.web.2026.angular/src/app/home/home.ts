import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { LanguageLink } from '../languageLink';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [TranslateDirective, TranslatePipe, RouterLink, LanguageLink]
})
export class Home { }
