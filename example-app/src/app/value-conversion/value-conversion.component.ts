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
  NgrxValueConverters,
} from "ngrx-forms";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { FormValue, State } from "./value-conversion.reducer";
import { SharedModule } from "../shared/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

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
    MatInputModule,
  ],
})
export class ValueConversionPageComponent {
  protected readonly formState: Signal<FormGroupState<FormValue>> = inject<
    Store<State>
  >(Store).selectSignal((s) => s.valueConversion.formState);

  protected readonly dateToISOString = NgrxValueConverters.dateToISOString;
}
