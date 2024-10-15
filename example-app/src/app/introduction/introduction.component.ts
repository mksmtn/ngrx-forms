import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: "ngf-introduction",
  templateUrl: "./introduction.component.html",
  styleUrls: ["./introduction.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatCardModule],
})
export class IntroductionPageComponent {}
