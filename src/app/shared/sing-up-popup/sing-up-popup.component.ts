import { Component, OnInit } from '@angular/core';

var $ : any;

@Component({
  selector: 'app-sing-up-popup',
  templateUrl: './sing-up-popup.component.html',
  styleUrls: ['./sing-up-popup.component.scss']
})


export class SingUpPopupComponent implements OnInit {

  
  LodingPopup: boolean = false;

  constructor() { 
    
  }
 
  ngOnInit(): void {


    // $(document).ready(() => {
    //   $('#otpusername').keypress((e : any) => {
    //        if (e.which === 13) {
    //            var index = $('#otpusername').index(this) + 1;
    //            $('#otpusername').eq(index).focus();
    //            console.log()
    //        }
    //    });
    // });


  }

}
