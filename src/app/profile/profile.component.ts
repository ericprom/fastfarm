import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserProfile } from '../services/user-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

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

}
