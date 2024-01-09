import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<any> | undefined;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
    ) { }

  ngOnInit() {
    //this.exercises = this.trainingService.getAvailableExerces();
    this.exercises = this.db
    .collection('availableExercises')
    .valueChanges();
    //.subscribe(result => {
    //  console.log(result);
    //});
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
