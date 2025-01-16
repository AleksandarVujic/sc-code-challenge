import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SCP_LOGO } from '../../constants';

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  scp_logo: string = SCP_LOGO;
}
