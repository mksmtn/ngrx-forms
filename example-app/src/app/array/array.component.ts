import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import { FormGroupState, NgrxFormsModule } from "ngrx-forms";
import { Observable } from "rxjs";

import { FormValue, State } from "./array.reducer";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: "ngf-array",
  templateUrl: "./array.component.html",
  styleUrls: ["./array.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgrxFormsModule, SharedModule],
})
export class ArrayPageComponent {
  protected readonly formState: Signal<FormGroupState<FormValue>> = inject<
    Store<State>
  >(Store).selectSignal((s) => s.array.formState);
}
