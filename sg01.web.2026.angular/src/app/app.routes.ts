import { Routes } from '@angular/router';
import { TestPage } from './test/test'
import { Home } from './home/home'
import { LOCALE_ID } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { TranslateService } from "@ngx-translate/core";
import { combineLatest, concatAll, from, map, merge, Observable, of, pairwise } from 'rxjs';

function localizeTitle(key: string) {
  const translate = inject(TranslateService);
  const mainTitle = translate.get("title")
  const pageTitle = translate.get(key);
  return combineLatest([mainTitle, pageTitle]).pipe(map((values) => `${values[0]} - ${values[1]}`));
}

const childRoutes: Routes = [
  {
    path: '',
    title: () => localizeTitle("home.page_title"),
    component: Home,
  },
  {
    path: "test",
    title: `Test Page`,
    component: TestPage
  },
  {
    path: "test/:test-value",
    title: 'Test Page',
    component: TestPage
  }
];

function setLocaleAndGetChildren(locale: string) {
  const translate = inject(TranslateService);
  translate.use(locale);
  return childRoutes;
}

export const routes: Routes = [
  { path: 'nl', loadChildren: () => setLocaleAndGetChildren('nl'),  providers: [{ provide: LOCALE_ID, useValue: 'nl' }] },
  { path: '', loadChildren: () => setLocaleAndGetChildren('en'), providers: [{ provide: LOCALE_ID, useValue: 'en' }] },
];
