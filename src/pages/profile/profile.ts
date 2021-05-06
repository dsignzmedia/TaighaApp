import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ToastController, LoadingController, Loading, Events } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { StorageProvider } from '../../providers/storage/storage';
import  { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TabsPage } from '../../pages/tabs/tabs';

import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public showSpinner: boolean = false;
  public user: any = "";
  private profile : FormGroup;
  public errors: any = [];
  public hasError: number = 0;
  public lastImage: string = null;
  public loading: Loading;
  public headerToken: any = "";
  public name : string = "";
  public email : string = "";
  public avatar : string = "";
  public storageToken: any;
    public hasEmailVerified : boolean = false;
  constructor(	public navCtrl: NavController, 
  				public service: ServiceProvider, 
  			  	public storage: StorageProvider,
  			  	public formBuilder : FormBuilder,
            private camera: Camera, 
            public platform: Platform,
            private transfer: FileTransfer, 
            private file: File, 
            public events: Events,
            private filePath: FilePath, 
            public toastCtrl: ToastController,
            public actionSheetCtrl: ActionSheetController,
            public loadingCtrl: LoadingController,
  				public navParams: NavParams) {
        events.subscribe('user:created', (user, time) => {
    // user and time are the same arguments passed in `events.publish(user, time)`
    console.log('Welcome', user, 'at', time);
            this.user = user;
  });
  		this.profile = this.formBuilder.group ( {
          first_name: ['', Validators.required ],
          last_name: ['', Validators.required],
          email:['', Validators.required],
          password: [''],
          phone_number:['', Validators.required],
          alternate_email_1: [''],
          alternate_phone_number_1: [''], 
          current_address: [''],

          owner_two_first_name: [''],
          owner_two_last_name: [''],
          owner_two_nick_name:[''],
          owner_two_email: [''],
          owner_two_password:[''],
          owner_two_alternate_email: [''],
          owner_two_phone_number: [''],
          owner_two_alternate_phone_number: [''],

          owner_three_first_name: [''],
          owner_three_last_name: [''],
          owner_three_nick_name:[''],
          owner_three_email: [''],
          owner_three_password:[''],
          owner_three_alternate_email: [''],
          owner_three_phone_number: [''],
          owner_three_alternate_phone_number: ['']

        });

      this.storage.getStorage('auth_user_tokens').then((auth_user_token: any) => {
        this.headerToken = auth_user_token.token_type + " " + auth_user_token.access_token;
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ProfilePage');
    this.clearAndGetProfile();
    this.service.getFcmToken("Profile");
    this.service.watchFcmNotifications();
  }

  clearAndGetProfile() {
  		this.user = "";
  		this.getProfile();
  }

  getProfile() {
  	try {
	 		this.showSpinner = true;
	 		this.service.profile().then( (response : any) => {
		   	console.log(response);
		   	this.user = response.data;
		   	this.profile.patchValue(response.data)
		   	this.showSpinner = false;
		   }).catch( error => {
		   		this.showSpinner = false;
		   		console.log(error);
		   })
	 	} catch(e) {
	 		this.showSpinner = false;
	        this.service.serverError();
	    }
  }

 updateProfile() {
 	try {
 			this.hasError = 0;
	 		this.showSpinner = true;
	 		this.service.updateprofile(this.profile.value).then( (response : any) => {
		   	console.log(response);
		   	this.showSpinner = false;
		   	console.log(response);
		   	this.hasError = 0;
		   }).catch( error => {
		   		this.showSpinner = false;
		   		this.hasError = 1;
		   		console.log(this.errors);
		   		if(error.error.error == 1) {
		   			this.errors = error.error.errors;
		   			console.log(this.errors.first_name);
		   		}
		   })
	 	} catch(e) {
	 		this.showSpinner = false;
	        this.service.serverError();
	    }
 }

 chooseImage() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.actionHandler(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.actionHandler(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  actionHandler(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      allowEdit : true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  private createFileName() {
            var d = new Date(),
            n = d.getTime(),
            newFileName =  n + ".jpg";
            return newFileName;
          }
           
     
    // Copy the image to a local folder
      private copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
          this.lastImage = newFileName;
          this.uploadImage();
        }, error => {
          this.presentToast('Error while storing file.');
        });
      }

     
    presentToast(text) {
      let toast = this.toastCtrl.create({
        message: text,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
     
    // Always get the accurate path to your apps folder
    public pathForImage(img) {
      if (img === null) {
        return '';
      } else {
        return cordova.file.dataDirectory + img;
      }
    }
    
    public uploadImage() {
         if(this.headerToken) {
                // Destination URL
                var url = this.service.apiUploadUserAvatar;
                // File for Upload
                var targetPath = this.pathForImage(this.lastImage);
                // File name only
                var filename = this.lastImage;

                let options: FileUploadOptions = {
                   fileKey: "file",
                  fileName: filename,
                  chunkedMode: false,
                  headers: { 'Authorization' : this.headerToken },
                  params : {'type' : 'Profile', 'file': filename, 'fileName': filename },
                }
                const fileTransfer: FileTransferObject = this.transfer.create();
               
                this.loading = this.loadingCtrl.create({
                  content: 'Uploading...',
                });
                this.loading.present();
               
                // Use the FileTransfer to upload the image
                console.log(targetPath);
                fileTransfer.upload(targetPath, encodeURI(url), options).then( (data : any) => {
                  if(data.response) {
                    console.log("Image", JSON.stringify(data));
                    console.log("Image", JSON.parse(data.response).data.avatar);
                    this.user.avatar = JSON.parse(data.response).data.avatar;
                  }
                   console.log(JSON.stringify(data));
                   
                  this.loading.dismissAll()
                  this.presentToast('Image succesful uploaded.');
                }, err => {
                   console.log(JSON.stringify(err));
                  this.loading.dismissAll()
                  this.presentToast('Error while uploading file.');
                });
             }
      }

   


back(){
   this.navCtrl.push(TabsPage); 
  }
}
