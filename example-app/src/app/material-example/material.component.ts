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
  NgrxValueConverter,
  NgrxValueConverters,
  resetAction,
  setValueAction,
} from "ngrx-forms";

import {
  FormValue,
  INITIAL_STATE,
  SetSubmittedValueAction,
  State,
} from "./material.reducer";
import { JsonPipe } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatListModule } from "@angular/material/list";
import { MatOptionModule } from "@angular/material/core";
import { MatRadioModule } from "@angular/material/radio";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: "ngf-material",
  templateUrl: "./material.component.html",
  styleUrls: ["./material.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgrxFormsModule,
    JsonPipe,
    SharedModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatListModule,
    MatOptionModule,
    MatRadioModule,
  ],
})
export class DynamicPageComponent {
  private readonly store = inject<Store<State>>(Store);

  protected readonly formState: Signal<FormGroupState<FormValue>> =
    this.store.selectSignal((s) => s.material.formState);

  protected readonly submittedValue: Signal<FormValue | undefined> =
    this.store.selectSignal((s) => s.material.submittedValue);

  protected readonly hobbyOptions = ["Sports", "Video Games"];

  protected readonly dateValueConverter: NgrxValueConverter<
    Date | null,
    string | null
  > = {
    convertViewToStateValue(value) {
      if (value === null) {
        return null;
      }

      // the value provided by the date picker is in local time but we want UTC so we recreate the date as UTC
      value = new Date(
        Date.UTC(value.getFullYear(), value.getMonth(), value.getDate())
      );
      return NgrxValueConverters.dateToISOString.convertViewToStateValue(value);
    },
    // tslint:disable-next-line: no-unbound-method
    convertStateToViewValue:
      NgrxValueConverters.dateToISOString.convertStateToViewValue,
  };

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
    if (this.formState().isValid) {
      const action = new SetSubmittedValueAction(this.formState().value);
      this.store.dispatch(action);
    }
  }
}
