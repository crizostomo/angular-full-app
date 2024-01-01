import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  exerciseChanged = new Subject<Exercise | null>();
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8},
  ];

  private runningExercise: Exercise | null = null;
  private exercises: Exercise[] = [];

  getAvailableExerces() {
    return this.availableExercises.slice(); //slice creates a real copy
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
        calories: this.runningExercise.duration * (progress / 100),
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

  constructor() { }
}
