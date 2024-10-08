import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { select, Store } from "@ngrx/store";
import {
  addArrayControlAction,
  FormGroupState,
  removeArrayControlAction,
} from "ngrx-forms";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import {
  createGroupElementAction,
  FormValue,
  removeGroupElementAction,
  State,
} from "./dynamic.reducer";

@Component({
  selector: "ngf-dynamic",
  templateUrl: "./dynamic.component.html",
  styleUrls: ["./dynamic.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPageComponent {
  private readonly store = inject<Store<State>>(Store);

  protected readonly formState$: Observable<FormGroupState<FormValue>> =
    this.store.pipe(select((s) => s.dynamic.formState));

  protected readonly arrayOptions$: Observable<number[]> = this.store.pipe(
    select((s) => s.dynamic.array.options)
  );

  protected readonly groupOptions$: Observable<string[]> = this.store.pipe(
    select((s) => s.dynamic.groupOptions)
  );

  protected addGroupOption(): void {
    const name = Math.random().toString(36).substr(2, 3);
    this.store.dispatch(createGroupElementAction({ name }));
  }

  protected removeGroupOption(name: string): void {
    this.store.dispatch(removeGroupElementAction({ name }));
  }

  protected addArrayOption(index: number): void {
    this.formState$
      .pipe(
        take(1),
        map((s) => s.controls.array.id),
        map((id) =>
          addArrayControlAction({ controlId: id, value: false, index })
        )
      )
      .subscribe(this.store);
  }

  protected removeArrayOption(index: number): void {
    this.formState$
      .pipe(
        take(1),
        map((s) => s.controls.array.id),
        map((id) => removeArrayControlAction({ controlId: id, index }))
      )
      .subscribe(this.store);
  }

  protected trackByIndex(index: number): number {
    return index;
  }

  protected trackById(_: number, id: string): string {
    return id;
  }
}
