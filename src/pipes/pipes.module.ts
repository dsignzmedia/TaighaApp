import { NgModule } from '@angular/core';
import { HtmlToTextPipe } from './html-to-text/html-to-text';
import { RemovehtmltagsPipe } from './removehtmltags/removehtmltags';
@NgModule({
	declarations: [HtmlToTextPipe,
    RemovehtmltagsPipe],
	imports: [],
	exports: [HtmlToTextPipe,
    RemovehtmltagsPipe]
})
export class PipesModule {}
