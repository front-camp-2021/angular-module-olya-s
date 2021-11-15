import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './components/master/app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,

    ComponentsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
