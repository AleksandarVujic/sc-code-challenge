import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [SidebarComponent, RouterModule],
  templateUrl: './shell.component.html',
})
export class ShellComponent {}
