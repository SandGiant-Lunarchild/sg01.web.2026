
import { LocationStrategy } from '@angular/common';
import { Attribute, computed, Directive, effect, ElementRef, inject, Inject, Input, LOCALE_ID, OnChanges, OnDestroy, Renderer2, runInInjectionContext, signal, Signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink, RouterState, Navigation } from '@angular/router'
import { TranslateService } from '@ngx-translate/core';

function getLocalePrefix(localeId: string) {
  if (localeId == 'en' || localeId == '') {
    return '';
  }
  return '/' + localeId;
}

@Directive({
  selector: '[languageLink]',
  exportAs: 'languageLink',
  standalone: true,
  host: {
    "click": "onClick($event.button,$event.ctrlKey,$event.shiftKey,$event.altKey,$event.metaKey)",
    "attr.href": "reactiveHref()",
    "attr.target": "_target()"
  }
})
export class LanguageLink extends RouterLink {
  private _languageLink = signal('');
  private translate;

  constructor(translate : TranslateService, router: Router, route: ActivatedRoute, @Attribute("tabindex") tabIndexAttribute: string | null | undefined, renderer: Renderer2, el: ElementRef, @Inject(LocationStrategy) locationStrategy?: LocationStrategy | undefined) {
    super(router, route, tabIndexAttribute, renderer, el, locationStrategy);
    this.translate = translate;

    effect(() => {
      const localePrefix = getLocalePrefix(this.translate.currentLang() ?? 'en');
      let href = this._languageLink();
      if (!href.startsWith('/')) {
        href = '/' + href;
      }
      this.routerLink = localePrefix + href;
    })
  }

  @Input()
  set languageLink(href: string) {
    this._languageLink.set(href);
  }
}

@Directive({
  selector: '[switchLanguage]',
  exportAs: 'switchLanguage',
  standalone: true,
  host: {
    "click": "onClick($event.button,$event.ctrlKey,$event.shiftKey,$event.altKey,$event.metaKey)",
    "attr.href": "reactiveHref()",
    "attr.target": "_target()"
  }
})
export class SwitchLanguageLink extends RouterLink {
  private targetLocaleId = signal('en');
  private currentLocation;
  private translate;
  constructor(translate: TranslateService, router: Router, route: ActivatedRoute, @Attribute("tabindex") tabIndexAttribute: string | null | undefined, renderer: Renderer2, el: ElementRef, @Inject(LocationStrategy) locationStrategy?: LocationStrategy | undefined) {
    super(router, route, tabIndexAttribute, renderer, el, locationStrategy);
    this.currentLocation = router.lastSuccessfulNavigation;
    this.translate = translate;

    effect(() => {
      const currentLocation = this.currentLocation();
      let href = currentLocation?.finalUrl?.toString() ?? '/';
      const newLocalePrefix = getLocalePrefix(this.targetLocaleId());
      const currentLocalePrefix = getLocalePrefix(this.translate.currentLang() ?? 'en');
      if (!href.startsWith('/')) {
        href = '/' + href;
      }
      if (href.startsWith(currentLocalePrefix)) {
        href = href.substring(currentLocalePrefix.length);
      }
      this.routerLink = newLocalePrefix + href;
    });
  }

  @Input()
  set switchLanguage(localeId: string) {
    this.targetLocaleId.set(localeId);
  }
  get switchLanguage() {
    return this.targetLocaleId();
  }

  override onClick(button: number, ctrlKey: boolean, shiftKey: boolean, altKey: boolean, metaKey: boolean): boolean {
    if (!ctrlKey && !shiftKey && !altKey && !metaKey) {
      this.translate.use(this.targetLocaleId());
    }
    return super.onClick(button, ctrlKey, shiftKey, altKey, metaKey);
  }
}
