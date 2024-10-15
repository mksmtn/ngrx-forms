import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { FormGroupState, NgrxFormsModule } from "ngrx-forms";

import { FormValue, State } from "./async-validation.reducer";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: "ngf-async-validation",
  templateUrl: "./async-validation.component.html",
  styleUrls: ["./async-validation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgrxFormsModule, SharedModule],
})
export class AsyncValidationPageComponent {
  protected readonly formState: Signal<FormGroupState<FormValue>> = inject<
    Store<State>
  >(Store).selectSignal((s) => s.asyncValidation.formState);
  protected readonly searchResults: Signal<string[]> = inject<Store<State>>(
    Store
  ).selectSignal((s) => s.asyncValidation.searchResults);
}
