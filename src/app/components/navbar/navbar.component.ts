import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  constructor(private userService: UserService, private router: Router){}
  

  onLogout(): void {
    this.userService.logout().subscribe({
      next: (response) => {
        console.log('Logged out successfully:', response);
        localStorage.removeItem('authToken'); 
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error during logout:', error);
      }
    });
  }
}
