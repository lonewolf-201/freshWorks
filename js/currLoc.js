window.onload = currLoc();
async function currLoc(event){
  console.log("2nd js");
  var x =localStorage.getItem("country");
  const currloc = await fetch("http://ip-api.com/json/");
  const locResp = await currloc.json();
  let currC = locResp.country;
  searcher(currC);
}

function searcher(ab){
  var x="";
  var u = "https://restcountries.eu/rest/v2/name/";
  if(ab!==x){
    l=u.concat(ab);
    apiFetcher(l);
  }else{
    console.log("No country name entered");
  }
}

async function apiFetcher(url){
    const response = await fetch(url);
    //console.log(response.status);
    if(response.status===200){
    const data = await response.json();
    result = data;
    cards();
    }
    else if(response.status===404){
      console.log("404 error");
      alert("The country you entered cannot be found. Check the spelling and try again or try a different name for the same country")
    }
}

function cards(){
  var htm='<h3>Results Based On Current Location (location found By IP)</h3>';
  htm +='<div class="row">';
  for(let i=0;i<result.length;i++){
    htm += '<div class="column">';
    htm += '<div class="card" name="'+i+'" onclick="country('+i+')">';
    htm += "<br>";
    htm +='<img src="'+result[i].flag+'" style="width:100%">';
    htm += "<br>";
    htm +="<div class='container'>";
    htm += "<br>";
    htm +="<h4><b>"+result[i].name+"</b></h4>";
    htm += "<br>";
    htm +="</div>";
    htm += "<br>";
    htm +="</div>";
    htm +="</div>";
  }
  htm +="</div>";
  var v = document.getElementById("scrolling-wrapper");
  v.innerHTML = htm;

}
