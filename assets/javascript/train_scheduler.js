
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

    // Clearing all the textboxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");

});



// Get all the records from the Firebase database and display that info
// in the table

database.ref().on("child_added", function (snapshot) {


    // Need to calculte Next Arrival (nextArrival) and Minutes Away (minutesAway)
    // using data from the Firebase database 

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(snapshot.val().firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % snapshot.val().frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = snapshot.val().frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



    console.log(snapshot.val());

    $("table tbody").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + moment(nextTrain).format('hh:mm A') + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});