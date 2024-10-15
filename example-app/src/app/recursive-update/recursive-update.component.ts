import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { FormGroupState, NgrxFormsModule } from "ngrx-forms";
import { timer } from "rxjs";
import { map } from "rxjs/operators";

import {
  blockUIAction,
  FormValue,
  State,
  unblockUIAction,
} from "./recursive-update.reducer";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: "ngf-recursive-update",
  templateUrl: "./recursive-update.component.html",
  styleUrls: ["./recursive-update.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgrxFormsModule, SharedModule],
})
export class RecursiveUpdatePageComponent {
  private readonly store = inject<Store<State>>(Store);

  protected readonly formState: Signal<FormGroupState<FormValue>> =
    this.store.selectSignal((s) => s.recursiveUpdate.formState);

  protected submit(): void {
    this.store.dispatch(blockUIAction());
    timer(1000)
      .pipe(map(() => unblockUIAction()))
      .subscribe(this.store);
  }
}
