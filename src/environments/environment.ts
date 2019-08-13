// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    auth: {
      apiKey: "AIzaSyAuIVmLZK1SszZD0q0Ki8Y8JqlvPcyH7U8",
      authDomain: "home-sync-128.firebaseapp.com",
      databaseURL: "https://home-sync-128.firebaseio.com",
      projectId: "home-sync-128",
      storageBucket: "home-sync-128.appspot.com",
      messagingSenderId: "608130698932",
      appId: "1:608130698932:web:93b8cacb2eddb963"
    },
    path: 'homeSynce',
    events: {
      name: "events",
      run: {
        name: "run",
        doc: {
          action: 'action',
          status: 'status'
        }
      },
      listener: {
        name: "listener",
        doc: {
          doorPatio: "doorPatio"
        }
      }
    }
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
