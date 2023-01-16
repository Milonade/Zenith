import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../auth.service";
import { AuthRequest } from "../../models/auth-request";
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  authRequest: AuthRequest;

  registerError: boolean;

  constructor(private auth: AuthService, private router: Router, private modalCtrl: ModalController) {
    this.authRequest = {
      username: undefined,
      password: undefined,
    };
  }

  /**
   * Called when the register form is submitted.
   */
  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    // Hide any previous register error.
    this.registerError = false;

    // Perform the authentication request to the API.
    this.auth.register$(this.authRequest).subscribe({
      next: () => {

      },
      error: (err) => {
        this.registerError = true;
        console.warn(`Registration failed: ${err.message}`);
      },
    });
  }

  // async openModal() {
  //   const modal = await this.modalCtrl.create({
  //     // component: Modal,
  //   });
  //   modal.present();

  // }

  ngOnInit() {
  }

}
