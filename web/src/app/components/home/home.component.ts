import { Component, signal } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  counter = 0
  value = false
  posts = [];

  sumCounter() {
    this.counter += 1;
  }

  changefunc() {
    console.log('CHange')
  }

  constructor(private service: ApiService) {
    this.service.getPost().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (e) => {
        console.log(e)
      },
      complete: () => {
        console.log(this.posts);
      }
    });
  }
}
