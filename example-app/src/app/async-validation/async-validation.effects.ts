import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import {
  clearAsyncErrorAction,
  setAsyncErrorAction,
  startAsyncValidationAction,
} from "ngrx-forms";
import { concat, Observable, timer } from "rxjs";
import {
  catchError,
  distinct,
  filter,
  map,
  mergeMap,
  switchMap,
} from "rxjs/operators";

import { setSearchResultAction, State } from "./async-validation.reducer";

@Injectable()
export class AsyncValidationEffects {
  searchBooks$: Observable<Action> = createEffect(() =>
    this.store.pipe(
      select((s) => s.asyncValidation.formState),
      filter(
        (fs) =>
          !!fs.value.searchTerm && fs.controls.numberOfResultsToShow.isValid
      ),
      distinct((fs) => fs.value),
      switchMap((fs) =>
        concat(
          timer(300).pipe(
            map(() =>
              startAsyncValidationAction({
                controlId: fs.controls.searchTerm.id,
                name: "exists",
              })
            )
          ),
          this.httpClient
            .get(`https://www.googleapis.com/books/v1/volumes`, {
              params: {
                q: fs.value.searchTerm,
                maxResults: `${fs.value.numberOfResultsToShow}`,
              },
            })
            .pipe(
              mergeMap((resp: any) => {
                if (resp.totalItems > 0) {
                  return [
                    setSearchResultAction({
                      results: resp.items.map((i: any) => i.volumeInfo.title),
                    }),
                    clearAsyncErrorAction({
                      controlId: fs.controls.searchTerm.id,
                      name: "exists",
                    }),
                  ] as Action[];
                }

                return [
                  setSearchResultAction({ results: [] }),
                  setAsyncErrorAction({
                    controlId: fs.controls.searchTerm.id,
                    name: "exists",
                    value: fs.value.searchTerm,
                  }),
                ];
              }),
              catchError((_) => [
                setSearchResultAction({ results: [] }),
                setAsyncErrorAction({
                  controlId: fs.controls.searchTerm.id,
                  name: "exists",
                  value: fs.value.searchTerm,
                }),
              ])
            )
        )
      )
    )
  );

  constructor(private store: Store<State>, private httpClient: HttpClient) {}
}
