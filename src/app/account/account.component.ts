import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserProfile } from '../services/user-profile.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  private subscription: Subscription;
  public user: any;

  constructor(
    public af: AngularFire,
    public UserProfile: UserProfile
  ) {
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.subscription = UserProfile.retrieve(auth.uid).subscribe(profile => {
          this.user = profile;
        });
      }
      else {
        this.user = {};
      }
    });

  }

  ngOnInit() {
  }
}
