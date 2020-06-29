import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-course-form',
  templateUrl: './new-course-form.component.html',
  styleUrls: ['./new-course-form.component.scss'],
})
export class NewCourseFormComponent implements OnInit {
  constructor(fb: FormBuilder) {
    // this.form = fb.group({
    //   name: ['', Validators.required],
    //   contact: fb.group({
    //     email: [],
    //     phone: [],
    //   }),
    //   topic: fb.array([]),
    // });
  }

  ngOnInit(): void {}

  form = new FormGroup({
    topics: new FormArray([]),
    name: new FormControl(),
    contact: new FormGroup({
      email: new FormControl(),
      phone: new FormControl(),
    }),
  });

  get topics() {
    return this.form.get('topics') as FormArray;
  }

  addTopic(topic: HTMLInputElement) {
    this.topics.push(new FormControl(topic?.value));
    topic.value = '';
  }

  removeTopic(topic: FormControl) {
    console.log(this.topics);
    let index = this.topics.controls.indexOf(topic);
    this.topics.removeAt(index);
  }
}
