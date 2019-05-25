//global variable to store country data
let country;

//to execute the function on page load
window.onload=launch();

//function to get the country data
function launch(){
  var count = localStorage.getItem("country");
  var xs = "https://restcountries.eu/rest/v2/name/"+count+"?fullText=true";
  apiFetcher(xs);
}

//function to fetch from the RESTcountries API usng fetch()
async function apiFetcher(url){
    const response = await fetch(url);
    const data = await response.json();
    country = data;
    pager();
}

//function to set the data for respective HTML elements
function pager(){
  document.querySelector("#flag").src=country[0].flag;
  document.getElementById("name").innerHTML = "Country: "+country[0].name+" (+"+country[0].callingCodes+")";
  document.getElementById("capital").innerHTML ="Capital: "+country[0].capital;
  document.getElementById("popu").innerHTML ="Population: "+country[0].population;
  document.getElementById("region").innerHTML ="Region: "+country[0].region;
  document.getElementById("subregion").innerHTML ="Sub-Region: "+country[0].subregion;
  document.getElementById("currencies").innerHTML ="Currencies: "+country[0].currencies.map(c=> `${c.name} (${c.code})`).join(", ");
  document.getElementById("lang").innerHTML ="Major Languages Spoken: "+country[0].languages.map(l=> `${l.name}`).join(", ");
}

//onclick function for back button
function back(){
     window.history.back();
}
