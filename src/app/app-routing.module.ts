import { AppShellComponent } from './components/app-shell/app-shell.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookSearchComponent } from './components/book-search/book-search.component';

const routes: Routes = [
  { 
    path: 'app', 
    component: AppShellComponent,
    children: [
      { path: 'search-book', component: BookSearchComponent },    
    ]
  },
  { path: 'welcome', component: WelcomeComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
