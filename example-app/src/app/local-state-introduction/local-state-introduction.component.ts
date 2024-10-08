import { Component } from "@angular/core";
import { Actions } from "ngrx-forms";

import {
  INITIAL_FORM_STATE,
  reducer,
} from "./local-state-introduction.reducer";
import { ActionType } from "@ngrx/store";

@Component({
  selector: "ngf-local-state-introduction",
  templateUrl: "./local-state-introduction.component.html",
  styleUrls: ["./local-state-introduction.component.scss"],
})
export class LocalStateIntroductionComponent {
  protected formState = INITIAL_FORM_STATE;

  protected handleFormAction(action: ActionType<Actions>) {
    this.formState = reducer(this.formState, action);
  }
}
