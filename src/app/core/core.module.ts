import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MessageModule
  ],
  providers:[MessageModule]
})
export class CoreModule { }
