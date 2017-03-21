import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;
  constructor(public af: AngularFire, private router: Router) {

    this.af.auth.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/account/dashboard');
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
    }).then(
        (user) => {

        this.create(user);

      }).catch(
        (err) => {
        this.error = err;
      })
  }

  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).then(
        (user) => {

        this.create(user);

      }).catch(
        (err) => {
        this.error = err;
      })
  }


  ngOnInit() {
  }

  onLogin(formLogin) {
    if(formLogin.valid) {
      console.log(formLogin.value);
      this.af.auth.login({
        email: formLogin.value.email,
        password: formLogin.value.password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(
        (success) => {
        this.router.navigate(['/account/dashboard']);
      }).catch(
        (err) => {
        this.error = err;
      })
    }
  }

  onSignup(formSignup) {
    if(formSignup.valid) {
      this.af.auth.createUser({
        email: formSignup.value.email,
        password: formSignup.value.password
      }).then(
        (user) => {

        this.create(user);
        this.router.navigate(['/account'])

      }).catch(
        (err) => {
        this.error = err;
      })
    }
  }

}
