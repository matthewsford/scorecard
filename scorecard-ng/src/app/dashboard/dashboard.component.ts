import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../question.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  questions: any[];

  constructor(service: QuestionService) {
    this.questions = service.getQuestions();
  }

  ngOnInit() {
  }

}
