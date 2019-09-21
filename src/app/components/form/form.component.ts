import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from "../../services/contacts.service";
import { IContact } from '../contacts/interfaces/contact.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  add: boolean = true;
  model: any = {};
  phoneTypes: string[] = ['Home', 'Mobile', 'Work'];
  phonesList =[];

  // @Input() contactToUpdate: IContact;
  // @Output() contactChange = new EventEmitter<IContact>();


  constructor(private formBuilder: FormBuilder, private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneType: ['Home'],
      phoneNumber: ['', [Validators.minLength(6),Validators.pattern(/^[0-9]+$/)]]
    });
  }

  get f() { return this.contactForm.controls; }


  onSubmit(){
    this.submitted = true;
    let { name, email } = this.contactForm.value;

    if (this.contactForm.invalid) {
        return;
    }

    const obj = {
      name,
      email,
      phones:this.phonesList
    }

    this.contactsService.addContact(obj).subscribe(
      (data: Array<IContact>)=>{
       console.log(data);
      },
      (err: Response) => {
        console.log(err);
      }
    )

  }

  addPhone(){
    let { phoneType, phoneNumber } = this.contactForm.value;
    if(phoneType && phoneNumber){
      const existNumber = this.phonesList.find(phone=> phone.number === phoneNumber);
      if(existNumber){
        return
      }

      this.phonesList.push({
        label: phoneType,
        number: phoneNumber
      });
      this.contactForm.get('phoneNumber').reset();
    }
  }

  removePhone(item){
    this.phonesList = this.phonesList.filter(phone=> phone.number != item.number);
  }

  editContact(){

  }

  cancelEdit(){

  }
}
