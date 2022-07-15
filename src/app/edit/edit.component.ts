import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliciesService } from '../policies.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  addForm: any;
  policiesid: any;

  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private policiesService : PoliciesService,
    private url: ActivatedRoute
  ) { 
    this.addForm = this.formBuilder.group({
      id: ['', Validators.required],
      number: ['', Validators.required],
      amount: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.policiesid = this.url.snapshot.params['id'];
   if(this.policiesid>0)
   {
    this.policiesService.geteditforPolicies(this.policiesid).subscribe((
      (data:any)=>{
        this.addForm.patchValue(data.data)
      }))
   }
  }

  onEdit(){
    this.policiesService.editPolicies(this.addForm.value).subscribe(
    (data:any)=>{
      this.router.navigate(['/']);
    }
    );
  }

}
