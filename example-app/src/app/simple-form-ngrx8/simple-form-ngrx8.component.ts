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
  setSubmittedValue,
  State,
} from "./simple-form-ngrx8.reducer";
import { JsonPipe } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: "ngf-simple-form-ngrx8",
  templateUrl: "./simple-form-ngrx8.component.html",
  styleUrls: ["./simple-form-ngrx8.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [JsonPipe, NgrxFormsModule, SharedModule],
})
export class SimpleFormNgrx8PageComponent {
  private readonly store = inject<Store<State>>(Store);

  protected readonly formState: Signal<FormGroupState<FormValue>> =
    this.store.selectSignal((s) => s.simpleFormNgrx8.formState);

  protected readonly submittedValue: Signal<FormValue | undefined> =
    this.store.selectSignal((s) => s.simpleFormNgrx8.submittedValue);

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
    const action = setSubmittedValue({
      submittedValue: this.formState().value,
    });
    this.store.dispatch(action);
  }
}
