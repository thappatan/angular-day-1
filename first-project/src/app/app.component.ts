import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  name: string = "";
  count: number = 0;
  isShow: boolean = true;
  changeColor: boolean = true;

  ngOnInit(): void {
    console.log("component inited")
    this.name = "Me";
    this.count = 2;
  }

  changeColorContent(){
    this.changeColor = !this.changeColor;
  }

  showHideContent(){
    this.isShow = !this.isShow;
  }

  plusCount(){
    this.count++;
  }

  minusCount(){
    this.count--;
  }
}
