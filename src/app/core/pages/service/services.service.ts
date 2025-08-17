import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../enviroments/env';
import { map, Observable } from 'rxjs';
import { Question } from '../../../store/questions/question.model';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }


  getsubject() {
    return this.http.get(`${env.baseUrl}subjects`)
  }

  getExamOnSubject(param: any) {
    return this.http.get(`${env.baseUrl}exams?subject=${param}`)
  }



  getQuestionOnExam(param: string): Observable<Question[]> {
    return this.http.get<{ questions: Question[] }>(`${env.baseUrl}questions?exam=${param}`)
      .pipe(map(response => response.questions));
  }
}


