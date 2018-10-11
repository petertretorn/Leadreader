import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckbox, MatCheckboxModule, MatIconModule, MatToolbarModule, MatMenuModule, MatCardModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, MatDialog, MatDialogModule } from '@angular/material'

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
    MatDialogModule
    
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
    MatDialogModule
  ],
  declarations: []
})
export class MaterialModule { }
