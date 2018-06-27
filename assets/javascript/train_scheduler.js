
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDfzcxqDxCDvRcqGK5PHB4CcrXM3JjTCCw",
    authDomain: "train-schedular-dbffc.firebaseapp.com",
    databaseURL: "https://train-schedular-dbffc.firebaseio.com",
    projectId: "train-schedular-dbffc",
    storageBucket: "",
    messagingSenderId: "597374407977"
};
firebase.initializeApp(config);

// A variable to reference the database.
var database = firebase.database();


// When someone submits the form

$("#submit-train").on("click", function (e) {
    e.preventDefault();
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var trainFirstTime = $("#first-train-time").val().trim();
    var trainFrequency = $("#frequency").val().trim();


    // Get the user input from the train-name, destination, first-train-time,
    // and frequency fields and put it into the Firebase database

    database.ref().push({
        name: trainName,
        destination: trainDestination,
        firstTime: trainFirstTime,
        frequency: trainFrequency
    });

});

// Need to calculte Next Arrival (nextArrival) and Minutes Away (minutesAway) - these have
// all ready been put into the table below


// Get all the records from the Firebase database and display that info
// in the table

database.ref().on("child_added", function (snapshot) {

    console.log(snapshot.val());

    $("table tbody").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().nextArrival + "</td><td>" + snapshot.val().minutesAway +"</td></tr>");

});