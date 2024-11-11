import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from "@angular/core";
import { JsonPipe } from "@angular/common";
import { Store } from "@ngrx/store";
import { FormGroupState, NgrxFormsModule, unbox } from "ngrx-forms";

import { FormValue, State } from "./value-boxing.reducer";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: "ngf-value-boxing",
  templateUrl: "./value-boxing.component.html",
  styleUrls: ["./value-boxing.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgrxFormsModule, SharedModule, JsonPipe],
})
export class ValueBoxingPageComponent {
  protected readonly formState: Signal<FormGroupState<FormValue>> = inject<
    Store<State>
  >(Store).selectSignal((s) => s.valueBoxing.formState);

  protected readonly unbox = unbox;
  protected readonly options = [1, 2, 3, 4, 5];
}
