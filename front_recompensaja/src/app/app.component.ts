import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RecompensaJá';
}
