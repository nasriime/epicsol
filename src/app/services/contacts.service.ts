import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IContact } from '../components/contacts/interfaces/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private addedContact = new BehaviorSubject({
    name: '',
    email: '',
    phones:[
      {
        label : '',
        number: null
      }
    ]
  });
  currentAddedContact = this.addedContact.asObservable();

  private contactToEdit = new BehaviorSubject({
    name: '',
    email: '',
    phones:[
      {
        label : '',
        number: null
      }
    ]
  });
  currentContactToEdit = this.contactToEdit.asObservable();

  constructor(private http: HttpClient) { }

  changeAddedContact(contact: IContact) {
    this.addedContact.next(contact)
  }

  changeContactToEdit(contact: IContact) {
    this.contactToEdit.next(contact)
  }

  getContacts(){
    return this.http.get('http://localhost:4000/contacts');
  }

  addContact(contact){
    return this.http.post('http://localhost:4000/contacts', contact);
  }

  updateContact(id, contact){
    return this.http.put(`http://localhost:4000/contacts/${id}`, contact);
  }

  deleteContact(id){
    return this.http.delete(`http://localhost:4000/contacts/${id}`);
  }
}
