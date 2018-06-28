# Train_Scheduler

This train schedule application incorporates Firebase to host arrival and departure data.

Moment.js is also used to manipulate time data.

The train administrators submit the following:
    *   Train Name
    *   Destination
    *   First Train Time -- in military time
    *   Frequency -- in minutes

The code calculates when the next train will arrive and the minutes away the train is
away from arriving, relative to the current time.
