import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { FormGroupState } from "ngrx-forms";
import { Observable } from "rxjs";

import { FormValue, State } from "./async-validation.reducer";

@Component({
  selector: "ngf-async-validation",
  templateUrl: "./async-validation.component.html",
  styleUrls: ["./async-validation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsyncValidationPageComponent {
  protected readonly formState$: Observable<FormGroupState<FormValue>> = inject<
    Store<State>
  >(Store).pipe(select((s) => s.asyncValidation.formState));
  protected readonly searchResults$: Observable<string[]> = inject<
    Store<State>
  >(Store).pipe(select((s) => s.asyncValidation.searchResults));
}
