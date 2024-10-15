import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";

@Component({
  selector: "ngf-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatSidenavModule],
})
export class LayoutComponent {}
