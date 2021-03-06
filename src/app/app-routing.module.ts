import { CommunityComponent } from './components/community/community.component';
import { MobileUserComponent } from './components/mobile-user/mobile-user.component';
import { ReadingsResolver } from "./utils/readings.resolver";
import { WelcomeGuard } from "./services/welcome.guard";
import { ReadingsComponent } from "./components/readings/readings.component";
import { AppShellComponent } from "./components/app-shell/app-shell.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookSearchComponent } from "./components/book-search/book-search.component";
import { ReadingDetailComponent } from "./components/reading-detail/reading-detail.component";

const routes: Routes = [
  {
    path: "app",
    component: AppShellComponent,
    children: [
      {
        path: "home",
        redirectTo: 'community'
      },
      {
        path: "community",
        component: CommunityComponent
      },
      {
        path: "profile",
        component: MobileUserComponent
      },
      {
        path: "search-book",
        component: BookSearchComponent
      },
      {
        path: "readings/:userId",
        component: ReadingsComponent,
        // resolve: { readings : ReadingsResolver }
      },
      {
        path: "reading-detail/:id",
        component: ReadingDetailComponent
      }
    ]
  },
  { path: "welcome", component: WelcomeComponent, canActivate: [WelcomeGuard] },
  { path: "**", redirectTo: "/welcome" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
