import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { tokenNotExpired } from 'angular2-jwt';

import { DataService } from './data.service'

import Auth0Lock from 'auth0-lock';
import auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  private api = "/assets/data/gnosiss.json";
  private site: any;
  private authyError: string;
  private lock: Auth0Lock;
  private auth0: any;
  //private loggedIn: boolean;
  //private loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

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
        // this.auth0 = new auth0.WebAuth({
        //   clientID: this.site.auth0.client,
        //   domain: this.site.auth0.domain
        // });
        this.finalizeLock();
        this.getUser();
        // If authenticated, set local profile property and update login status subject
        // if (this.authenticated) {
        //   this.setLoggedIn(true);
        // }

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
    this.router.navigateByUrl('/index');
  }

  // Check to see if the user is logged in. We'll be able to tell by checking to see if they have a token and whether that token is valid or not.
  loggedIn() {
    return tokenNotExpired('id_token');
  }

  // setLoggedIn(value: boolean) {
  //   // Update login status subject
  //   this.loggedIn$.next(value);
  //   this.loggedIn = value;
  // }

  // login() {
  //   // Auth0 authorize request
  //   // Note: nonce is automatically generated: https://auth0.com/docs/libraries/auth0js/v8#using-nonce
  //   this.auth0.authorize({
  //     responseType: 'token id_token',
  //     //redirectUri: '/index',
  //     audience: this.site.auth0.identifier,
  //     scope: this.site.auth0.scope
  //   });
  // }

  // handleAuth() {
  //   // When Auth0 hash parsed, get profile
  //   this.auth0.parseHash((err, authResult) => {
  //     if (authResult && authResult.accessToken && authResult.idToken) {
  //       window.location.hash = '';
  //       this._getProfile(authResult);
  //       this.router.navigate(['/']);
  //     } else if (err) {
  //       this.router.navigate(['/']);
  //       console.error(`Error: ${err.error}`);
  //     }
  //   });
  // }

  // private _getProfile(authResult) {
  //   // Use access token to retrieve user's profile and set session
  //   this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
  //     this._setSession(authResult, profile);
  //   });
  // }

  // private _setSession(authResult, profile) {
  //   // Save session data and update login status subject
  //   localStorage.setItem('token', authResult.accessToken);
  //   localStorage.setItem('id_token', authResult.idToken);
  //   localStorage.setItem('profile', JSON.stringify(profile));
  //   this.setLoggedIn(true);
  // }

  // logout() {
  //   // Remove tokens and profile and update login status subject
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('id_token');
  //   localStorage.removeItem('profile');
  //   this.router.navigate(['/']);
  //   this.setLoggedIn(false);
  // }

  // get authenticated() {
  //   // Check if there's an unexpired access token
  //   return tokenNotExpired('token');
  // }

}
