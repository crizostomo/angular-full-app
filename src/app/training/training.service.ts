import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class TrainingService {

  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[] | null>();
  private availableExercises: Exercise[] = [
  //  { id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
  //  { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
  //  { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
  //  { id: 'burpees', name: 'Burpees', duration: 60, calories: 8},
  ];
  private runningExercise: Exercise | null = null;
  private exercises: Exercise[] = [];

  constructor(
    private db: AngularFirestore
    ) {}

  getAvailableExerces() {
    //return this.availableExercises.slice(); //slice creates a real copy

    this.db
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
      ).subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  startExercise(selectedId: string) {
    const selectedExercise = this.availableExercises.find(ex => ex.id === selectedId);
    if (selectedExercise) {
      this.runningExercise = selectedExercise;
      this.exerciseChanged.next({ ...this.runningExercise });
    }
  }

  completeExercise() {
    if (this.runningExercise) {
      const completedExercise: Exercise = {
        ...this.runningExercise,
        date: new Date(),
        state: 'completed'
      };
      this.exercises.push(completedExercise);
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    }
  }

  cancelExercise(progress: number) {
    if (this.runningExercise) {
      const completedExercise: Exercise = {
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      };
      this.exercises.push(completedExercise);
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    }
  }

  getRuningExercise() {
    return { ...this.runningExercise };
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice(); //slice to get a new copy
  }

}
