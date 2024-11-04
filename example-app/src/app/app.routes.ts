import { Routes } from "@angular/router";
import { provideState } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { reducer as arrayReducer } from "./array/array.reducer";
import { reducer as valueConversionReducer } from "./value-conversion/value-conversion.reducer";
import { reducer as syncValidationReducer } from "./sync-validation/sync-validation.reducer";
import { reducer as simpleFormReducer } from "./simple-form/simple-form.reducer";
import { reducer as recursiveUpdateReducer } from "./recursive-update/recursive-update.reducer";
import { reducer as materialReducer } from "./material-example/material.reducer";
import { reducer as dynamicReducer } from "./dynamic/dynamic.reducer";
import { reducer as asyncValidationReducer } from "./async-validation/async-validation.reducer";
import * as asyncValidationEffects from "./async-validation/async-validation.effects";
import * as localStateAdvancedEffects from "./local-state-advanced/local-state-advanced.effects";

export const routes: Routes = [
  { path: "", redirectTo: "/introduction", pathMatch: "full" },
  {
    path: "introduction",
    loadComponent: () =>
      import("./introduction/introduction.component").then(
        (m) => m.IntroductionPageComponent
      ),
  },
  {
    path: "simpleForm",
    loadComponent: () =>
      import("./simple-form/simple-form.component").then(
        (m) => m.SimpleFormPageComponent
      ),
    providers: [provideState("simpleForm", simpleFormReducer)],
  },
  {
    path: "syncValidation",
    loadComponent: () =>
      import("./sync-validation/sync-validation.component").then(
        (m) => m.SyncValidationPageComponent
      ),
    providers: [provideState("syncValidation", syncValidationReducer)],
  },
  {
    path: "asyncValidation",
    loadComponent: () =>
      import("./async-validation/async-validation.component").then(
        (m) => m.AsyncValidationPageComponent
      ),
    providers: [
      provideState("asyncValidation", asyncValidationReducer),
      provideEffects(asyncValidationEffects),
    ],
  },
  {
    path: "array",
    loadComponent: () =>
      import("./array/array.component").then((m) => m.ArrayPageComponent),
    providers: [provideState("array", arrayReducer)],
  },
  {
    path: "dynamic",
    loadComponent: () =>
      import("./dynamic/dynamic.component").then((m) => m.DynamicPageComponent),
    providers: [provideState("dynamic", dynamicReducer)],
  },
  {
    path: "valueBoxing",
    loadChildren: () =>
      import("./value-boxing/value-boxing.module").then(
        (m) => m.ValueBoxingModule
      ),
  },
  {
    path: "valueConversion",
    loadComponent: () =>
      import("./value-conversion/value-conversion.component").then(
        (m) => m.ValueConversionPageComponent
      ),
    providers: [provideState("valueConversion", valueConversionReducer)],
  },
  {
    path: "recursiveUpdate",
    loadComponent: () =>
      import("./recursive-update/recursive-update.component").then(
        (m) => m.RecursiveUpdatePageComponent
      ),
    providers: [provideState("recursiveUpdate", recursiveUpdateReducer)],
  },
  {
    path: "material",
    loadComponent: () =>
      import("./material-example/material.component").then(
        (m) => m.DynamicPageComponent
      ),

    providers: [provideState("material", materialReducer)],
  },
  {
    path: "localStateIntroduction",
    loadComponent: () =>
      import(
        "./local-state-introduction/local-state-introduction.component"
      ).then((m) => m.LocalStateIntroductionComponent),
  },
  {
    path: "localStateAdvanced",
    loadComponent: () =>
      import("./local-state-advanced/local-state-advanced.component").then(
        (m) => m.LocalStateAdvancedComponent
      ),
    providers: [
      // Notice that StoreModule.forFeature is not included here!
      // @todo: try not proving effects here
      provideEffects(localStateAdvancedEffects),
    ],
  },
  { path: "**", redirectTo: "/introduction" },
];
