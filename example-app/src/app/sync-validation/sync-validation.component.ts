import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { FormGroupState, resetAction, setValueAction } from "ngrx-forms";
import { Observable } from "rxjs";
import { filter, map, take } from "rxjs/operators";

import {
  FormValue,
  INITIAL_STATE,
  setSubmittedValueAction,
  State,
} from "./sync-validation.reducer";

@Component({
  selector: "ngf-sync-validation",
  templateUrl: "./sync-validation.component.html",
  styleUrls: ["./sync-validation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SyncValidationPageComponent {
  private readonly store = inject<Store<State>>(Store);

  protected readonly formState$: Observable<FormGroupState<FormValue>> =
    this.store.pipe(select((s) => s.syncValidation.formState));

  protected readonly submittedValue$: Observable<FormValue | undefined> =
    this.store.pipe(select((s) => s.syncValidation.submittedValue));

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
    this.formState$
      .pipe(
        take(1),
        filter((s) => s.isValid),
        map((fs) => setSubmittedValueAction({ submittedValue: fs.value }))
      )
      .subscribe(this.store);
  }
}
