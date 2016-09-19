import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {CordovaOauth, Facebook, Google} from 'ng2-cordova-oauth/core';


@Component({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
  private cordovaOauth: CordovaOauth;

  constructor(private navCtrl: NavController, private platform: Platform) { }

  public facebook() {
    this.cordovaOauth = new CordovaOauth(new Facebook({clientId: "CLIENT_ID_HERE", appScope: ["email"]}));
    this.platform.ready().then(() => {
      this.cordovaOauth.login().then(success => {
        console.log("RESULT: " + success);
      }, error => {
        console.log("ERROR: ", error);
      });
    });
  }
}
