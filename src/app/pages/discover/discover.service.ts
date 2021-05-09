import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class DiscoverService {
  url: any;
  constructor(
    private httpClient: HttpClient,
    private toastController: ToastController
  ) {}

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: "bottom",
      duration: 10000,
    });
    toast.present();
  }

  findStyle(imageData) {
    const date = new Date().valueOf();
    const imageName = date + ".jpeg";

    const imageBlob = this.dataURItoBlob(imageData);
    const imageFile = new File([imageBlob], imageName, { type: "image/jpeg" });

    let formData = new FormData();
    formData.append("file", imageBlob, imageName);

    var options = { content: formData };

    return this.httpClient.post<any>(
      "http://192.168.1.193:3000/arch_recognition",
      formData
    );
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: "image/jpeg" });

    return blob;
  }

  sendImageUser(imageData, style, latitude, longitude, address) {
    const date = new Date().valueOf();
    const imageName = date + ".jpeg";

    const imageBlob = this.dataURItoBlob(imageData);
    const imageFile = new File([imageBlob], imageName, {
      type: "image/jpeg",
    });

    console.log(JSON.parse(localStorage.getItem("userData")));
    const userData = JSON.parse(localStorage.getItem("userData"));

    let formData = new FormData();

    formData.append("file", imageBlob, imageName);
    formData.append("userId", userData.userId);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("style", style);
    formData.append("address", address);
    var options = { content: formData };

    return this.httpClient.post<any>(
      "http://192.168.1.193:3000/add_image",
      formData
    );
  }

  getAddress(latitude, longitude) {
    return this.httpClient.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          latlng: `${latitude},${longitude}`,
          key: "AIzaSyDUi5qVkVuZo1yhMWgSMOubk4igV53Jsyc",
        },
      }
    );
  }
}
