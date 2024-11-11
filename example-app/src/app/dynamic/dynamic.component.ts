import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from "@angular/core";
import { Store } from "@ngrx/store";
import {
  addArrayControlAction,
  FormGroupState,
  NgrxFormsModule,
  removeArrayControlAction,
} from "ngrx-forms";

import {
  createGroupElementAction,
  FormValue,
  removeGroupElementAction,
  State,
} from "./dynamic.reducer";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: "ngf-dynamic",
  templateUrl: "./dynamic.component.html",
  styleUrls: ["./dynamic.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgrxFormsModule, SharedModule],
})
export class DynamicPageComponent {
  private readonly store = inject<Store<State>>(Store);

  protected readonly formState: Signal<FormGroupState<FormValue>> =
    this.store.selectSignal((s) => s.dynamic.formState);

  protected readonly arrayOptions: Signal<number[]> = this.store.selectSignal(
    (s) => s.dynamic.array.options
  );

  protected readonly groupOptions: Signal<string[]> = this.store.selectSignal(
    (s) => s.dynamic.groupOptions
  );

  protected addGroupOption(): void {
    const name = Math.random().toString(36).substr(2, 3);
    this.store.dispatch(createGroupElementAction({ name }));
  }

  protected removeGroupOption(name: string): void {
    this.store.dispatch(removeGroupElementAction({ name }));
  }

  protected addArrayOption(index: number): void {
    const id = this.formState().controls.array.id;
    const action = addArrayControlAction({
      controlId: id,
      value: false,
      index,
    });
    this.store.dispatch(action);
  }

  protected removeArrayOption(index: number): void {
    const id = this.formState().controls.array.id;
    const action = removeArrayControlAction({ controlId: id, index });
    this.store.dispatch(action);
  }
}
