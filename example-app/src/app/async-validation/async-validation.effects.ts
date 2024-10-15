import { HttpClient } from "@angular/common/http";
import { createEffect } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import {
  clearAsyncErrorAction,
  setAsyncErrorAction,
  startAsyncValidationAction,
} from "ngrx-forms";
import { concat, timer } from "rxjs";
import {
  catchError,
  distinct,
  filter,
  map,
  mergeMap,
  switchMap,
} from "rxjs/operators";

import { setSearchResultAction, State } from "./async-validation.reducer";
import { inject } from "@angular/core";

export const searchBooksEffect = createEffect(
  (store = inject<Store<State>>(Store), httpClient = inject(HttpClient)) =>
    store.pipe(
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
          httpClient
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
    ),
  { functional: true }
);
