// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    databaseURL: 'https://quiz-ufjf.firebaseio.com',
    apiKey: 'AIzaSyDxwqmD__Ei32AKvk3WdHjJC_9eWr28YFM',
    authDomain: 'quiz-ufjf.firebaseapp.com',
    projectId: 'quiz-ufjf',
    storageBucket: 'quiz-ufjf.appspot.com',
    messagingSenderId: '323020714945',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
