import { Action } from "@ngrx/store";
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

export function authReducer(state = initialState, action: TrainingActions) {
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
        activateTraining: action.payload
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

export const getAvailableExercises = (state: TrainingState) => state.availableExercises;
export const getFinishedExercises = (state: TrainingState) => state.finishedExercises;
export const getActivateTraining = (state: TrainingState) => state.activateTraining;
