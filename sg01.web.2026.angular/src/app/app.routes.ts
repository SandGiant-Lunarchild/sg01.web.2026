import { Routes } from '@angular/router';
import { TestPage } from './test/test'
import { Home } from './home/home'

export const routes: Routes = [
  {
    path: '',
    title: 'App Home Page',
    component: Home
  },
  {
    path: "test",
    title: 'Test Page',
    component: TestPage
  },
  {
    path: "test/:test-value",
    title: 'Test Page',
    component: TestPage
  }
];
