import { Directive, inject, Input } from "@angular/core";
import { MatChipGrid } from "@angular/material/chips";
import { MatInput } from "@angular/material/input";
import { MatSelect } from "@angular/material/select";
import { FormControlState } from "ngrx-forms";

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: "[ngrxFormControlState]",
  standalone: true,
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

    if (this.chipGrid) {
      this.chipGrid.errorState = errorsAreShown;
      this.chipGrid.stateChanges.next();
    }
  }

  private readonly input = inject(MatInput, { optional: true, host: true });
  private readonly select = inject(MatSelect, { optional: true, host: true });
  private readonly chipGrid = inject(MatChipGrid, {
    optional: true,
    host: true,
  });
}
