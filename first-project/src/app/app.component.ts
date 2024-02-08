import { Component, OnInit } from '@angular/core';

import { UserModel } from './models/user.model';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  name: string = "";
  count: number = 0;
  isShow: boolean = true;
  changeColor: boolean = true;
  userList: string[] = ["user1", "user2", "user3", "user4"];
  userListByModel: UserModel[] = [
    { firstname: "user 1", lastname: "user 1", username: "user 1", age: 20 }, 
    { firstname: "user 2", lastname: "user 2", username: "user 2", age: 26 }
  ];

  userForm: FormGroup = new FormGroup({
    firstname: new FormControl("", [Validators.required]),
    lastname: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    age: new FormControl(0)
  });

  ngOnInit(): void {
    console.log("component inited")
    this.name = "Me";
    this.count = 2;
  }

  userFormSubmit(){
    console.log(this.userForm.value);

    const user: UserModel = {...this.userForm.value};

    this.userListByModel.push(user);

    this.userForm.reset({});
  }

  buttonSubmit(user: UserModel){
    console.log("user : ", user);
    this.userForm.patchValue({...user});
  }

  changeColorContent() {
    this.changeColor = !this.changeColor;
  }

  showHideContent() {
    this.isShow = !this.isShow;
  }

  plusCount() {
    this.count++;
  }

  minusCount() {
    this.count--;
  }
}
