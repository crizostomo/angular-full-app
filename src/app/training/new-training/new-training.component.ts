import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  //exercises!: Observable<Exercise[]>;
  exercises!: Exercise[] | null;
  private exerciseSubscription!: Subscription;
  isLoading = true;
  private loadingSubscription!: Subscription; // For the 2nd approach to load the spinner when loading the exercises

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService // For the 2nd approach to load the spinner when loading the exercises
    //private db: AngularFirestore
  ) {}

  ngOnInit() {
    // To mock data
    //this.exercises = this.trainingService.getAvailableExerces();

    // For Firebase Connection
    //this.exercises = this.db
    //  .collection('availableExercises')
    //  //.valueChanges()
    //  .snapshotChanges()
    //  .pipe(
    //    map((docArray) => {
    //      return docArray.map((doc) => {
    //        const data: any = doc.payload.doc.data();
    //        return {
    //          id: doc.payload.doc.id,
    //          ...data,
    //        };
    //      });
    //    })
    //  );
    //.subscribe(result => {
    //  console.log(result);
    //});
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    ); // For the 2nd approach to load the spinner when loading the exercises
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      //this.isLoading = false; // 1st approach to load the spinner when loading the exercises. Point when we load the exercises
      this.exercises = exercises
    });
    this.trainingService.getAvailableExerces();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe(); // For the 2nd approach to load the spinner when loading the exercises
  }
}
