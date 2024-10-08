import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { FormGroupState } from "ngrx-forms";
import { Observable, timer } from "rxjs";
import { map } from "rxjs/operators";

import {
  blockUIAction,
  FormValue,
  State,
  unblockUIAction,
} from "./recursive-update.reducer";

@Component({
  selector: "ngf-recursive-update",
  templateUrl: "./recursive-update.component.html",
  styleUrls: ["./recursive-update.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecursiveUpdatePageComponent {
  private readonly store = inject<Store<State>>(Store);

  protected readonly formState$: Observable<FormGroupState<FormValue>> =
    this.store.pipe(select((s) => s.recursiveUpdate.formState));

  protected submit(): void {
    this.store.dispatch(blockUIAction());
    timer(1000)
      .pipe(map(() => unblockUIAction()))
      .subscribe(this.store);
  }
}
