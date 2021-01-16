// from data.js
var tableData = data;
// Global Variables
var keys = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]
var tbody = d3.select("tbody");
// Buttons
var btnFilter = d3.select("#filter-btn");
var btnReset = d3.select("#reset-btn");
// Input Fields
var fieldDateTime = d3.select("#datetime");
var fieldCity = d3.select("#city");
var fieldState = d3.select("#state");
var fieldCountry = d3.select("#country");
var fieldShape = d3.select("#shape");

// Populate the Table Function
var populate = (inputData) => {
    inputData.forEach(sighting => {
        var row = tbody.append("tr");
        keys.forEach(key => row.append("td").text(sighting[key]));
    });
}

// Initial fill in the table
populate(tableData);

// Reset Button Handling
btnReset.on("click", () => {
    // clear out the table
    tbody.html("");

    // populate the table
    populate(tableData);
    console.log("Reset Button Pushed")
})

// Utility Function
function empty(data)
{
    if (typeof(data) == 'number' || typeof(data) == 'boolean') {
        return false;
    }
    if (typeof(data) == 'undefined' || data === null) {
        return true;
    }
    if (typeof(data.length) != 'undefined') {
        return data.length == 0;
    }
    var count = 0;
    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            count++;
        }
    }
    return count == 0;
}

// Filter Sightings
btnFilter.on("click", () => {
    d3.event.preventDefault();

    // Set up a filter object with the input data
    var filter = {
        datetime: fieldDateTime.property("value").trim(),
        city: fieldCity.property("value").toLowerCase().trim(),
        state: fieldState.property("value").toLowerCase().trim(),
        country: fieldCountry.property("value").toLowerCase().trim(),
        shape: fieldShape.property("value").toLowerCase().trim()
    };

    var filteredData = tableData;

    // Run each filter on the data
    for (var key in filter) {
        if (! empty(filter[key])) {
            filteredData = filteredData.filter(sighting => filter[key] === sighting[key]);
        }
    }

    // clear out the table
    tbody.html("");

    // populate the table
    if (filteredData.length !== 0) {
        populate(filteredData);
    } else {
        var row = tbody.append("tr");
        row.append("td").text("Found no results");
        for (var i=0; i<keys.length-1; i++) {
            row.append("td").text(" ");
        }
    }
    console.log("Filter Button Pushed")
})