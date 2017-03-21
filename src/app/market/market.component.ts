import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { ServiceList } from '../services/service-list.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})

export class MarketComponent implements OnInit {
	topServices: FirebaseListObservable<any[]>;
  newServices: FirebaseListObservable<any[]>;
  reviews: FirebaseListObservable<any[]>;

	constructor(public ServiceList: ServiceList) {
		this.topServices = ServiceList.getList({
  		query: {
    		orderByChild: 'sort',
    		limitToFirst: 3
  		}
  	});

    this.newServices = ServiceList.getList({
      query: {
        limitToFirst: 6,
      }
    });

    this.reviews = ServiceList.getReviews('Kf-2hJlVXFuCPUpeytF',{
      query: {
        limitToFirst: 6,
      }
    });
    this.reviews.subscribe(review => { 
      console.log(review);
    });
	}

	ngOnInit() {
	}
}
