import firebase from 'firebase';


var config = {
    apiKey: "AIzaSyDt9v5V_PaCC3iAloy6UWWly_KcQIRjEU4",
    authDomain: "tic-tac-toe-opinov8.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-opinov8.firebaseio.com",
    projectId: "tic-tac-toe-opinov8",
    storageBucket: "tic-tac-toe-opinov8.appspot.com",
    messagingSenderId: "651417594632"
};
firebase.initializeApp(config);
const database = firebase.database();
console.log("----|> database\", database)
export default database;