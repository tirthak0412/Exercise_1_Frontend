import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  constructor(public _dialogref: MatDialogRef<UserAddComponent>, private _user: UserService) { }

  addUserForm: FormGroup;

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z ]*'), Validators.minLength(3)]),
      lastname: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z ]*')]),
    })
  }

  onUserAdd() {
    this._user.addData(this.addUserForm.value).subscribe(
      (data: any) => {
        console.log(data);
        this._dialogref.close();
      }
    );
  }

  onReturn() {
    this._dialogref.close();
  }

}
