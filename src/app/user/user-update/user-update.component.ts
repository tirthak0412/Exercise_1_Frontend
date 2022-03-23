import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  constructor(public _dialogref: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _User: UserService) { }

  _id: string;
  updateUserForm: FormGroup;

  ngOnInit(): void {
    this._id = this.data;

    this.updateUserForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z ]*'), Validators.minLength(3)]),
      lastname: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z ]*')]),
    })
    this._User.getById(this._id).subscribe(
      (data: any) => {
        console.log(data);
        this.formDataBind(data);
      }
    );
  }

  formDataBind(item: any) {
    this.updateUserForm.patchValue({
      firstname: item.firstname,
      lastname: item.lastname
    })
  }

  onUserUpdate() {
    this._User.updateData(this._id, this.updateUserForm.value).subscribe(
      (data: any) => {
        console.log(data);
        this._dialogref.close();
      }
    )
  }

  onReturn() {
    this._dialogref.close();
  }

}
