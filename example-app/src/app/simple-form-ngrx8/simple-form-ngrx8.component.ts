import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { FormGroupState, resetAction, setValueAction } from "ngrx-forms";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import {
  FormValue,
  INITIAL_STATE,
  setSubmittedValue,
  State,
} from "./simple-form-ngrx8.reducer";

@Component({
  selector: "ngf-simple-form-ngrx8",
  templateUrl: "./simple-form-ngrx8.component.html",
  styleUrls: ["./simple-form-ngrx8.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleFormNgrx8PageComponent {
  private readonly store = inject<Store<State>>(Store);

  protected readonly formState$: Observable<FormGroupState<FormValue>> =
    this.store.pipe(select((s) => s.simpleFormNgrx8.formState));

  protected readonly submittedValue$: Observable<FormValue | undefined> =
    this.store.pipe(select((s) => s.simpleFormNgrx8.submittedValue));

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
        map((fs) => setSubmittedValue({ submittedValue: fs.value }))
      )
      .subscribe(this.store);
  }
}
