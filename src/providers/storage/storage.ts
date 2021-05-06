import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public http: HttpClient, public storage : Storage) {
    console.log('Hello StorageProvider Provider');
  }

  //Set Local storage
	public setStorage(key, value) {
		return this.storage.set(key, value);
	}
	//Set Local storage

	//Get Local storage
	public async getStorage(name) {
	  	return await this.storage.get(name);
	}
	//Get Local storage
	 
	//Remove Local storage
	public async removeStorage(name){
	    return await this.storage.remove(name);
	}
	//Remove Local storage

	//Clear all Local storage
	public clearStorage() {
	    this.storage.clear().then(() => {
	      console.log('all keys cleared');
	    });
	}
	//Clear all Local storage
}