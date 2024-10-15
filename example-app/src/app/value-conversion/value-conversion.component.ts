import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import {
  FormGroupState,
  NgrxFormsModule,
  NgrxValueConverters,
} from "ngrx-forms";
import { Observable } from "rxjs";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { FormValue, State } from "./value-conversion.reducer";
import { SharedModule } from "../shared/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: "ngf-value-conversion",
  templateUrl: "./value-conversion.component.html",
  styleUrls: ["./value-conversion.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgrxFormsModule,
    SharedModule,
    MatDatepickerModule,
    MatFormFieldModule,
  ],
})
export class ValueConversionPageComponent {
  protected readonly formState: Signal<FormGroupState<FormValue>> = inject<
    Store<State>
  >(Store).selectSignal((s) => s.valueConversion.formState);

  protected readonly dateToISOString = NgrxValueConverters.dateToISOString;
}
