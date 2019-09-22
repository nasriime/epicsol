import { Component, OnInit } from '@angular/core';
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
  addedContact;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.currentAddedContact.subscribe( (contact: IContact) => {
      if(this.filteredContacts){
          const existContact = this.filteredContacts.findIndex( item => item.id === contact.id );
          if(existContact > -1){
            return this.filteredContacts[existContact] = contact;
          }
          this.filteredContacts.push(contact);
      }
    });
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
    this.contactsService.changeContactToEdit(contact);
  }

  remove(id){
    this.contactsService.deleteContact(id).subscribe(
      (data: any)=>{
        this.filteredContacts =  Object.assign([], this.contacts).filter(contact=> contact.id !== id);
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
