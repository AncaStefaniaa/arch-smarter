import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CheckTutorial } from "./providers/check-tutorial.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "app/tabs/over-time",
    pathMatch: "full",
  },
  {
    path: "account",
    loadChildren: () =>
      import("./pages/account/account.module").then((m) => m.AccountModule),
  },
  {
    path: "support",
    loadChildren: () =>
      import("./pages/support/support.module").then((m) => m.SupportModule),
  },
  {
    path: "see-feedback",
    loadChildren: () =>
      import("./pages/see-feedback/see-feedback.module").then(
        (m) => m.SeeFeedbackModule
      ),
  },
  {
    path: "top",
    loadChildren: () =>
      import("./pages/top/top.module").then((m) => m.TopModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./pages/signup/signup.module").then((m) => m.SignUpModule),
  },
  {
    path: "app",
    loadChildren: () =>
      import("./pages/tabs-page/tabs-page.module").then((m) => m.TabsModule),
  },
  {
    path: "tutorial",
    loadChildren: () =>
      import("./pages/tutorial/tutorial.module").then((m) => m.TutorialModule),
    canLoad: [CheckTutorial],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
