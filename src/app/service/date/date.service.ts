import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { newDate } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private http: HttpClient) { }

  // Convert gregorian to hebrew date
  convertGeToHe(date: string): Promise<newDate> {
    const splittedDate = date.split("/", 3);
    const httpOptions = {
      params: new HttpParams()
        .set('cfg', 'json')
        .set('gy', splittedDate[2])
        .set('gm', splittedDate[1])
        .set('gd', splittedDate[0])
        .set('g2h', '1')
    }
    return this.http.get<newDate>("https://www.hebcal.com/converter?", httpOptions).toPromise();
  }
}
