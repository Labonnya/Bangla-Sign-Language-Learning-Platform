export class Choice {
    constructor(public value: string, public correct?: boolean, public imageUrl?: string) {}
  }
  
  export class Question {
    label: string="";
    choice1: string ="";
    choice2: string ="";
    choice3: string ="";
    choice4: string ="";
    answer: string ="";
  }
  
  export class Quiz {
    constructor(public label: string, public name: string, public description: string, public fileName: string) {}
  }
  
  export class Answers {
    constructor(public values: string) {}
  }