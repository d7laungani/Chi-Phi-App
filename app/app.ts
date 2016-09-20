import {Component,provide,ViewChild} from '@angular/core';
import {App,Platform, ionicBootstrap,Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Http} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AuthService} from './services/auth/auth';

import {TabsPage} from './pages/tabs/tabs';
import {MainPage} from './pages/main/main';
import {PeopleService} from "./providers/people-service/people-service";
import {CalendarService} from "./providers/calendar-service/calendar-service";
import {AboutPage} from './pages/about/about';
import {ProfilePage} from './pages/Profile/profile';
import {GalleryPage} from './pages/gallery/gallery';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [PeopleService,CalendarService,AuthService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  private rootPage: any;

  constructor(private platform: Platform, private auth: AuthService) {
    //this.initializeApp();
    this.rootPage = MainPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      // When the app starts up, there might be a valid
      // token in local storage. If there is, we should
      // schedule an initial token refresh for when the
      // token expires
      this.auth.startupTokenRefresh();
    });
  }
}

//ionicBootstrap(MyApp,[PeopleService,CalendarService],{});
ionicBootstrap(MyApp, [
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({noJwtError: true}), http);
    },
    deps: [Http]
  }),
  AuthService,PeopleService,CalendarService
])
