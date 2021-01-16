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
    // Get the input data
    var inpDate = fieldDateTime.property("value").trim();
    var inpCity = fieldCity.property("value").toLowerCase().trim();
    var inpState = fieldState.property("value").toLowerCase().trim();
    var inpCountry = fieldCountry.property("value").toLowerCase().trim();
    var inpShape = fieldShape.property("value").toLowerCase().trim();

    // Set up a filter object
    var filter = {
        datetime: inpDate,
        city: inpCity,
        state: inpState,
        country: inpCountry,
        shape: inpShape
    };

    var filteredData = tableData;

    for (var key in filter) {
        if (! empty(filter[key])) {
            filteredData = filteredData.filter(sighting => filter[key] === sighting[key])
        }
    }

    // clear out the table
    tbody.html("");
    // populate the table
    populate(filteredData);
    console.log("Filter Button Pushed")
})