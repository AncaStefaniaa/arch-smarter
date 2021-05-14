import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserData } from "../../providers/user-data";
import { TopService } from "./service/top.service";
import { architecturalStyles } from "../discover/discover.columns";
@Component({
  selector: "app-top",
  templateUrl: "top.component.html",
  styleUrls: ["./top.component.scss"],
})
export class TopPage {
  data: any;
  segment = "recomended";
  architecturalStyles;

  dataArray: any;
  options = {
    centeredSlides: true,
    loop: true,
    spaceBetween: -100,
  };

  constructor(private topService: TopService) {}
  ngOnInit() {
    this.architecturalStyles = architecturalStyles;
    this.topService.getTop().subscribe((res) => {
      this.dataArray = res["result"];
      console.log(this.dataArray);
    });
  }

  updateSection() {
    console.log(this.segment);
    // if (this.segment === "top") {
    //   this.segment = "recomended";
    // } else {
    //   this.segment = "top";
    // }
  }

  addLike(photoId){
    const userData = JSON.parse(localStorage.getItem("userData"));
    let userId = userData.userId;
      
    this.topService.addLike(photoId).subscribe((res) => {
      console.log("...");

    })
  }
}
