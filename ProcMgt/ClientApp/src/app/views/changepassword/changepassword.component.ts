import { Component, OnInit } from '@angular/core';
import { Changepassword } from '../../models/changepassword';
import { UseraccountService } from '../../services/useraccount.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  private objchangePw: Changepassword;
  public message: string;

  constructor(private useraccountService: UseraccountService) { }

  ngOnInit() {
    this.objchangePw = new Changepassword();
    this.objchangePw.currentPw = "";
    this.objchangePw.Password = "";
    this.objchangePw.confirmPw = "";
    var UserDet = JSON.parse(localStorage.getItem("UserDetails"));
    this.objchangePw.userID = UserDet.userId;

  }

  SavePassword() {
    if (this.objchangePw.currentPw == "" || this.objchangePw.Password == "" || this.objchangePw.confirmPw == "") {
      alert('Please fill the mandatory fields');
      return false;
    }

    if (this.objchangePw.Password == this.objchangePw.confirmPw) {
      this.useraccountService.changePW(this.objchangePw)
        .subscribe(Response => {
          //console.log("aaaa=>", Response);
          var result = Response.message;
          //console.log(result);
          alert(result);
          this.objchangePw.confirmPw = "";
          this.objchangePw.currentPw = "";
          this.objchangePw.Password = "";
          this.message = "";
        }, err => {
          alert('The record has been saved successfully');
          this.objchangePw.confirmPw = "";
          this.objchangePw.currentPw = "";
          this.objchangePw.Password = "";
          this.message = "";
        });

      
      return true;
    }
    else {
      this.message = 'Password Mismatch';
      this.objchangePw.confirmPw = "";
      this.objchangePw.currentPw = "";
      this.objchangePw.Password = "";
      return false;
    }

    

    //this.useraccountService.changePW(this.objchangePw)
    //  .subscribe(response => {
    //    alert('in');
    //  }, err => {
    //    alert('in-Error - c');
    //  });
    
  }

  reset() {
    this.objchangePw.confirmPw = "";
    this.objchangePw.currentPw = "";
    this.objchangePw.Password = "";
    this.message = "";
  }

}
