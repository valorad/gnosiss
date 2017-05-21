import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';


import { tokenNotExpired } from 'angular2-jwt';

import { DataService } from './data.service'

import Auth0Lock from 'auth0-lock'

@Injectable()
export class AuthService {

  private api = "/assets/data/gnosiss.json";
  private site: any;
  private authyError: string;
  private lock: Auth0Lock;

  private userProfile: object = {
    picture: "null"
  };

  constructor(
    private router: Router,
    private http: Http,
    private dataService: DataService,

  ) { 
    // first, get necessary data, then proceed 
    this.dataService.getRawData(this.api).subscribe(
      (resSite) => {
        this.site = resSite[0];
      },
      (resError) => {
        this.authyError = resError;
      },
      () => {
        this.lock = new Auth0Lock(this.site.auth0.client, this.site.auth0.domain, {});
        this.finalizeLock();
        this.getUser();
      }
    );
  }

  finalizeLock() {
    this.lock.on('authenticated', (authResult: any) => {
      //this.accessToken = authResult.accessToken;
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          console.log(error);
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.getUser();
      });

      this.lock.hide();
    });
  }

  getUser() {
    let profile = JSON.parse(localStorage.getItem('profile'));
    if (profile !== null) {
      this.userProfile = profile;
    }
  }

  // Display the lock widget
  login() {
    this.lock.show();
  }

  // Log the user out
  logout() {
    // To log out, just remove the token and profile from local storage
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    // Send the user back to the index page after logout
    this.router.navigateByUrl('./');
  }

  // Check to see if the user is logged in. We'll be able to tell by checking to see if they have a token and whether that token is valid or not.
  loggedIn() {
    return tokenNotExpired('id_token');
  }

}
