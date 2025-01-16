import { Component } from '@angular/core';
import { SCP_LOGO } from '../../constants';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  scp_logo: string = SCP_LOGO;
}
