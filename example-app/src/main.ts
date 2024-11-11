import { enableProdMode } from "@angular/core";

import { environment } from "./environments/environment";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouterStore, RouterStateSerializer } from "@ngrx/router-store";
import { CustomRouterStateSerializer } from "./app/shared/utils";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideStore } from "@ngrx/store";
import { provideNativeDateAdapter } from "@angular/material/core";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes),
    provideStore(),
    provideRouterStore(),
    provideStoreDevtools({
      logOnly: environment.production,
      connectInZone: true,
    }),
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    provideNativeDateAdapter(),
  ],
}).catch((err) => console.log(err));
