import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { debounceTime, delay, map } from "rxjs/operators";

import {
  getManufacturersAction,
  setManufacturersAction,
} from "./local-state-advanced.reducer";

@Injectable()
export class LocalStateAdvancedEffects {
  readonly getManufacturers$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getManufacturersAction),
      debounceTime(300),
      delay(1000),
      map((action) => {
        if (action.countryCode === "US") {
          return setManufacturersAction({
            manufacturers: ["Ford", "Chevrolet"],
          });
        } else if (action.countryCode === "UK") {
          return setManufacturersAction({
            manufacturers: ["Aston Martin", "Jaguar"],
          });
        } else {
          return setManufacturersAction({ manufacturers: [] });
        }
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
