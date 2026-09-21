import { Component, signal, effect, inject, computed, Signal } from '@angular/core';
import { RouterOutlet, RouterLink, ResolveFn, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective
} from "@ngx-translate/core";

const resolveGlobalClassName: ResolveFn<string> = (route, state) => {
  return route.data['globalClassName'] as string ?? "";
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, RouterLink, TranslateDirective]
})
export class App {
  private translate = inject(TranslateService);
  private router = inject(Router);
  protected readonly globalClassName: Signal<string>;

  constructor(route: ActivatedRoute) {
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
    this.globalClassName = computed(() => {
      const lastNav = this.router.lastSuccessfulNavigation();

      const lastRoute = route;
      let childRoute = lastRoute;
      while (childRoute.firstChild != null) {
        childRoute = childRoute.firstChild;
      }

      const lastUrl = lastNav?.finalUrl?.toString() ?? "";

      if (lastUrl !== "") {

        const data = childRoute.routeConfig?.data;
        return data?.['globalClassName'] as string ?? "unset";
      }
      return "base";

      //return lastNav?.finalUrl?.toString() ?? "";
    });
  }
}
