import { UserComponent } from './components/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { ReadingsComponent } from './components/readings/readings.component';
import { ReadingDetailComponent } from './components/reading-detail/reading-detail.component';
import { NoteDialogComponent } from './components/note-dialog/note-dialog.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { DefaultValuePipe } from './default-value.pipe';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ReadingsListComponent } from './components/readings-list/readings-list.component';
import { MobileUserComponent } from './components/mobile-user/mobile-user.component';
import { CommunityComponent } from './components/community/community.component';
import { ReaderCardComponent } from './components/reader-card/reader-card.component';
import { DynamicTextareaDirective } from './utils/dynamic-textarea.directive';
import { QuoteNoteComponent } from './components/quote-note/quote-note.component';
import { BookDialogComponent } from './components/book-dialog/book-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BookSearchComponent,
    WelcomeComponent,
    AppShellComponent,
    ReadingsComponent,
    ReadingDetailComponent,
    NoteDialogComponent,
    UserDialogComponent,
    DefaultValuePipe,
    UserComponent,
    ReadingsListComponent,
    MobileUserComponent,
    CommunityComponent,
    ReaderCardComponent,
    DynamicTextareaDirective,
    QuoteNoteComponent,
    BookDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    EditorModule
  ],
  entryComponents: [
    NoteDialogComponent,
    UserDialogComponent,
    BookDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
