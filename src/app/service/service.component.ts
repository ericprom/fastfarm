import { Component, OnInit } from '@angular/core';
import { FileItem } from '../directives/file-item';
import { FirebaseListObservable } from 'angularfire2';
import { UploadImagesService } from '../services/upload-images.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

   	private NUMBER_OF_IMAGES: number = 10;
  	images: FirebaseListObservable<any[]>;

  	isDropZoneOver:boolean = false;
  	isEnabledUpload: boolean = true;
  	files: Array<FileItem[]> = [];

  	constructor(route: ActivatedRoute, public uploadImagesService: UploadImagesService) { 
    	this.images = uploadImagesService.listLastImages(this.NUMBER_OF_IMAGES);

      route.params.subscribe(params => console.log("side menu id parameter",params['id']));
  	}

  	ngOnInit() {
  	}

  	public fileOverDropZone(e:any):void {
    	this.isDropZoneOver = e;
  	}

  	uploadImagesToFirebase() {
    	this.isEnabledUpload = false;
    	this.uploadImagesService.uploadImagesToFirebase(this.files);
  	}

 	clearFiles() {
  		this.files = [];
  		this.isEnabledUpload = true;
 	}

}
