import {Component} from '@angular/core';
import {AuthService} from '../../services/auth/auth';
import {NavController, NavParams} from 'ionic-angular';
import {MainPage} from '../main/main';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {

  // We need to inject AuthService so that we can
  // use it in the view
  constructor(private auth: AuthService,private nav: NavController) {

      if (auth.authenticated()) {

        //this.nav.push(MainPage);
      }

  }


}
