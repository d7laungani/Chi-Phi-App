import {Page, Modal, NavController, ViewController, NavParams, Events, Slides} from 'ionic-angular';
import {Component, Input, EventEmitter, Output, ViewChild, ElementRef}  from '@angular/core';
import { PhotoViewer } from 'ionic-native';



@Component({
    selector: 'ionic-gallery',
    template: `
		<div (window:resize)="onResize($event)" class="row">
		  <div *ngFor="let item of items;#i = index" (click)="itemTapped(i)" [ngStyle]="colStyle" class="col">
		    <div class="thumbnal">
					<img src="{{item[options.thumbKey]}}"/>
		      <div *ngIf="options.thumbnailTitleKey" class="thumbnailTitle">{{item[options.thumbnailTitleKey]}} </div>
		    </div>
		  </div>
		</div>
	`,
    styles: [`
		.thumbnailTitle {
				display: block;
		}
		.row {
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				padding: 5px;
				width: 100%;
				flex-flow: row wrap;
				color: red;
		}
		.row .col {
				display: block;
				text-align: center;
				-webkit-box-flex: 1;
				-webkit-flex: 1;
				-ms-flex: 1;
				flex: 1 1 30%;
				padding: 5px;
		}
`],
})
export class IonicGallery {
    test: string;

    @Input() items: any;
    @Input() options: any;
    @Output() click: EventEmitter<any> = new EventEmitter();
    colStyle: any;

    constructor(private nav: NavController, private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.options.colWidth = Math.abs(this.options.colWidth) || 200;

        this.options.urlKey = this.options.urlKey || 'url';
        this.options.thumbKey = this.options.thumbKey || this.options.urlKey;
        this.options.hasContent = this.options.contentKey ? true : false;
        this.colStyle = {}
    }
    ngDoCheck() {
        this.calculateCol();

    }
    onResize(event) {
        let row = this.elementRef.nativeElement.firstElementChild;
    }

    calculateCol() {
        let row = this.elementRef.nativeElement.firstElementChild;
        let width = row.clientWidth;
        let colWidth = this.options.colWidth;
        let col = Math.trunc(width / colWidth);
        if (col <= 1) col = 1;
        let percent = 100 / col + '%';
        this.colStyle.flexBasis = percent;
        this.colStyle.maxWidth = percent;
    }
    itemTapped(item: any) {
        if (!this.options.noImageView) {
            this.presentImageModal(item)
        }
        this.click.emit(item);
    }



    presentImageModal(index: number) {
        let imageModal = Modal.create(ImageView, { items: this.items, options: this.options, index: index });
        console.log("presentImageModal", index, imageModal);
        imageModal.onDismiss(data => {
        });
        this.nav.present(imageModal);
    }

}


@Page({
    template: `

	<ion-toolbar>
		<ion-title>{{title}} </ion-title>
		<ion-buttons end="">
			<button *ngFor="let action of actions" clear="" (click)="callAction(action)">
				<ion-icon [name]="action.icon"></ion-icon>
			</button>
			<button (click)="dismiss()">
				<ion-icon name="close"></ion-icon>
			</button>
		</ion-buttons>
	</ion-toolbar>
	<ion-content>
		<ion-slides #slider="" [options]="optionSlide" (didChange)="onSlideChanged()"  >
			<ion-slide *ngFor="let item of items" (click)="imageTapped(item,options)">
				<h2 *ngIf="options.titleKey" class="image-title">{{item[options.titleKey]}}</h2> <img src = "{{item[options.urlKey]}}" >
				<p *ngIf="options.contentKey" (click)="contentOnClick(item)" [ngStyle]="{'max-height': maxHeight}" class="image-content">{{item[options.contentKey]}}</p>
			</ion-slide>
		</ion-slides>
	</ion-content>
	`,
    styles: [`
		.image-content {
				font-size: 0.5em;
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				background-color: #f8f8f8;
				margin-bottom: 0;
				opacity: 0.5;
		}
		.image-title {

		}
	`],
})
class ImageView {
    @ViewChild('slider') slider: Slides;
    items: any;
    optionSlide: any;
    options: any;

    title: string = '';
    showLongContent: boolean = false;
    actions: Array<any>;

    maxHeight: string = '3em';
    constructor(private nav: NavController, private viewCtrl: ViewController, params: NavParams) {
        console.log('ImageView constructor params', params, params.data.items, this.nav);
        this.items = params.data.items;
        this.options = params.data.options;
        this.actions = this.options.viewActionButtons || [];
        this.optionSlide = {
            initialSlide: params.data.index,
            loop: true,
            pager: true
        }

    }
    onSlideChanged() {
        let currentIndex = this.slider.getActiveIndex();
        console.log("Current index is", currentIndex);
        this.changeTitle()
    }
    changeTitle() {
        if (!this.options.titleKey) return;
        let index = this.slider.getActiveIndex() - 1;
        let item = this.items[index]
        this.title = item[this.options.titleKey];

    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
  imageTapped(item: any,options: any) {

    var url = item[options.urlKey]

    //console.log(url);
    PhotoViewer.show(url);
     //console.log(item[options.urlKey]);
  }
    callAction(action) {
        if (action.action) {
            let index = this.slider.getActiveIndex() - 1;
            action.action.call(this.options.actionClass, this.items[index]);
        }
    }
    contentOnClick(item) {
        //PhotoViewer.show("item");
        this.showLongContent = !this.showLongContent;
        this.maxHeight = this.showLongContent ? '6em' : '3em'
    }
}
