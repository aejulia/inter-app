import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeapSortComponent } from './heap-sort/heap-sort.component';



@NgModule({
  declarations: [
    HeapSortComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AppModule { }
