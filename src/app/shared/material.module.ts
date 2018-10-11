import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckbox, MatCheckboxModule, MatIconModule, MatToolbarModule, MatMenuModule, MatCardModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule } from '@angular/material'

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
    MatProgressSpinnerModule
    
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
    MatProgressSpinnerModule
  ],
  declarations: []
})
export class MaterialModule { }
