import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [SidebarComponent, RouterModule],
  templateUrl: './shell.component.html',
})
export class ShellComponent {}
