import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  getContacts(){
    return this.http.get('http://localhost:4000/contacts');
  }

  addContact(contact){
    return this.http.post('http://localhost:4000/contacts', contact);
  }

  updateContact(contact){
    return this.http.put(`http://localhost:4000/contacts/${contact.id}`, contact);
  }


  deleteContact(id){
    return this.http.delete(`http://localhost:4000/contacts/${id}`);
  }
}
