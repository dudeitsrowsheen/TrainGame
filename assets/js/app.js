
        // Firebase
        $(function () {
            var firebaseConfig = {
                apiKey: "AIzaSyBCIOcXvw24rY1Bs8ir8Q4KZYm2rLqGXZw",
                authDomain: "traingame-daa39.firebaseapp.com",
                databaseURL: "https://traingame-daa39.firebaseio.com",
                projectId: "traingame-daa39",
                storageBucket: "traingame-daa39.appspot.com",
                messagingSenderId: "265622831910",
                appId: "1:265622831910:web:afad85fa90caec51"
            };

            firebase.initializeApp(firebaseConfig);

            var database = firebase.database();

            // var name = "";
            // var destination = "";
            // var firstTrain = "";
            // var frequency = "";
            // var firstTrainConverted = "";

            // Input from button click
            $("#button").on("click", function (event) {
                event.preventDefault();

                //values from the text boxes
                name = $("#name-input").val().trim();
                destination = $("#destination-input").val().trim();
                firstTrain = $("#firstTrain-input").val().trim();
                frequency = $("#frequency-input").val().trim();
                firstTrainConverted = moment(firstTrain, "HH:mm").format("HH:mm");
                console.log("pushing to database");

                // code for the push
                database.ref().push({
                    name: name,
                    destination: destination,
                    firstTrain: firstTrain,
                    firstTrainConverted: firstTrainConverted,
                    frequency: frequency,
                    dateAdded: firebase.database.ServerValue.TIMESTAMP
                });
            });
            //firebase watcher
            database.ref().on("child_added", function (snapshot) {
                // console.log("child added triggered");
                // storing the snapshot.val() in a variable for convenience
                var newTrain = snapshot.val().name;
                var newDestination = snapshot.val().destination;
                var newFirstTrain = snapshot.val().firstTrain;
                var newFrequency = snapshot.val().frequency;

                //Time converted not listed because it is an equation

                // Console.loging the last user's data
                // console.log(train.name);
                // console.log(train.destination);
                // console.log(train.firstTrain);
                // console.log(train.frequency);
                // console.log(firstTrainConverted);


                //First Train Time
                var firstTrainTime = moment(newFirstTrain, "HH:mm")
                console.log("firstTrainTime");
                // Current time
                var currentTime = moment();
                console.log("currentTime");
                //difference between times
                var difference = moment().diff(moment(firstTrainTime), "minutes");
                console.log("difference");
                //time apart (remainder)
                var remainder = difference % newFrequency;
                console.log("remainder");
                //minute until train
                var nextTrain = newFrequency - remainder;
                //next train
                var nextTrainTime = moment().add(nextTrain, "minutes");
                console.log("next train", nextTrainTime.format("MMM Do YY, HH:mm"));
                var catchTrain = moment(nextTrainTime).format("HH:mm");

                //display on page
                $("#all-display").append(
                    ' <tr><td>' + newTrain +
                    ' </td><td>' + newDestination +
                    ' </td><td>' + newFrequency +
                    ' </td><td>' + catchTrain +
                    ' </td><td>' + nextTrain + ' </td></tr>');



                // row.append($('<td>').text("MATH"));

                // row.append($('<td>').text("MORE MATH"));
                // $('.table').append(row);

                // var tRemainder = diffTime % tFrequency;
                // console.log(tRemainder);

                // Handle the errors
            }, function (errorObject) {
                console.log("Errors handled: " + errorObject.code);
            });
        });
