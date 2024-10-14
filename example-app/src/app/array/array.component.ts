import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { FormGroupState, NgrxFormsModule } from "ngrx-forms";
import { Observable } from "rxjs";

import { FormValue, State } from "./array.reducer";
import { MaterialModule } from "../material";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: "ngf-array",
  templateUrl: "./array.component.html",
  styleUrls: ["./array.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MaterialModule, NgrxFormsModule, SharedModule],
})
export class ArrayPageComponent {
  protected readonly formState$: Observable<FormGroupState<FormValue>> = inject<
    Store<State>
  >(Store).pipe(select((s) => s.array.formState));
}
