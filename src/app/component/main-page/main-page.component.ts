import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateService } from 'src/app/service/date/date.service';
import { newDate } from '../../models/interfaces';
import * as moment from "moment";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  formGroup: FormGroup;
  if_conv: boolean;
  hebrewDate: string;

  constructor(private formBuilder: FormBuilder,
    private dateService: DateService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'date': [null, [Validators.required]]
    });
  }

  async onSubmit(selectedDate) {
    const convDate: string = moment(selectedDate.date).format('DD/MM/YYYY');
    await this.dateService.convertGeToHe(convDate)
      .then((newDate: newDate) => {
        this.hebrewDate = newDate.hebrew;
        this.if_conv = true;
      })
      .catch(err => {
        console.log(err);
      })
  }
}
