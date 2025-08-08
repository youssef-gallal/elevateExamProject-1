import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }


  getsubject() {
    return this.http.get(`https://exam.elevateegy.com/api/v1/subjects`)
  }
  getExamOnSubject(param: any) {
    return this.http.get(`https://exam.elevateegy.com/api/v1/exams?subject=${param}`)
  }
}


