import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ContactsService } from "../../services/contacts.service";
import { IContact } from './interfaces/contact.interface';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts: Array<IContact>;
  filteredContacts: Array<IContact>;
  query: string;
  @Output() contactChange = new EventEmitter<IContact>();

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts(){
    this.contactsService.getContacts().subscribe(
      (data: Array<IContact>)=>{
        this.contacts = data;
        this.filteredContacts = Object.assign([], this.contacts);
      },
      (err: Response) => {
        console.log(err);
      }
    )
  }

  edit(contact){
    this.contactChange.emit(contact);
  }

  remove(id){
    this.contactsService.deleteContact(id).subscribe(
      (data: any)=>{
        console.log(data);
      },
      (err: Response) => {
        console.log(err);
      }
    )
  }

  contactSearch(){
    if(!this.query){
        this.filteredContacts = Object.assign([], this.contacts);
      }
    this.filteredContacts = Object.assign([], this.contacts).filter(
      item => item.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1
    )
  }

}
