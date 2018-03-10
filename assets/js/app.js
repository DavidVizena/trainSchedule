$(document).ready(function () {


    $("#addTrainBtn").on("click", function (e) {
        e.preventDefault();
        // Sets vars that calls and trims the inputs from the user
        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrainTime = $("#firstTrainTimeInput").val().trim();
        var frequency = $("#frequencyInput").val().trim();
        // 
        // Stores all vars into local storage
        localStorage.setItem("item-trainName", trainName);
        localStorage.setItem("item-destination", destination);
        localStorage.setItem("item-firstTrainTime", firstTrainTime);
        localStorage.setItem("item-frequency", frequency);
        // 
    })

    function makeRow() {
        var tBody = $("tbody");
        var tRow = $("<tr>");
        // makes a td and gets item from local 
        var trainName = $("<td>").text(localStorage.getItem('item-trainName'));
        var destination = $("<td>").text(localStorage.getItem('item-destination'));
        var firstTrainTime = $("<td>").text(localStorage.getItem('item-firstTrainTime'));
        var frequency = $("<td>").text(localStorage.getItem('item-frequency'));
        // 
        // Append to page
        tRow.append(trainName, destination, firstTrainTime, frequency);
        tBody.append(tRow);
        // 
    };
    makeRow();


    // closing tag for document.ready
});