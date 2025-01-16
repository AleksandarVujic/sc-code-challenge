import { Component } from '@angular/core';

import { SCP_LOGO } from '../../constants';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  scp_logo: string = SCP_LOGO;
}
