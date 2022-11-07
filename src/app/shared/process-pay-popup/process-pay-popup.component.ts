import { Component, OnInit, NgModule } from '@angular/core';


import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PackageService } from 'src/app/services/package.service';
import { RazorpayService } from 'src/app/services/razorpay.service';

//import { FormsModule } from '@angular/forms';

declare var Razorpay: any;

@Component({
  selector: 'app-process-pay-popup',
  templateUrl: './process-pay-popup.component.html',
  styleUrls: ['./process-pay-popup.component.scss']
})
export class ProcessPayPopupComponent implements OnInit {

  isBtnshow: boolean = false;
  messageSuccess: boolean = true;
  showsuccess = false;
  calculationpopup = true;
  packagecalculation: any = [];
  paymentId: any = '';
  createorder: any = [];
  ordercreated: any = [];
  transactionId: any;
  coupenCode:any='';
  coupenDiscount:any ='';
  errorMessage:boolean = false;
  errorText:any=''
  appliedCoupon:any='No';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router: Router, public packagelistService: PackageService, public razorpayService: RazorpayService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.messageSuccess = false;
    }, 3000);

    this.packagelistService.packagecalculation({'packageId':this.data.packageId, 'couponCode':''}).subscribe((data: any) => {
      this.packagecalculation = data;
    });

  }

  options = {
    "key": "rzp_test_fFpNRANlmYYKaj",
    "amount": '',
    "currency": "INR",
    "name": "ONEGODMED",
    "description": "Test Transaction",
    "handler": (res: any = []) => {
      this.paymentId = res.razorpay_payment_id;
      this.success(this.paymentId);
    },
    "prefill": {
      "package_amount": "",
      "package_name": "SAM",
      "gst": "",
      "package_talktime": ""
      // "email":"sam@gmail.com",
      // "contact":"1234567890"
    }
  };

  pay() {
    this.createorder = [
      {
        amount: (<HTMLInputElement>document.getElementById("totalamount")).value,
        package_name: 'PACKAGE',
        package_amount: (<HTMLInputElement>document.getElementById("packageamount")).value,
        talktime_value: (<HTMLInputElement>document.getElementById("talktime")).value,
        gst: (<HTMLInputElement>document.getElementById("gst")).value,
        applyCoupon: this.appliedCoupon,
        coupon_code: this.coupenCode,
        coupon_discount: this.coupenDiscount,
      }
    ];
    this.razorpayService.createorder(this.createorder).subscribe((data: any) => {
      this.ordercreated = data;
      if (this.ordercreated.Transaction_id != null) {
        var amount = Number((<HTMLInputElement>document.getElementById("totalamount")).value) * 100;
        this.options.amount = amount.toString();
        this.options.prefill.package_amount = (<HTMLInputElement>document.getElementById("packageamount")).value;
        this.options.prefill.package_talktime = (<HTMLInputElement>document.getElementById("talktime")).value;
        this.options.prefill.gst = (<HTMLInputElement>document.getElementById("gst")).value;
        this.transactionId = this.ordercreated.Transaction_id;
        var razorpay = new Razorpay(this.options);
        razorpay.open();
        razorpay.on('payment.failed', (response: any) => {
          this.failed(response.error.metadata.payment_id);
        });
      } else {
        $('#calulationpopup').css('display', 'none');
        $('#failed').css('display', 'block');
      }
    });
  }

  success(paymentId: any) {
    this.razorpayService.paymentsuccess(this.transactionId, paymentId, 'Success').subscribe((data: any) => {
      $('#calulationpopup').css('display', 'none');
      $('#success').css('display', 'block');
      (<HTMLInputElement>document.getElementById("paymentId")).innerHTML = 'ID: '+paymentId
    });
    this.paymentId = paymentId;
  }

  failed(paymentId: any) {
    alert('failed');
    this.razorpayService.paymentsuccess(this.transactionId, paymentId, 'Failed').subscribe((data: any) => {
      $('#calulationpopup').css('display', 'none');
      $('#failed').css('display', 'block');
    });
  }

  toggleBtnshow() {
    this.isBtnshow = !this.isBtnshow;
  }

  applyCoupon(){
     var couponCode = (<HTMLInputElement>document.getElementById("couponCode")).value;
     this.packagelistService.checkCoupon({'token': localStorage.getItem('token'), 'coupon_code':couponCode, 'package_value':this.packagecalculation.data.packageAmount }).subscribe((data: any) => {
     if(data.status){
       this.appliedCoupon='Yes';
       this.coupenCode = couponCode;
       this.errorMessage = false;
          this.packagelistService.packagecalculation({'packageId':this.data.packageId, 'couponCode':couponCode }).subscribe((data: any) => {
            if(data.status){
              this.appliedCoupon='Yes';
              this.coupenCode = couponCode;
              this.coupenDiscount = data.coupon_disc;
              this.packagecalculation = data;
            }else{
              this.appliedCoupon='No';
              this.coupenCode = '';
              this.coupenDiscount = '';
              this.errorMessage = true;
              this.errorText  = data.message;
            }
        });

     }else{
      this.appliedCoupon='No';
      this.coupenCode = '';
      this.coupenDiscount = '';
      this.errorMessage = true;
      this.errorText  = data.message;
      this.packagelistService.packagecalculation({'packageId':this.data.packageId, 'couponCode':''}).subscribe((data: any) => {
        this.packagecalculation = data;
      });
     }
 
    });
     
   }

}
