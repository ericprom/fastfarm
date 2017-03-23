import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class UserProfile {

  constructor(public af: AngularFire) { }

  retrieve(path): FirebaseObjectObservable<any>{
    return this.af.database.object('users/'+path);    
  }

  update (profile) {
    if (profile.newUser) {
        profile.newUser = false;
    }
    const users = this.af.database.object('/users/'+profile.uid);
    delete profile.$key;
    delete profile.$exists;
    users.update(profile);
  }

}
