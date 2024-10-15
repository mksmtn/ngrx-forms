import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { MatLineModule } from "@angular/material/core";
import { MatListModule } from "@angular/material/list";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "ngf-nav-item",
  templateUrl: "./nav-item.component.html",
  styleUrls: ["./nav-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatLineModule, MatListModule],
})
export class NavItemComponent {
  hint = input("");

  routerLink = input<string | string[]>("/");

  protected lines = computed(() => (this.hint() ? 3 : 1));
}
