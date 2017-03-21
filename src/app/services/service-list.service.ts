import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class ServiceList {

  constructor(public af: AngularFire) { }

  getList(query): FirebaseListObservable<any[]>{
    return this.af.database.list('services', query);    
  }

  getReviews(path,query): FirebaseListObservable<any[]>{
    return this.af.database.list('reviews/'+path, query);    
  }

  addItem (key, value) {
      const services = this.af.database.object('/services');
      services.update({ [key]: value });
  }

}
