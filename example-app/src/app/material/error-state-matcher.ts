import { Directive, inject, Input } from "@angular/core";
import { MatLegacyChipList as MatChipList } from "@angular/material/legacy-chips";
import { MatLegacyInput as MatInput } from "@angular/material/legacy-input";
import { MatLegacySelect as MatSelect } from "@angular/material/legacy-select";
import { FormControlState } from "ngrx-forms";

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: "[ngrxFormControlState]",
})
export class CustomErrorStateMatcherDirective {
  @Input() set ngrxFormControlState(state: FormControlState<any>) {
    const errorsAreShown =
      state.isInvalid && (state.isTouched || state.isSubmitted);

    if (this.input) {
      this.input.errorState = errorsAreShown;
      this.input.stateChanges.next();
    }

    if (this.select) {
      this.select.errorState = errorsAreShown;
      this.select.stateChanges.next();
    }

    if (this.chipList) {
      this.chipList.errorState = errorsAreShown;
      this.chipList.stateChanges.next();
    }
  }

  private readonly input = inject(MatInput, { optional: true, host: true });
  private readonly select = inject(MatSelect, { optional: true, host: true });
  private readonly chipList = inject(MatChipList, {
    optional: true,
    host: true,
  });
}
