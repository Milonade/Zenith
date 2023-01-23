import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})

export class AccountPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // setEmails$(): Observable<Post[]> {
  //   return this.http.set<Post[]>(`${environment.apiUrl}/users`);
  // }

  editPseudo() {
    console.log('Edit pseudo');
  }

  editEmail() {
    console.log('Edit email');
  }

  editPassword() {
    console.log('Edit password');
  }

  deleteAccount() {
    confirm('You are about to delete your account. Do you want to delete definitively your account?');
    //Action to delete account
  }

}
