import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  exercises!: Observable<Exercise[]>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    // To mock data
    //this.exercises = this.trainingService.getAvailableExerces();

    // For Firebase Connection
    this.exercises = this.db
      .collection('availableExercises')
      //.valueChanges()
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            const data: any = doc.payload.doc.data();
            return {
              id: doc.payload.doc.id,
              ...data,
            };
          });
        })
      );
    //.subscribe(result => {
    //  console.log(result);
    //});
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
