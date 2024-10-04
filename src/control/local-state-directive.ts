import { DOCUMENT } from "@angular/common";
import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Optional,
  Output,
  Self,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { Actions } from "../actions";
import {
  FormViewAdapter,
  NGRX_FORM_VIEW_ADAPTER,
} from "../view-adapter/view-adapter";
import { Document, NgrxFormControlDirective } from "./directive";
import { ActionType } from "@ngrx/store";

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: "[ngrxFormControlState][ngrxFormsAction]",
})
export class NgrxLocalFormControlDirective<
  TStateValue,
  TViewValue = TStateValue
> extends NgrxFormControlDirective<TStateValue, TViewValue> {
  @Output() ngrxFormsAction = new EventEmitter<ActionType<Actions>>();

  constructor(
    el: ElementRef,
    @Optional() @Inject(DOCUMENT) dom: Document | null,
    @Self()
    @Optional()
    @Inject(NGRX_FORM_VIEW_ADAPTER)
    viewAdapters: FormViewAdapter[],
    @Self()
    @Optional()
    @Inject(NG_VALUE_ACCESSOR)
    valueAccessors: ControlValueAccessor[]
  ) {
    super(el, dom, null, viewAdapters, valueAccessors);
  }

  protected dispatchAction(action: ActionType<Actions>) {
    this.ngrxFormsAction.emit(action);
  }
}
