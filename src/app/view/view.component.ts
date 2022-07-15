import { Component, OnInit } from '@angular/core';
import { PoliciesService } from '../policies.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  policies: any;
  
  constructor(private policiesservice: PoliciesService ) { }

  ngOnInit(): void {
    this.policiesservice.getPolicies().subscribe(
      (result:any)=>{
        this.policies = result.data;
      }
    )
  }
  deletePolicies(policies:any){
    this.policiesservice.deletePolicies(policies.id).subscribe(data=>{
      this.policies = this.policies.filter((u:any)=> u !== policies);
    })
  }

}
