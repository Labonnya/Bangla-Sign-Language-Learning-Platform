import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { Router } from '@angular/router';
import { Question } from '../quiz.model';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit{

  constructor(private questionsService: QuestionsService, private router: Router) { }
  
  randomQuestions: Question[]=[];
  score: number = 0;

  ngOnInit(): void {
    this.randomQuestions=this.questionsService.getRandomQuestions();
    this.score=this.questionsService.getScore();
  }

}
