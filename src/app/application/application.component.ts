import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent {
  @Input() appName: string = 'default';
}
