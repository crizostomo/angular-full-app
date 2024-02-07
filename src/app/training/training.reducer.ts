import { Action, createFeatureSelector, createSelector } from "@ngrx/store";
import { SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING, TrainingActions } from "./training.actions";
import { Exercise } from "./exercise.model";
import * as fromRoot from '../app.reducer';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activateTraining: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialExercise: Exercise = {
  id: '',
  name: '',
  duration: 0,
  calories: 0
};

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activateTraining: initialExercise
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        activateTraining: { ...state.availableExercises.find(ex => ex.id === action.payload) }
      };
    case STOP_TRAINING:
      return {
        ...state,
        activateTraining: initialExercise
      };
    default:
      return state;
  };
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActivateTraining = createSelector(getTrainingState, (state: TrainingState) => state.activateTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activateTraining != null);
