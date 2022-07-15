import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoliciesService } from '../policies.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {
  addForm: any;

  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private policiesService : PoliciesService
  ) { 
    this.addForm = this.formBuilder.group({
      id: ['', Validators.required],
      number: ['', Validators.required],
      amount: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.policiesService.insertPolicies(this.addForm.value).subscribe(
    (data:any)=>{
      this.router.navigate(['/']);
    }
    );
  }
}

