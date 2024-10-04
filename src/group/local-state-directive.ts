import { Directive, EventEmitter, Output } from "@angular/core";

import { Actions } from "../actions";
import { KeyValue } from "../state";
import { NgrxFormDirective } from "./directive";
import { ActionType } from "@ngrx/store";

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: "form[ngrxFormState][ngrxFormsAction]",
})
export class NgrxLocalFormDirective<
  TStateValue extends KeyValue
> extends NgrxFormDirective<TStateValue> {
  @Output() ngrxFormsAction = new EventEmitter<ActionType<Actions>>();

  constructor() {
    super(null);
  }

  protected dispatchAction(action: ActionType<Actions>) {
    this.ngrxFormsAction.emit(action);
  }
}
