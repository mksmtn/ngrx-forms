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
} from "./simple-form.reducer";
import { JsonPipe } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: "ngf-simple-form",
  templateUrl: "./simple-form.component.html",
  styleUrls: ["./simple-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [JsonPipe, SharedModule, NgrxFormsModule],
})
export class SimpleFormPageComponent {
  private readonly store = inject<Store<State>>(Store);

  protected readonly formState: Signal<FormGroupState<FormValue>> =
    this.store.selectSignal((s) => s.simpleForm.formState);

  protected readonly submittedValue: Signal<FormValue | undefined> =
    this.store.selectSignal((s) => s.simpleForm.submittedValue);

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
    const action = setSubmittedValueAction({
      submittedValue: this.formState().value,
    });
    this.store.dispatch(action);
  }
}
