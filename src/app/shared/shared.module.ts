import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { MessageModule } from 'primeng/message';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProgressBarModule,
    ToggleSwitchModule,
    ToastModule,
    MessageModule,
    AutoCompleteModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
     
    

    
    
    
    
   
  ],
  exports: [
    ProgressBarModule,
    ToastModule,
    ToggleSwitchModule,
    MessageModule,
    AutoCompleteModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    
    
   
  ],
  providers:[MessageModule]
})
export class SharedModule { }
