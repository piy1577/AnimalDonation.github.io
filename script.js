var places;
var search = document.getElementById("search");
var autocomplete = document.getElementById("autocomplete");

fetch("./place.json")
    .then((res) => res.json())
    .then((data) => {
        places = data;
    });

search.addEventListener("focusin", () => {
    document.querySelector("#autocomplete").style.display = "block";
});

search.addEventListener("focusout", () => {
    document.querySelector("#autocomplete").style.display = "none";
});

search.addEventListener("input", () => {
    let value = search.value;
    const regex = new RegExp(`^${value}`, "gi");
    let matchesStates = places.filter((data) => {
        return data.state.match(regex);
    });
    let matchDistricts = [];
    places.map((data) => {
        let matches = data.districts.filter((district) => {
            return district.match(regex);
        });
        matches.map((datas) => {
            matchDistricts.push(`${datas} (${data.state})`);
        });
    });
    matchDistricts.sort();
    autocomplete.innerHTML = `
        <h1>States</h1>

        ${matchesStates
            .map((data) => `<div class="data">${data.state}</div>`)
            .join("")}
        
        <h1>District</h1>
        
        ${matchDistricts
            .map((district) => `<div class="data">${district}</div>`)
            .join("")}


        `;
});
