$(document).ready(function () {
    // Global vars
    var database = firebase.database();
    var ref = database.ref("trains");
    // 
    
    ref.on("value", getData, errData);
    $("#addTrainBtn").on("click", function (e) {
        e.preventDefault();
        // Sets vars that calls and trims the inputs from the user
        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrainTime = $("#firstTrainTimeInput").val().trim();
        var frequency = $("#frequencyInput").val().trim();
        // 
        // conversion
        firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
        currentTime = moment();
        diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        tRemainder = diffTime % frequency;
        minutesUntilTrain = frequency - tRemainder;
        nextTrain = moment().add(minutesUntilTrain, "minutes");
        nextTrainFormatted = moment(nextTrain).format("hh:mm");
        // 
        // Making a obj called train
        var train = {
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            nextTrainFormatted: nextTrainFormatted,
            minutesUntilTrain: minutesUntilTrain
        }
        ref.push(train);
        // 
        ref.once("value", getData, errData);
        // Clears the form
        $(".textbox").val("");
    })
    // fucntion that will break the object down into an array
    function getData(train) {
        var trains = train.val();
        var keys = Object.keys(trains);
        // 
        $("#tableBody").empty();
        for (i = 0; i < keys.length; i++) {
            var tRow = $("<tr>");
            var k = keys[i];
            // These 2 work fine its simple copy and paste to the dom
            $("<td scope='col'>").text(trains[k].trainName).appendTo(tRow);
            $("<td scope='col'>").text(trains[k].destination).appendTo(tRow);
            $("<td scope='col'>").text(trains[k].frequency).appendTo(tRow);
            // These I need to add math to prior to DOM injection
            $("<td scope='col'>").text(trains[k].nextTrainFormatted).appendTo(tRow);
            $("<td scope='col'>").text(trains[k].minutesUntilTrain).appendTo(tRow);

            $("#tableBody").append(tRow);
        };
    }

    function errData(err) {
        console.log("error")
        console.log(err);
    }
    // 
    // closing tag for document.ready
});