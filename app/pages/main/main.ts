import {Platform,Page,Nav} from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import {EmailComposer} from 'ionic-native';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {AuthService} from '../../services/auth/auth';
import {GalleryPage} from '../gallery/gallery'


@Component({
    templateUrl: 'build/pages/main/main.html'
})
export class MainPage {



    constructor(private auth: AuthService,private nav: NavController) {

    }

    launchGreeksuite() {
        InAppBrowser.open("https://greeksuite.io/users/sign_in", "_blank");

    }

    launchWebsite() {
      InAppBrowser.open("https://chiphiutd.com/", "_blank");

    }

      launchForums() {
        InAppBrowser.open("https://chiphiutd.com/forums", "_blank");

      }

    launchWiki () {
        InAppBrowser.open("https://chiphiutd.com/wiki/index.php?title=Main_Page ","_blank ");

    }

    sendEmail () {

        EmailComposer.isAvailable().then((available) =>{
            if(available) {
                //Now we know we can send
            }
        });

        let email = {
            to: 'd7laungani@hotmail.com',
            attachments: [

            ],
            subject: 'Chi Phi App Contact Form',
            body: 'Hello,' +
            '',
            isHtml: true
        };

        // Send a text message using default options
        EmailComposer.open(email);
    }

    launchGallery () {
      console.log("Gallerypage coming right up");
      this.nav.push(GalleryPage);
    }

  launchFacebookPage () {
    InAppBrowser.open("fb://profile/351112741602236","_blank ");

  }

  launchBoysandGirls () {
    console.log("Boys and Girls")
    InAppBrowser.open("http://bgca.convio.net/site/Donation2?df_id=1180&1180.donation=form1","_blank ");

  }


}

