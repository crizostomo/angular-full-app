# Traning

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## How to Set Firebase?

- Create an account on https://firebase.google.com/
- Create a Firebase Database and a Collection, e.g. 'availableExercises'
- Add your values, e.g. [calories: 15 (number), duration: 180 (number), name: "Touch Toes" (string)]
- npm i -g firebase-tools
- firebase login (log in  with your firebase credentials)
- ng add @angular/fire
- select firestore and authentication with space, and click enter to continue, select your project and your app.
- in your environment file add (you get it from Firebase - general project vision): 

const firebaseConfig = {
  apiKey: <your-value>,
  authDomain: <your-value>,
  databaseURL: <your-value>,
  projectId: <your-value>,
  storageBucket: <your-value>,
  messagingSenderId: <your-value>,
  appId: <your-value>,
  measurementId: <your-value>,
};

### How to import Firebase AngularFireModule and AngularFireAuthModule in your app.module?
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

  imports: [
    ...,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
