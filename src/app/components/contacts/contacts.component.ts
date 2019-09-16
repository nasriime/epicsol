import { Component, OnInit } from '@angular/core';
import { IContact } from './interfaces/contact.interface';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts: Array<IContact>;

  constructor() { }

  ngOnInit() {
  }

  edit(){

  }

  remove(){

  }

  contactSearch(){

  }

}
