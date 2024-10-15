import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from "@angular/core";
import { Store } from "@ngrx/store";
import {
  FormGroupState,
  NgrxFormsModule,
  resetAction,
  setValueAction,
} from "ngrx-forms";

import {
  FormValue,
  INITIAL_STATE,
  setSubmittedValueAction,
  State,
} from "./sync-validation.reducer";
import { JsonPipe } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: "ngf-sync-validation",
  templateUrl: "./sync-validation.component.html",
  styleUrls: ["./sync-validation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [JsonPipe, NgrxFormsModule, SharedModule],
})
export class SyncValidationPageComponent {
  private readonly store = inject<Store<State>>(Store);

  protected readonly formState: Signal<FormGroupState<FormValue>> =
    this.store.selectSignal((s) => s.syncValidation.formState);

  protected readonly submittedValue: Signal<FormValue | undefined> =
    this.store.selectSignal((s) => s.syncValidation.submittedValue);

  protected readonly days = Array.from(Array(31).keys());

  protected readonly months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  protected readonly years = Array.from(Array(115).keys()).map((i) => i + 1910);

  protected reset() {
    this.store.dispatch(
      setValueAction({
        controlId: INITIAL_STATE.id,
        value: INITIAL_STATE.value,
      })
    );
    this.store.dispatch(resetAction({ controlId: INITIAL_STATE.id }));
  }

  protected submit() {
    if (this.formState().isValid) {
      const action = setSubmittedValueAction({
        submittedValue: this.formState().value,
      });
      this.store.dispatch(action);
    }
  }
}
