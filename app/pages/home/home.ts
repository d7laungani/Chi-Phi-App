import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PeopleService} from '../../providers/people-service/people-service';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  public people: any;

  constructor(private navController: NavController,public peopleService: PeopleService) {
    this.loadPeople();
  }

  loadPeople(){
    this.peopleService.load()
      .then(data => {
        this.people = data;
      });
  }
}
