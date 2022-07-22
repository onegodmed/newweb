import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageService } from '../../services/package.service';
import { RazorpayService } from '../../services/razorpay.service';

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
  paymentId: any;
  createorder: any = [];
  ordercreated: any = [];
  transactionId: any;

  constructor(private router: Router, public packagelistService: PackageService, public razorpayService: RazorpayService) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.messageSuccess = false;
    }, 3000);

    this.packagelistService.packagecalculation().subscribe((data: any) => {
      this.packagecalculation = data;
    });

  }

  options = {
    "key": "rzp_live_tQVtoSnbH9idrB",
    "amount": "",
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
    }
  };

  pay() {
    this.createorder = [
      {
        amount: (<HTMLInputElement>document.getElementById("totalamount")).value,
        package_name: 'PACKAGE',
        package_amount: (<HTMLInputElement>document.getElementById("packageamount")).value,
        talktime_value: (<HTMLInputElement>document.getElementById("talktime")).value,
        gst: (<HTMLInputElement>document.getElementById("gst")).value
      }
    ];
    this.razorpayService.createorder(this.createorder).subscribe((data: any) => {
      this.ordercreated = data;
      if (this.ordercreated.Transaction_id != null) {
        this.options.amount = '100';//(<HTMLInputElement>document.getElementById("totalamount")).value;
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
    alert('success');
    this.razorpayService.paymentsuccess(this.transactionId, paymentId, 'Success').subscribe((data: any) => {
      $('#calulationpopup').css('display', 'none');
      $('#success').css('display', 'block');
    });
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


}
