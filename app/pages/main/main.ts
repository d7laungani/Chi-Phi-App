import {Platform,Page,Nav} from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import {EmailComposer} from 'ionic-native';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {CalendarPage} from "../calendar/calendar";
import {AuthService} from '../../services/auth/auth';
import {GalleryPage} from '../gallery/gallery'


@Component({
    templateUrl: 'build/pages/main/main.html'
})
export class MainPage {



    constructor(private auth: AuthService,private nav: NavController) {

    }

    launchGreeksuite() {
      let browser = new InAppBrowser('https://greeksuite.io/users/sign_in', '_blank');
      browser.show();
        //InAppBrowser.open("https://greeksuite.io/users/sign_in", "_blank");

    }

    launchWebsite() {
      let browser = new InAppBrowser('https://chiphiutd.com/', '_blank');
      browser.show();
      //InAppBrowser.open("https://chiphiutd.com/", "_blank");

    }

      launchForums() {
        let browser = new InAppBrowser('https://chiphiutd.com/forums', '_blank');
        browser.show();
        //InAppBrowser.open("https://chiphiutd.com/forums", "_blank");

      }

    launchWiki () {
      let browser = new InAppBrowser('https://chiphiutd.com/wiki/index.php?title=Main_Page', '_blank');
      browser.show();
        //browser.open("https://chiphiutd.com/wiki/index.php?title=Main_Page ","_blank ");

    }

    sendEmail () {

        EmailComposer.isAvailable().then((available) =>{
            if(available) {
                //Now we know we can send
            }
        });

        let email = {
            to: 'technology@chiphiutd.com',
            attachments: [

            ],
            subject: 'Tech Question',
            body: 'Hello,' +
            '',
            isHtml: true
        };

        // Send a text message using default options
        EmailComposer.open(email);
    }

  emailJboard () {

    EmailComposer.isAvailable().then((available) =>{
      if(available) {
        //Now we know we can send
      }
    });

    let email = {
      to: 'jboard@chiphiutd.com',
      attachments: [

      ],
      subject: 'App Report Submission',
      body: 'Dear JBoard,' +
      '',
      isHtml: true
    };

    // Send a text message using default options
    EmailComposer.open(email);
  }
    launchEvents () {
        console.log("Calendar page coming right up");
        this.nav.push(CalendarPage);
    }
    launchGallery () {
      console.log("Gallerypage coming right up");

      this.nav.push(GalleryPage);
    }

  launchFacebookPage () {

    //let browser = new InAppBrowser('fb://profile/351112741602236', '_blank');
    let browser = new InAppBrowser('https://www.facebook.com/groups/1562475277366155/', '_blank');
    browser.show();
    //InAppBrowser.open("fb://profile/351112741602236","_blank");

  }

  launchBoysandGirls () {

    let browser = new InAppBrowser('http://bgca.convio.net/site/Donation2?df_id=1180&1180.donation=form1', '_blank');
    browser.show();

    //InAppBrowser.open("http://bgca.convio.net/site/Donation2?df_id=1180&1180.donation=form1","_blank ");

  }


}

