import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserProfile } from '../services/user-profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  private subscription: Subscription;
  public user: any;

  constructor(
    public af: AngularFire,
    private router: Router,
    public UserProfile: UserProfile
  ) {
    this.af.auth.subscribe(user => {
      if(user) {
        var path = user.uid+"/expose";
        this.subscription = UserProfile.retrieve(path).subscribe(profile => {
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
