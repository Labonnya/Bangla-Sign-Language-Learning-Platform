import { Injectable } from '@angular/core';
import { Question, Quiz } from './quiz.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  public apiUrl = "http://localhost:8000";

  questions: Question[]=[];
  score: number = 0;
  
  getQuestions(){
    // return this.http.get<Question[]>(`{this.apiUrl}/getquestions`);
    return this.http.get("http://localhost:8000/getquestions",{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
    
  }

  getRandomQuestions(): Question[]{
    return this.questions;
}

  setRandomQuestions(questions: Question[]): void{
      this.questions=questions;
  }

  getScore(): number{
      return this.score;
  }

  setScore(score: number): void{
      this.score=score;
}
}
