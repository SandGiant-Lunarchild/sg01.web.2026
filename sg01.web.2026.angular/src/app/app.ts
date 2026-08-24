import { Component, signal, effect, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {
    TranslateService,
    TranslatePipe,
    TranslateDirective
} from "@ngx-translate/core";

@Component({
  selector: 'app-root', 
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, RouterLink, TranslateDirective]
})
export class App {
  protected readonly title = signal('sg01.web.2026.angular', { debugName: "Web Title" });
  private translate = inject(TranslateService);

    constructor() {
        // `lang` and `fallbackLang` from provideTranslateService() are already applied;
        // call addLangs() to register additional languages the user can switch to.
        this.translate.addLangs(['en', 'nl']);
        effect(() => {
          const lang =
            this.translate.currentLang() ??
            this.translate.fallbackLang() ??
            'en';
          if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('lang', lang);
          }
      });
    }
}
