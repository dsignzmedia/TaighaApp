import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the HtmlToTextPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'htmlToText',
})
export class HtmlToTextPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any) {
    return value.replaceAll("\\<[^>]*>","");
  }
}
