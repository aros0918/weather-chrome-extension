const apiKey = {
    // weatherKey: '9e6b52dd1ba741fcb5b62411230410',
    weatherKey: '160f961431c641d59dd75510231810',
    key: 'apple',
}
let sday = document.querySelector(".second .day");
const image = document.getElementById("image");
const table = document.getElementById("datatable");
const search = document.getElementById("searchbar");
const surfingitem = document.getElementById("surfingitem");
const motoritem = document.getElementById("motoritem");
const cycleitem = document.getElementById("cycleitem");
const hikingitem = document.getElementById("hikingitem");
const select = document.getElementById("select");
const loader = document.querySelector("#loading");
const toast1 = document.getElementById("toast1");
const toast2 = document.getElementById("toast2");
const progress1 = document.getElementById("progress1");
const progress2 = document.getElementById("progress2");
let selectedOption;
let selectedValue;
let remember;
let ipAddress;

let timer1, timer2, timer3;

function displayLoading() {
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
        setTimeout(() => {
            if(sday.innerHTML == ''){
                toast2.style.display = "block";
    
                toast2.classList.add("active");
                progress2.classList.add("active");
    
                timer1 = setTimeout(() => {
                    toast2.classList.remove("active");
                }, 5000); 
    
                timer2 = setTimeout(() => {
                    progress2.classList.remove("active");
                    toast2.style.display = "none";
                }, 5300);
            }
        }, 5000)
    }, 6000);
}
function displayLoading1() {
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
       
    }, 6000);
}

function hideLoading() {
    loader.classList.remove("display");
}
document.addEventListener('DOMContentLoaded', async() => {
    displayLoading();

    await getLocalIPAddress((ipAddress) => getResults(ipAddress));
    toast1.style.display = "none";
    toast2.style.display = "none";
    remember = localStorage.getItem("hobby");
    if(remember == "motorcycle"){
        select.innerHTML = "<i class='fa fa-motorcycle' style='margin-left: -10px;margin-right: 10px;'></i> Motorcycle <i class='fa fa-caret-down' style='margin-left:10px;'></i>";
        document.getElementById("display").style.backgroundImage = "url('./images/motor.webp')";
        document.getElementById("wave").style.display = "none";
        document.getElementById("wave1").style.display = "none";
        document.getElementById("wave2").style.display = "none";
        document.getElementById("wave3").style.display = "none"
    }
    if(remember == "bicycle"){
        select.innerHTML = "<i class='fa fa-bicycle' style='margin-left: 0px;margin-right: 20px;'></i> Cyclist <i class='fa fa-caret-down' style='margin-left:20px;'></i>";
        document.getElementById("display").style.backgroundImage = "url('./images/bicycle.webp')";
        document.getElementById("wave").style.display = "none";
        document.getElementById("wave1").style.display = "none";
        document.getElementById("wave2").style.display = "none";
        document.getElementById("wave3").style.display = "none";
    }
    if(remember == "hiking"){
        select.innerHTML = "<i class='fas fa-hiking' style='margin-left: 0px;margin-right: 20px;'></i> &nbsp;&nbsp;Hiking <i class='fa fa-caret-down' style='margin-left:20px;'></i>";
        document.getElementById("display").style.backgroundImage = "url('./images/hiking.webp')";
        document.getElementById("wave").style.display = "none";
        document.getElementById("wave1").style.display = "none";
        document.getElementById("wave2").style.display = "none";
        document.getElementById("wave3").style.display = "none";
    }
});
surfingitem.addEventListener("click", (event) => {
    
    select.innerHTML = "<img src='./images/icons8-surfing-48.png' style='width: 20px; margin-left: -20px;margin-right: 20px;'></img>   Surfing <i class='fa fa-caret-down' style='margin-left:10px;'></i>"  
    document.getElementById("display").style.backgroundImage = "url('./images/surfing.webp')";
    document.getElementById("wave").style.display = "block";
    document.getElementById("wave1").style.display = "block";
    document.getElementById("wave2").style.display = "block";
    document.getElementById("wave3").style.display = "block";
    localStorage.clear();
    localStorage.setItem("hobby", "surfing");

});
motoritem.addEventListener("click", (event) => {

    select.innerHTML = "<i class='fa fa-motorcycle' style='margin-left: -10px;margin-right: 10px;'></i> Motorcycle <i class='fa fa-caret-down' style='margin-left:10px;'></i>";
    document.getElementById("display").style.backgroundImage = "url('./images/motor.webp')";
    document.getElementById("wave").style.display = "none";
    document.getElementById("wave1").style.display = "none";
    document.getElementById("wave2").style.display = "none";
    document.getElementById("wave3").style.display = "none";
    localStorage.clear();
    localStorage.setItem("hobby", "motorcycle");
});
cycleitem.addEventListener("click", (event) => {

    select.innerHTML = "<i class='fa fa-bicycle' style='margin-left: 0px;margin-right: 20px;'></i> Cyclist <i class='fa fa-caret-down' style='margin-left:20px;'></i>";
    document.getElementById("display").style.backgroundImage = "url('./images/bicycle.webp')";
    document.getElementById("wave").style.display = "none";
    document.getElementById("wave1").style.display = "none";
    document.getElementById("wave2").style.display = "none";
    document.getElementById("wave3").style.display = "none";
    localStorage.clear();
    localStorage.setItem("hobby", "bicycle");
});
hikingitem.addEventListener("click", (event) => {

    select.innerHTML = "<i class='fas fa-hiking' style='margin-left: 0px;margin-right: 20px;'></i> &nbsp;&nbsp;Hiking <i class='fa fa-caret-down' style='margin-left:20px;'></i>";
    document.getElementById("display").style.backgroundImage = "url('./images/hiking.webp')";
    document.getElementById("wave").style.display = "none";
    document.getElementById("wave1").style.display = "none";
    document.getElementById("wave2").style.display = "none";
    document.getElementById("wave3").style.display = "none";
    localStorage.clear();
    localStorage.setItem("hobby", "hiking");
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
        getResults(searchBox.value);
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
    console.log(query);
    displayLoading1();
    fetch(`http://api.weatherapi.com/v1/marine.json?key=${apiKey.weatherKey}&q=${query}&aqi=no&days=3`)
        .then((response) => {
            return response.json();
        })
        .then(displayResults)
        .catch((err) => {
            toast1.style.display = "block";

            toast1.classList.add("active");
            progress1.classList.add("active");

            timer1 = setTimeout(() => {
                toast1.classList.remove("active");
            }, 5000); 

            timer2 = setTimeout(() => {
                progress1.classList.remove("active");
                toast1.style.display = "none";
            }, 5300);

            timer3 = setTimeout(() => {
                getResultsCalifornia();
            }, 6000)

   
        });
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey.weatherKey}&q=${query}&aqi=no&days=3`)
        .then((response) => {
            return response.json();
        })
        .then(displayrainResults)
        .catch((err) => {
            toast1.style.display = "block";
    
            toast1.classList.add("active");
            progress1.classList.add("active");

            timer1 = setTimeout(() => {
                toast1.classList.remove("active");
                
            }, 5000); //1s = 1000 milliseconds

            timer2 = setTimeout(() => {
                progress1.classList.remove("active");
                toast1.style.display = "none";
            }, 5300);
      
        });
   
        
    }
function getResultsCalifornia() {
    console.log("California");
    displayLoading1();
    fetch(`http://api.weatherapi.com/v1/marine.json?key=${apiKey.weatherKey}&q=149.115.246.250&aqi=no&days=3`)
        .then((response) => {
            return response.json();
        })
        .then(displayResults)
        .catch((err) => {
            toast2.style.display = "block";

            toast2.classList.add("active");
            progress2.classList.add("active");

            timer1 = setTimeout(() => {
                toast2.classList.remove("active");
            }, 5000); 

            timer2 = setTimeout(() => {
                progress2.classList.remove("active");
                toast2.style.display = "none";
            }, 5300);
        });
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey.weatherKey}&q=149.115.246.250&aqi=no&days=3`)
        .then((response) => {
            return response.json();
        })
        .then(displayrainResults)
        .catch((err) => {
            toast2.style.display = "block";
  
            toast2.classList.add("active");
            progress2.classList.add("active");

            timer1 = setTimeout(() => {
                toast2.classList.remove("active");
                
            }, 5000); //1s = 1000 milliseconds

            timer2 = setTimeout(() => {
                progress2.classList.remove("active");
                toast2.style.display = "none";
            }, 5300);
        });
    }

function displayResults(response) {
    console.log(response)
    hideLoading();
    searchBox.value = response.location.name;
    let fday = document.querySelector(".first .day");
    fday.innerHTML = `${response.forecast.forecastday[0].date}`;

    let fwave = document.querySelector(".first .waveheight");
    fwave.innerHTML = `${response.forecast.forecastday[0].hour[10].swell_ht_mt} m`;

    let fwind = document.querySelector(".first .wind");
    fwind.innerHTML = `${response.forecast.forecastday[0].hour[10].wind_kph} km/h`;

    let ftem = document.querySelector(".first .temperature");
    ftem.innerHTML = `${response.forecast.forecastday[0].day.avgtemp_c} 'C`;

    sday = document.querySelector(".second .day");
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

const closeIcon1 = document.getElementById("close1");
const closeIcon2 = document.getElementById("close2");

closeIcon1.addEventListener("click", () => {
    toast1.style.display = "none";
    toast1.classList.remove("active");

    setTimeout(() => {
        progress1.classList.remove("active");

    }, 300);

    clearTimeout(timer1);
    clearTimeout(timer2);
});
closeIcon2.addEventListener("click", () => {
    toast2.style.display = "none";
    toast2.classList.remove("active");

    setTimeout(() => {
        progress2.classList.remove("active");

    }, 300);

    clearTimeout(timer1);
    clearTimeout(timer2);
});
 