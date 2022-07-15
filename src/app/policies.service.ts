import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Policies} from './policies'
@Injectable({
  providedIn: 'root'
})
export class PoliciesService {

  constructor(private http: HttpClient) { }
  baseUrl : string = 'http://localhost/api/';
  getPolicies(){
    return this.http.get<Policies[]>(this.baseUrl+'view.php');
  }
  geteditforPolicies(id:any){
    return this.http.get<Policies[]>(this.baseUrl+'view.php?id='+id);
  }
  deletePolicies(id:any){
    return this.http.delete(this.baseUrl+'delete.php?id='+id);
  }
  insertPolicies(policies:any){
    return this.http.post(this.baseUrl+'insert.php', policies);
  } 
  editPolicies(policies:any){
    return this.http.put(this.baseUrl+'update.php', policies);
  } 
 
}
