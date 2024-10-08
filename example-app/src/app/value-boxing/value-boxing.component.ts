import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { FormGroupState, unbox } from "ngrx-forms";
import { Observable } from "rxjs";

import { FormValue, State } from "./value-boxing.reducer";

@Component({
  selector: "ngf-value-boxing",
  templateUrl: "./value-boxing.component.html",
  styleUrls: ["./value-boxing.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValueBoxingPageComponent {
  protected readonly formState$: Observable<FormGroupState<FormValue>> = inject<
    Store<State>
  >(Store).pipe(select((s) => s.valueBoxing.formState));

  protected readonly unbox = unbox;
}
