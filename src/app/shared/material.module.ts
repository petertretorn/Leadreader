import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckbox, MatCheckboxModule, MatIconModule, MatToolbarModule, MatMenuModule, MatCardModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, MatDialog, MatDialogModule, MatSelectModule, MatSnackBarModule } from '@angular/material'

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule
    
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  declarations: []
})
export class MaterialModule { }
