import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { PaymentService } from 'src/app/services/payment.service';
import { CreditCard } from 'src/app/model/credit-card';


function dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  let selectedDate;
  const d = new Date();
  const todayDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  if (control.value !== null && control.value !== '') {
    selectedDate = new Date(control.value.year, (control.value.month - 1), control.value.day);
    if (todayDate.getTime() > selectedDate.getTime()) {
      return { dateValidatorError: true };
    }
  }
  return null;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  creditCardForm = new FormGroup({
    creditCardNumber: new FormControl('', Validators.required),
    creditHolder: new FormControl('', Validators.required),
    expirationDate: new FormControl('', [Validators.required, dateValidator]),
    securityCode: new FormControl('', [Validators.minLength(3), Validators.maxLength(3)]),
    amount: new FormControl(0, [Validators.required, Validators.min(1)])
  });

  constructor(
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {

  }

  onSubmit(event) {
    event.preventDefault();
    const ngbDate = this.creditCardForm.controls['expirationDate'].value;
    const myDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    let formValue = this.creditCardForm.value;
    formValue['expirationDate'] = myDate.toISOString();
    this.paymentService.makePayment(formValue).subscribe((result) => {
      alert(result['error']['text']);
    }, (error) => {
      alert(error['error']['text']);
    });
    this.creditCardForm.reset();
  }

}
