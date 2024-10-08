import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { select, Store } from "@ngrx/store";
import {
  FormGroupState,
  NgrxValueConverter,
  NgrxValueConverters,
  resetAction,
  setValueAction,
} from "ngrx-forms";
import { Observable } from "rxjs";
import { filter, map, take } from "rxjs/operators";

import {
  FormValue,
  INITIAL_STATE,
  SetSubmittedValueAction,
  State,
} from "./material.reducer";

@Component({
  selector: "ngf-material",
  templateUrl: "./material.component.html",
  styleUrls: ["./material.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPageComponent {
  private readonly store = inject<Store<State>>(Store);

  protected readonly formState$: Observable<FormGroupState<FormValue>> =
    this.store.pipe(select((s) => s.material.formState));

  protected readonly submittedValue$: Observable<FormValue | undefined> =
    this.store.pipe(select((s) => s.material.submittedValue));

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
    this.formState$
      .pipe(
        take(1),
        filter((s) => s.isValid),
        map((fs) => new SetSubmittedValueAction(fs.value))
      )
      .subscribe(this.store);
  }
}
