import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { FormGroupState, resetAction, setValueAction } from "ngrx-forms";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import {
  FormValue,
  INITIAL_STATE,
  setSubmittedValueAction,
  State,
} from "./simple-form.reducer";

@Component({
  selector: "ngf-simple-form",
  templateUrl: "./simple-form.component.html",
  styleUrls: ["./simple-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleFormPageComponent {
  private readonly store = inject<Store<State>>(Store);

  protected readonly formState$: Observable<FormGroupState<FormValue>> =
    this.store.pipe(select((s) => s.simpleForm.formState));

  protected readonly submittedValue$: Observable<FormValue | undefined> =
    this.store.pipe(select((s) => s.simpleForm.submittedValue));

  protected reset(): void {
    this.store.dispatch(
      setValueAction({
        controlId: INITIAL_STATE.id,
        value: INITIAL_STATE.value,
      })
    );
    this.store.dispatch(resetAction({ controlId: INITIAL_STATE.id }));
  }

  protected submit(): void {
    this.formState$
      .pipe(
        take(1),
        map((fs) => setSubmittedValueAction({ submittedValue: fs.value }))
      )
      .subscribe(this.store);
  }
}
