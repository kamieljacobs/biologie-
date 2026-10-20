/* Werksessies · instellingen (Biologie bij Kamiel)
   FIREBASE = het firebaseConfig-blok uit de Firebase-console (project edutool).
   DOCENT_UID = de User UID van Kamiels docentaccount (Authentication → Users).
   Deze gegevens zijn niet geheim: de beveiliging zit in de databaseregels (sessie/database.rules.json).
   Zolang FIREBASE null is, draaien de pagina's in demomodus (alles in deze browser, test met twee tabbladen). */
export const FIREBASE = {
  apiKey: 'AIzaSyDpV3bCs7TKrUY9GY36Zt2UYBvKpuRJ3sU',
  authDomain: 'edutool-4b00b.firebaseapp.com',
  databaseURL: 'https://edutool-4b00b-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'edutool-4b00b',
  storageBucket: 'edutool-4b00b.firebasestorage.app',
  messagingSenderId: '102847949138',
  appId: '1:102847949138:web:7244b422a036fa7ae1328b'
};
export const DOCENT_UID = 'wZevu7kFPFd7iSloWPXIzyqKQ7m2';
