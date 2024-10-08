import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { FormGroupState } from "ngrx-forms";
import { Observable } from "rxjs";

import { FormValue, State } from "./array.reducer";

@Component({
  selector: "ngf-array",
  templateUrl: "./array.component.html",
  styleUrls: ["./array.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrayPageComponent {
  protected readonly formState$: Observable<FormGroupState<FormValue>> = inject<
    Store<State>
  >(Store).pipe(select((s) => s.array.formState));

  protected trackByIndex(index: number): number {
    return index;
  }
}
