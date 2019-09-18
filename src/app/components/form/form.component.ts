import { Component, OnInit, Input } from '@angular/core';
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


  @Input() contactToUpdate: IContact;


  constructor(private formBuilder: FormBuilder, private contactsService: ContactsService) { }

  ngOnInit() {

    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneType: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]]
    //   {
    //     validator: MustMatch('password', 'confirmPassword')
    // }
  });
  }

  get f() { return this.contactForm.controls; }


  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
        return;
    }

    const obj = {
      name: '',
      email: '',
      phones:this.phonesList
    }

    // this.contactsService.addContact(obj).subscribe(
    //   (data: Array<IContact>)=>{
       
    //   },
    //   (err: Response) => {
    //     console.log(err);
    //   }
    // )

    console.log(this.contactForm.value);

  }

  addPhone(){
    const { phoneType, phoneNumber } = this.contactForm.value;
    if(phoneType && phoneNumber){
      const existNumber = this.phonesList.find(phone=> phone.number === phoneNumber);
      if(existNumber.length){
        return
      }
      this.phonesList.push({
        label: phoneType,
        number: phoneNumber
      })
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
