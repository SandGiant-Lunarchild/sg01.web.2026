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
    data: { globalClassName: 'main-page' },
  },
  {
    path: "about",
    title: () => localizeTitle("about.page_title"),
    loadComponent: () => import('./about/about').then((m) => m.About),
  },
  {
    path: "articles",
    title: () => localizeTitle("articles.page_title"),
    loadComponent: () => import('./articles/articlesList').then((m) => m.ArticlesList),
    children: [
      {
        path: ":articleId",
        title: () => localizeTitle("articles.page_title"),
        loadComponent: () => import('./articles/articleDetail').then((m) => m.ArticleDetail),
      }
    ]
  },
  {
    path: "test",
    title: `Test Page`,
    component: TestPage,
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
