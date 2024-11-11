import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Action, ActionsSubject, ActionType } from "@ngrx/store";
import { Actions, NgrxFormsModule, setValueAction } from "ngrx-forms";

import {
  getManufacturersAction,
  INITIAL_LOCAL_STATE,
  reducer,
} from "./local-state-advanced.reducer";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: "ngf-local-state-advanced",
  templateUrl: "./local-state-advanced.component.html",
  styleUrls: ["./local-state-advanced.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgrxFormsModule, SharedModule],
})
export class LocalStateAdvancedComponent implements OnInit {
  protected readonly localState = signal(INITIAL_LOCAL_STATE);

  private readonly actionsSubject = inject(ActionsSubject);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.actionsSubject
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((action) => {
        this.updateState(action);
      });
  }

  protected handleFormAction(action: ActionType<Actions>) {
    this.updateState(action);

    // trigger loading of new manufacturers list in effect
    if (
      action.type === setValueAction.type &&
      action.controlId === this.localState().formState.controls.countryCode.id
    ) {
      this.actionsSubject.next(
        // todo: can be better typed?
        getManufacturersAction({ countryCode: action.value as string })
      );
    }
  }

  private updateState(action: Action): void {
    const localState = reducer(this.localState(), action);
    if (localState !== this.localState()) {
      this.localState.set(localState);
    }
  }
}
