// const dropdown = document.getElementById("format");
const image = document.getElementById("image");
const table = document.getElementById("datatable");
const search = document.getElementById("searchbar");
const surfingitem = document.getElementById("surfingitem");
const motoritem = document.getElementById("motoritem");
const select = document.getElementById("select");
const loader = document.querySelector("#loading");
let selectedOption;
let selectedValue;
let remember;
let ipAddress;

function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}
function hideLoading() {
    loader.classList.remove("display");
}
document.addEventListener('DOMContentLoaded', async() => {
    displayLoading();
    await getLocalIPAddress((ipAddress) => getResults(ipAddress));
    remember = localStorage.getItem("hobby");
    if(remember == "motorcycle"){
        select.innerHTML = "<i class='fa fa-motorcycle' style='margin-left: -10px;margin-right: 20px;'></i> Motorcycle <i class='fa fa-caret-down' style='margin-left:10px;'></i>";
        document.getElementById("display").style.backgroundImage = "url('./images/motor.png')";
        document.getElementById("wave").style.display = "none";
        document.getElementById("wave1").style.display = "none";
        document.getElementById("wave2").style.display = "none";
        document.getElementById("wave3").style.display = "none"
    }
});
surfingitem.addEventListener("click", (event) => {
    
    select.innerHTML = "<img src='./images/icons8-surfing-48.png' style='width: 20px; margin-left: -20px;margin-right: 20px;'></img>   Surfing <i class='fa fa-caret-down' style='margin-left:10px;'></i>"  
    document.getElementById("display").style.backgroundImage = "url('./images/surfing.png')";
    document.getElementById("wave").style.display = "block";
    document.getElementById("wave1").style.display = "block";
    document.getElementById("wave2").style.display = "block";
    document.getElementById("wave3").style.display = "block";
    localStorage.clear();
    localStorage.setItem("hobby", "surfing");

});
motoritem.addEventListener("click", (event) => {

    select.innerHTML = "<i class='fa fa-motorcycle' style='margin-left: -10px;margin-right: 20px;'></i> Motorcycle <i class='fa fa-caret-down' style='margin-left:10px;'></i>";
    document.getElementById("display").style.backgroundImage = "url('./images/motor.png')";
    document.getElementById("wave").style.display = "none";
    document.getElementById("wave1").style.display = "none";
    document.getElementById("wave2").style.display = "none";
    document.getElementById("wave3").style.display = "none";
    localStorage.clear();
    localStorage.setItem("hobby", "motorcycle");
});
search.addEventListener("keypress", (event) => {
    if(event.keyCode == 13){
        window.open(`https://trends.search-hub.co/v1/search/BREAP200923SRC?q=${search.value}`, '_blank');
    }
});
const searchBox = document.querySelector(".search_box");
searchBox.addEventListener("keypress", setQuery);
function setQuery(event) {
    if (event.keyCode == 13) {
        // keyCode 13 means ENTER
        getResults(searchBox.value);
        console.log(searchBox.value);
    }
}
function fetchHandler(event) {


    fetch(finalURL)
        .then(response => response.json())
        .then(json => {
            hideLoading()
            textOutput.innerText = json.contents.translated;
        })
}
function getResults(query) {
    console.log("start");
    console.log(query);
    displayLoading();
    fetch(`http://api.weatherapi.com/v1/marine.json?key=cf5a7a0f86d848a5967234752231909&q=${query}&aqi=no&days=3`)
        .then((response) => {
            return response.json();
        })
        .then(displayResults);
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=cf5a7a0f86d848a5967234752231909&q=${query}&aqi=no&days=3`)
        .then((response) => {
            return response.json();
        })
        .then(displayrainResults);
}
function displayResults(response) {
    hideLoading()
    console.log(response);

    let fday = document.querySelector(".first .day");
    fday.innerHTML = `${response.forecast.forecastday[0].date}`;

    let fwave = document.querySelector(".first .waveheight");
    fwave.innerHTML = `${response.forecast.forecastday[0].hour[10].swell_ht_mt} m`;

    let fwind = document.querySelector(".first .wind");
    fwind.innerHTML = `${response.forecast.forecastday[0].hour[10].wind_kph} km/h`;

    let ftem = document.querySelector(".first .temperature");
    ftem.innerHTML = `${response.forecast.forecastday[0].day.avgtemp_c} 'C`;

    let sday = document.querySelector(".second .day");
    sday.innerHTML = `${response.forecast.forecastday[1].date}`;
    
    let swave = document.querySelector(".second .waveheight");
    swave.innerHTML = `${response.forecast.forecastday[1].hour[10].swell_ht_mt} m`;

    let swind = document.querySelector(".second .wind");
    swind.innerHTML = `${response.forecast.forecastday[1].hour[10].wind_kph} km/h`;

    let stem = document.querySelector(".second .temperature");
    stem.innerHTML = `${response.forecast.forecastday[1].day.avgtemp_c} 'C`;

    let tday = document.querySelector(".third .day");
    tday.innerHTML = `${response.forecast.forecastday[2].date}`;

    let twave = document.querySelector(".third .waveheight");
    twave.innerHTML = `${response.forecast.forecastday[2].hour[10].swell_ht_mt} m`;

    let twind = document.querySelector(".third .wind");
    twind.innerHTML = `${response.forecast.forecastday[2].hour[10].wind_kph} km/h`;

    let ttem = document.querySelector(".third .temperature");
    ttem.innerHTML = `${response.forecast.forecastday[2].day.avgtemp_c} 'C`;
      
}
function displayrainResults(response) {
    console.log(response);

    let frain = document.querySelector(".first .rainratio");
    frain.innerHTML = `${response.forecast.forecastday[0].hour[10].chance_of_rain} %`;

    let srain = document.querySelector(".second .rainratio");
    srain.innerHTML = `${response.forecast.forecastday[1].hour[10].chance_of_rain} %`;  

    let train = document.querySelector(".third .rainratio");
    train.innerHTML = `${response.forecast.forecastday[2].hour[10].chance_of_rain} %`;  
}
function getLocalIPAddress(callback) {
    let xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          let response = JSON.parse(xhr.responseText);
          ipAddress = response.ip;
          console.log(ipAddress);  
          callback(ipAddress);
        } else {
          console.error('Request failed. Status:', xhr.status);
          callback(null);
        }
      }
    };
  
    xhr.open('GET', 'https://api.ipify.org?format=json');
    xhr.send();
  }
  
  // Usage
 