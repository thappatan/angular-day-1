import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-my-button',
  templateUrl: './my-button.component.html',
  styleUrl: './my-button.component.scss'
})
export class MyButtonComponent {
  @Input() buttonText: string = "";
  @Input() disable: boolean = false;
  @Input() color: string = "";

  @Output() onSubmit = new EventEmitter<boolean>();
  
  buttonSubmit(){
    this.onSubmit.emit(true);
  }
}
