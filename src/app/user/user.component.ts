import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Userdata } from './user';
import { UserAddComponent } from './user-add/user-add.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private _user: UserService, private _dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  dataSource: MatTableDataSource<Userdata>
  displayedColumns: string[] = ['firstname', 'lastname', 'action']

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  user_tbl: Userdata[];

  ngOnInit(): void {
    this._user.getAllData().subscribe(
      (data: Userdata[]) => {
        this.user_tbl = data;
        console.log(this.user_tbl);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  onDelete(item: Userdata) {
    console.log(item);
    if (confirm("Are You Sure You Want To Delete?")) {
      this._user.deleteData(item._id).subscribe(
        (data: any[]) => {
          this.user_tbl.splice(this.user_tbl.indexOf(item), 1);
          this.dataSource.data = this.user_tbl;
          alert("Record is deleted");
        }
      );
    }
  }

  onRenderRecord() {
    let records = [
      { firstname: "Kalpesh", lastname: "shah" },
      { firstname: "Heena", lastname: "shah" },
      { firstname: "Panthak", lastname: "shah" },
      { firstname: "Tirthak", lastname: "shah" },
      { firstname: "Palak", lastname: "shah" },
      { firstname: "Aayush", lastname: "Raval" },
      { firstname: "jayesh", lastname: "Shah" },
      { firstname: "Megha", lastname: "Shah" },
      { firstname: "Savan", lastname: "Shah" },
      { firstname: "Haresh", lastname: "Shah" },
      { firstname: "Henal", lastname: "Shah" },
    ]
    let data = {
      users: records
    };
    this._user.rederData(data).subscribe(
      (data: Userdata[]) => {
        this.user_tbl = data;
        console.log(this.user_tbl);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  onAddRecord() {
    this._dialog.open(UserAddComponent, {}).afterClosed()
      .subscribe(
        (data: any) => {
          this._user.getAllData().subscribe(
            (data: Userdata[]) => {
              this.user_tbl = data;
              console.log(this.user_tbl);
              this.dataSource.data = data;
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          );
        }
      )
  }

  onEdit(row) {
    this._dialog.open(UserUpdateComponent, { data: row._id }).afterClosed().subscribe(
      (data: any) => {
        this._user.getAllData().subscribe(
          (data: Userdata[]) => {
            this.user_tbl = data;
            console.log(this.user_tbl);
            this.dataSource.data = data;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        );
      }
    )
  }

}
