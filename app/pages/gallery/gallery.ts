import {Page, NavController, NavParams, List, Item, Toast} from 'ionic-angular';
import {IonicGallery} from '../../../dist/ionic-gallery';
import { Http,HTTP_PROVIDERS } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Page({
  templateUrl: 'build/pages/gallery/gallery.html',
	directives: [IonicGallery]

})
export class GalleryPage {
  selectedItem: any;
  icons: string[];
  items: Array<any>;
	options: any;
  //images: any;
  images = ["https://scontent-dft4-2.xx.fbcdn.net/t31.0-8/14125493_1171163276263841_1460199946659951272_o.jpg",
            "https://scontent-dft4-2.xx.fbcdn.net/t31.0-8/12356724_999439600102877_8347544285974938594_o.jpg",
            "https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/12472409_1022892254424278_8900924246667159837_n.jpg?oh=43cf8357123def8e803071ccd706230b&oe=584DFAD4",
            "https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/12289523_996120573768113_7406259065782402528_n.jpg?oh=e7d14d1a540c7800042696df508ec3f1&oe=5843B7DC",
            "https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/12208672_985289598184544_9139749232597074404_n.jpg?oh=fe7fb1d173b04af966791829ec3c452d&oe=584DF6CF",
            "https://scontent-dft4-2.xx.fbcdn.net/t31.0-8/12032749_969267773120060_6001367676093858375_o.jpg",
            "https://scontent-dft4-2.xx.fbcdn.net/t31.0-8/12052548_969267769786727_8691454001921448674_o.jpg",
            "https://scontent-dft4-2.xx.fbcdn.net/t31.0-8/12034397_969267766453394_1724793000101221248_o.jpg",
            "https://scontent-dft4-2.xx.fbcdn.net/t31.0-8/11707943_969267763120061_8700864047670948136_o.jpg",
            "https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/12208672_985289598184544_9139749232597074404_n.jpg?oh=fe7fb1d173b04af966791829ec3c452d&oe=584DF6CF"



  ];

  data: any;
  constructor(private nav: NavController, navParams: NavParams,private http: Http) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

		this.options = {
			urlKey:'URL',
			thumbKey:'thumb',
			titleKey:'title',
			contentKey:'note',
			colWidth:120,
			thumbnailClickAction: this.thumbnailClick,
			actionClass:this,
			/*viewActionButtons:[{
				icon: 'download',
				action: this.save
			},
			{
				icon: 'heart',
				action: this.like
			},
		]
		*/
		}


    this.items = [];
    for(let i = 0; i < 9; i++) {
			let s = {
        title: '',
        note: '',
				//thumb: 'http://placehold.it/120X120',
				thumb:this.images[i],
        URL: this.images[i],
        //URL: `http://placehold.it/${i}00X300`,
      }
      this.items.push(s);
    }
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('https://api.myjson.com/bins/3wkvw')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data.images;
          resolve(this.data);
        });
    });
  }
	save(item){
		console.log("in ListPage save()", item, this);
		this.presentToast(`item ${item.title} saved!`)
	}
	thumbnailClick(item){
		console.log("in ListPage thumbnailClick()", item, this);
		this.presentToast(`item ${item} clicked!`)
	}
	like(item){
		console.log("in ListPage like()", item, this);
		this.presentToast(`item ${item.title} liked!`)

	}
	presentToast(text) {
	  let toast = Toast.create({
	    message: text,
	    duration: 3000,
			position: 'bottom'
	  });

		console.log("presentToast()", this, this.nav, toast)
	  toast.onDismiss(() => {
	    console.log('Dismissed toast');
	  });

	  this.nav.present(toast);
  }

}
