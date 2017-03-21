import { Component, Input} from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserProfile } from '../services/user-profile.service';

@Component({
  selector: 'menu-component',
  templateUrl: './menu.component.html',
})
export class MenuComponent {

  	private subscription: Subscription;
  	isLoggedIn: boolean;
	profileImage:any;

	constructor(
		public af: AngularFire,
		public UserProfile: UserProfile,
		private router: Router
	) {
	
		this.profileImage = "https://secure.gravatar.com/avatar/ed167768ffc5b0e3492c6c399c8c4acc?d=retro";

	    this.af.auth.subscribe(user => {
	      if(user) {
	        this.isLoggedIn = true;
	        var path = user.uid+"/expose";
	        this.subscription = UserProfile.retrieve(path).subscribe(profile => {
	          this.profileImage = profile.image;
	        });
	      }
	      else {
	        this.isLoggedIn = false;
	      }
	    });

  	}


  	logout() {
     	this.af.auth.logout();
     	this.router.navigateByUrl('/');
  	}
}