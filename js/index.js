console.log("1st js");
let currCountry;
//Global variable for storing card data
let result;
var html="";
//function to display cards on back button click
window.addEventListener("pageshow", function(event){
  var histTrav=event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );
  if(histTrav){
    var v = document.getElementById("scrolling-wrapper");
    console.log("1");
    getDat();
  }
});

//function to capture enter key press in search box
function a(e){
  var n= (e.keyCode?e.keyCode : e.which);
  //13 is the keycode value or ascii value of Enter
  var r = document.getElementById("search").value;
  if(n==13){
    if(r!==""){
      getDat();
    }else{
      alert("Search field is empty");
    }
  }
}

//function to get data from search box
function getDat(){
  document.getElementById("scrolling-wrapper").innerHTML = null;
  html="";
  var r = document.getElementById("search").value;
  search(r);

}

//function to init the search from the input string
function search(ab){
  var x="";
  var u = "https://restcountries.eu/rest/v2/name/";
  if(ab!==x){
    l=u.concat(ab);
    apiFetch(l);
  }else{
    console.log("No country name entered");
  }
}


//function to fetch data from given url
async function apiFetch(url){
    const response = await fetch(url);
    //console.log(response.status);
    if(response.status===200){
    const data = await response.json();
    result = data;
    carder();
    }
    else if(response.status===404){
      console.log("404 error");
      alert("The country you entered cannot be found. Check the spelling and try again or try a different name for the same country")
    }
}

//function to create and display cards in index.html
function carder(){
  html +='<div class="row">';
  for(let i=0;i<result.length;i++){
    html += '<div class="column">';
    html += '<div class="card" name="'+i+'" onclick="country('+i+')">';
    html += "<br>";
    html +='<img src="'+result[i].flag+'" style="width:100%">';
    html += "<br>";
    html +="<div class='container'>";
    html += "<br>";
    html +="<h4><b>"+result[i].name+"</b></h4>";
    html += "<br>";
    html +="</div>";
    html += "<br>";
    html +="</div>";
    html +="</div>";
  }
  html +="</div>";
  var v = document.getElementById("scrolling-wrapper");
  v.innerHTML = html;

}

//function to show the page of country
function country(x){
  //console.log(result[x]);
  localStorage.setItem("country",result[x].name);
  window.location="country.html";
}

//
async function currLoc(){
  var x = document.getElementById("scrolling-wrapper");
  x.innerHTML = null;
  html="";
  const currloc = await fetch("http://ip-api.com/json/");
  const locResp = await currloc.json();
  let currC = locResp.country;
  search(currC);
}
