import { NgModule } from '@angular/core';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
    AutoCompleteComponent
  ],
  entryComponents: [],
  providers: [],
  exports: [
    AutoCompleteComponent
  ]
})
export class ComponentsModule { }
