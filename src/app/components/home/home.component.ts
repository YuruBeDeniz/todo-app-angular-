import { Component } from '@angular/core';
import { CounterComponent } from "../counter/counter.component";
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CounterComponent, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  initialCount = 18;
  today = new Date();
  name = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to user$ to dynamically set the name
    this.authService.user$.subscribe((user: User | null) => {
      if (user) {
        this.name = user.username; 
      } else {
        this.name = 'Guest';
      }
    });
  }

  onCountChange(newCount: number) {
    this.initialCount = newCount;
  }
}
