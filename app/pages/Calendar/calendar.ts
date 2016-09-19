import {Component,Pipe} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CalendarService} from '../../providers/calendar-service/calendar-service';
import {OrderBy} from "./orderBy"

@Component({
  templateUrl: 'build/pages/calendar/calendar.html',
  pipes: [OrderBy]
})
export class CalendarPage {
  public events: any;

  constructor(private navController: NavController,public calendarService: CalendarService) {

    this.loadEvents();
  }

  loadEvents(){
    console.log("Got called");
    this.calendarService.load()
      .then(data => {
        this.events = data;
        console.log(data);
      });
  }
}
