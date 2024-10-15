import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";

@Component({
  selector: "ngf-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatSidenavModule, MatListModule],
})
export class SidenavComponent {}
