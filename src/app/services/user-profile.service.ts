import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class UserProfile {

  constructor(public af: AngularFire) { }

  retrieve(path): FirebaseObjectObservable<any>{
    return this.af.database.object('users/'+path);    
  }

}
