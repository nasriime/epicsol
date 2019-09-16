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

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts(){
    this.contactsService.getContacts().subscribe(
      (data: any)=>{
        console.log(data);
        // this.contacts = data.contacts;
        // this.filteredContacts = Object.assign([], this.contacts);
      },
      (err: Response) => {
        console.log(err);
      }
    )
  }

  edit(contact){

  }

  remove(id){

  }

  contactSearch(){
    if(!this.query){
        // this.filteredContacts = Object.assign([], this.contacts);
      }
    this.filteredContacts = Object.assign([], this.contacts).filter(
      item => item.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1
    )
  }

}
