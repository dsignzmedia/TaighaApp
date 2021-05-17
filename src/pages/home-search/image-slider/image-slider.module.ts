import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageSliderPage } from './image-slider';

@NgModule({
  declarations: [
    ImageSliderPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageSliderPage),
  ],
})
export class ImageSliderPageModule {}
