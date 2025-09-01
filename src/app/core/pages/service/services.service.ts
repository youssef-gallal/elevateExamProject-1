import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../enviroments/env';
import { map, Observable } from 'rxjs';
import { Question } from '../../../store/questions/question.model';
import { SubjectsResponse } from '../../interfaces';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {


  constructor(private http: HttpClient) { }



  getsubjects(): Observable<SubjectsResponse> {
    return this.http.get<SubjectsResponse>(`${env.baseUrl}subjects`)
  }

  getExamOnSubject(id: string) {
    return this.http.get(`${env.baseUrl}exams?subject=${id}`);
  }



  getQuestionOnExam(param: string): Observable<Question[]> {
    return this.http.get<{ questions: Question[] }>(`${env.baseUrl}questions?exam=${param}`)
      .pipe(map(response => response.questions));
  }
}


