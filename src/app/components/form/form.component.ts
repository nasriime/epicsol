import { Component, OnInit, Input } from '@angular/core';
import { IContact } from '../contacts/interfaces/contact.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  add: boolean = true;
  @Input() contactToUpdate: IContact;


  constructor() { }

  ngOnInit() {
  }

  submitContact(){

  }

  editContact(){

  }

  cancelEdit(){

  }
}
