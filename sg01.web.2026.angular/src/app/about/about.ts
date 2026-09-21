import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  templateUrl: './about.html',
  imports: [TranslateDirective, TranslatePipe, RouterLink]
})
export class About { }
