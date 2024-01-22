import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[] | null>();
  finishedExercisesChanged = new Subject<Exercise[] | null>();
  private availableExercises: Exercise[] = [
    //  { id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    //  { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
    //  { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
    //  { id: 'burpees', name: 'Burpees', duration: 60, calories: 8},
  ];
  private runningExercise: Exercise | null = null;
  //private finishedExercises: Exercise[] = [];
  private firebaseSubscription: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService
    ) {}

  getAvailableExerces() {
    //return this.availableExercises.slice(); //slice creates a real copy

    this.firebaseSubscription.push(this.db
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
      )
      .subscribe((exercises: Exercise[]) => {
        console.log(exercises);
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      }
      , error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar('Fetching exercises failed, please try again later', undefined, 2000);
        this.exercisesChanged.next(null);
        //console.log(error);
      }
      ));
  }

  startExercise(selectedId: string) {
    //this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()}) // delete, set, update a single document
    const selectedExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
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
        state: 'completed',
      };
      this.addDataToDatabase(completedExercise); // Call addDataToDatabase with completed exercise
      //this.finishedExercises.push(completedExercise);
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    }
  }

  cancelExercise(progress: number) {
    if (this.runningExercise) {
      const cancelledExercise: Exercise = {
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled',
      };
      this.addDataToDatabase(cancelledExercise); // Call addDataToDatabase with cancelled exercise
      //this.finishedExercises.push(cancelledExercise);
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    }
  }

  getRuningExercise() {
    return { ...this.runningExercise };
  }

  getCompletedOrCancelledExercises() {
    //return this.finishedExercises.slice(); //slice to get a new copy
    this.uiService.loadingStateChanged.next(true);
    this.firebaseSubscription.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .pipe(
        map((exercises: unknown[]) => exercises as Exercise[])
      )
      .subscribe((exercises: Exercise[]) => {
        this.uiService.loadingStateChanged.next(false);
        this.finishedExercisesChanged.next(exercises);
      }
      //, error => {
      //  console.log(error);
      //}
      ));
  }

  cancelSubscriptions() {
    this.firebaseSubscription.forEach(subscription => subscription.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
