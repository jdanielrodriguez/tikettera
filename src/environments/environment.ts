// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://localhost:86',
  token: 'TOKEN',
  salt: 'base64:vh8QteX+yD8UP0p1EgmCmx5nTdHggwVvo6M0bsdvMfU=',
  firebaseConfig: {
    apiKey: 'AIzaSyDl9BsW-t9Lx9cDTbFu6jEVdJH0VP-4KUs',
    authDomain: 'ordenes-wiki.firebaseapp.com',
    databaseURL: 'https://ordenes-wiki.firebaseio.com',
    projectId: 'ordenes-wiki',
    storageBucket: 'ordenes-wiki.appspot.com',
    messagingSenderId: '643711483900'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
