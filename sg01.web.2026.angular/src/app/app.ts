import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root', 
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [ RouterOutlet, RouterLink ]
})
export class App {
  protected readonly title = signal('sg01.web.2026.angular', { debugName: "Web Title" });
}
