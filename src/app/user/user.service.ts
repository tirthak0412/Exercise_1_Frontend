import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }
  url:string="http://localhost:3000/api/user/";

  getAllData(){
    return this._http.get(this.url);
  }
  deleteData(id){
    return this._http.delete(this.url+id);
  }
  rederData(item){
    console.log(item);
    let header=new HttpHeaders().set('Content-type','application/json');
    return  this._http.post(this.url+'many',item,{headers:header});
  }
  addData(item){
    console.log(item);
    let header=new HttpHeaders().set('Content-type','application/json');
    return this._http.post(this.url,item,{headers:header});
  }
  getById(id){
    return this._http.get(this.url+id);
  }
  updateData(id,item){
    let header=new HttpHeaders().set('Content-type','application/json');
    return this._http.put(this.url+id,item,{headers:header});
  }
}
