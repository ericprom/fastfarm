import { Component, HostBinding } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserProfile } from '../services/user-profile.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  private subscription: Subscription;
  public user: any;
  public error: any;

  constructor(
    public af: AngularFire, 
    private router: Router,
    public UserProfile: UserProfile,
    public toasterService: ToasterService
  ) {

    this.af.auth.subscribe(auth => { 
      if(auth) {
        this.subscription = UserProfile.retrieve(auth.uid).subscribe(profile => {
          if(profile.$value === null){
            this.create(auth);
          }
          else{
            if(profile.newUser){
              this.router.navigateByUrl('/account/profile');
            }
            else{
              this.router.navigateByUrl('/account/dashboard');
            }
          }
        });
      }
    });

  }

  create(user){

    var uid = user.uid;
    var profile = this.extract(user);
    const users = this.af.database.object('/users');
    users.update({ [uid]: profile });
    this.router.navigate(['/account/dashboard']);

  }

  extract(user){
    var name = {first:"", last:"", display:""};
    var profile = {
        uid: user.uid,
        provider: user.provider,
        newUser: true,
        email: "",
        phone: "",
        idcard: "",
        expose: {
          company:{name:""},
          name: {first:"", last:"", display:""},
          bio: "",
          image: "",
          achievements: []
        }
    };

    if(user.provider == 2){
      return this.fromFacebook(user, profile);
    }

    if(user.provider == 3){
      return this.fromGoogle(user, profile);
    }

    if(user.provider == 4){
      return this.fromPassword(user, profile);
    }

  }

  fromFacebook(user, profile){

    var displayName = user.auth.displayName.split(" ");
    profile.email = user.auth.email || "";
    profile.expose.name.first = displayName[0] || "";
    profile.expose.name.last = displayName[1] || "";
    profile.expose.name.display = user.auth.displayName || "";
    profile.expose.image = user.auth.photoURL || null;
    return profile;

  }

  fromGoogle(user, profile){

    var displayName = user.auth.displayName.split(" ");
    profile.email = user.auth.email || "";
    profile.expose.name.first = displayName[0] || "";
    profile.expose.name.last = displayName[1] || "";
    profile.expose.name.display = user.auth.displayName || "";
    profile.expose.image = user.auth.photoURL || null;
    return profile;

  }

  fromPassword(user, profile){
  
    profile.email = user.auth.email;
    profile.expose.image = "https://secure.gravatar.com/avatar/ed167768ffc5b0e3492c6c399c8c4acc?d=retro";
    return profile;

  }

  loginFb() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).catch(
      (err) => {
        //this.toasterService.pop('warning', 'Login System', err.message);
        this.error = err;
      });
  }

  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).catch(
        (err) => {
        this.error = err;
      });
  }

  onLogin(formLogin) {
    if(formLogin.valid) {
      this.af.auth.login({
        email: formLogin.value.email,
        password: formLogin.value.password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).catch(
        (err) => {
        this.error = err;
      });
    }
  }

  onSignup(formSignup) {
    if(formSignup.valid) {
      this.af.auth.createUser({
        email: formSignup.value.email,
        password: formSignup.value.password
      }).catch(
        (err) => {
        this.error = err;
      });
    }
  }

}
