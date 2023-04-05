import { Component, OnInit } from '@angular/core';
import { Question, Quiz, Answers } from '../quiz.model';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit{
 
   constructor(private questionsService: QuestionsService) { }

   questions: Question[] = [];
   randomQuestions: Question[] = [];
   answers: string[] = [];
   score: number = 0;
   selectedChoice: string[]=[];
 
   ngOnInit() : void{
   

      this.questionsService.getQuestions().subscribe(
         (response:any) => {
         this.questions = response;
         this.randomQuestions = this.questions.sort(() => Math.random() - 0.5);
         for(let i=0;i<this.randomQuestions.length;i++)
         {
            
            this.answers[i]=this.randomQuestions[i].answer;
         }
         });
      }

 
   checkAnswer() {
         
    this.score=0;
    
    for(let i=0;i<this.randomQuestions.length;i++)
    {   
        if (this.answers[i]==this.selectedChoice[i]) {
        this.score++;
        }
   }
  }
}

 
