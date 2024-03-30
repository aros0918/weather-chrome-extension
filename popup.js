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
const searchBox = document.querySelector(".search_box");

let selectedOption;
let selectedValue;
let remember;
let ipAddress;
let timer1, timer2, timer3;
let latitude;
let longitude;
let city;
async function getLatLong(ipAddress){
    ipAddress = ipAddress;
    await getGeolocationFromIP(ipAddress, function(geoData) {
        city = geoData.city;
        searchBox.value = city;
        latitude = geoData.latitude;
        longitude = geoData.longitude;
        addDataPoint();
    });
}
searchBox.addEventListener("keypress", setQuery);
function setQuery(event) {
    if (event.keyCode == 13) {
        // getResults(searchBox.value);
    }
}
document.addEventListener('DOMContentLoaded', async() => {
    // displayLoading();
    getDataFromStorage(function(dataArray1) {
        const currentDate = getCurrentDay(0);
        const currentDate1 = getCurrentDay(1);
        const currentDate2 = getCurrentDay(2);
        const foundItem = dataArray1.find(item => item.date === currentDate);
        if (foundItem) {
            let fday = document.querySelector(".first .day");
            fday.innerHTML = `${foundItem.date}`;

            let fwave = document.querySelector(".first .wind");
            fwave.innerHTML = `${foundItem.value.wind.max.speed} km/h`;

            let fwind = document.querySelector(".first .temperature");
            fwind.innerHTML = `${parseFloat(foundItem.value.temperature.max  - 273.15).toFixed(1)} 'C`;

            let ftem = document.querySelector(".first .cloud_cover");
            ftem.innerHTML = `${foundItem.value.cloud_cover.afternoon} %`;
        } 
        const foundItem1 = dataArray1.find(item => item.date === currentDate1);
        if (foundItem1) {
            let sday = document.querySelector(".second .day");
            sday.innerHTML = `${foundItem1.date}`;

            let swave = document.querySelector(".second .wind");
            swave.innerHTML = `${foundItem1.value.wind.max.speed} km/h`;

            let swind = document.querySelector(".second .temperature");
            swind.innerHTML = `${parseFloat(foundItem1.value.temperature.max - 273.15).toFixed(1)} 'C`;

            let stem = document.querySelector(".second .cloud_cover");
            stem.innerHTML = `${foundItem1.value.cloud_cover.afternoon} %`;
        } 
        const foundItem2 = dataArray1.find(item => item.date === currentDate2);
        if (foundItem2) {
            let tday = document.querySelector(".third .day");
            tday.innerHTML = `${foundItem2.date}`;

            let twave = document.querySelector(".third .wind");
            twave.innerHTML = `${foundItem2.value.wind.max.speed} km/h`;

            let twind = document.querySelector(".third .temperature");
            twind.innerHTML = `${parseFloat(foundItem2.value.temperature.max  - 273.15).toFixed(1)} 'C`;

            let ttem = document.querySelector(".third .cloud_cover");
            ttem.innerHTML = `${foundItem2.value.cloud_cover.afternoon} %`;
        } 
        

    });
    toast1.style.display = "none";
    toast2.style.display = "none";
    remember = localStorage.getItem("hobby");
    if(remember == "motorcycle"){
        select.innerHTML = "<i class='fa fa-motorcycle' style='margin-left: -10px;margin-right: 10px;'></i> Motorcycle <i class='fa fa-caret-down' style='margin-left:10px;'></i>";
        document.getElementById("display").style.backgroundImage = "url('./images/motor.webp')";
    }
    if(remember == "bicycle"){
        select.innerHTML = "<i class='fa fa-bicycle' style='margin-left: 0px;margin-right: 20px;'></i> Cyclist <i class='fa fa-caret-down' style='margin-left:20px;'></i>";
        document.getElementById("display").style.backgroundImage = "url('./images/bicycle.webp')";
    }
    if(remember == "hiking"){
        select.innerHTML = "<i class='fas fa-hiking' style='margin-left: 0px;margin-right: 20px;'></i> &nbsp;&nbsp;Hiking <i class='fa fa-caret-down' style='margin-left:20px;'></i>";
        document.getElementById("display").style.backgroundImage = "url('./images/hiking.webp')";
    }
});

function getCurrentDay(number){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    day = day + number;
    if (month == 1){
        if(day > 31){
            month = 2;
            day = (day - 31);
        }
    }
    if (month == 2){
        if(day > 28){
            month = 3;
            day = (day - 28);
        }
    }
    if (month == 3){
        if(day > 31){
            month = 4;
            day = (day - 31);
        }
    }
    if (month == 4){
        if(day > 30){
            month = 5;
            day = (day - 30);
        }
    }
    if (month == 5){
        if(day > 31){
            month = 6;
            day = (day - 31);
            
        }
    }
    if (month == 6){
        if(day > 30){
            month = 7;
            day = (day - 30);
            
        }
    }
    if (month == 7){
        if(day > 31){
            month = 8;
            day = (day - 31);
            
        }
    }
    if (month == 8){
        if(day > 31){
            month = 9;
            day = (day - 31);
            
        }
    }
    if (month == 9){
        if(day > 30){
            month = 10;
            day = (day - 30);
            
        }
    }
    if (month == 10){
        if(day > 31){
            month = 11;
            day = (day - 31);
            
        }
    }
    if (month == 11){
        if(day > 30){
            month = 12;
            day = (day - 30);
            
        }
    }
    if (month == 12){
        if(day > 31){
            year = year + 1;
            month = 1;
            day = (day - 31);
        }
    }

    if (month < 10) {
        month = `0${month}`;
    }
    if (day < 10) {
        day = `0${day}`;
    }

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate)
    return formattedDate
} 
// Function to retrieve data from Chrome storage
function getDataFromStorage(callback) {
    chrome.storage.local.get('dataArray', function(result) {
        const dataArray = result.dataArray || [];
        callback(dataArray);
    });
}
function hideLoading() {
    loader.classList.remove("display");
}
// Function to save data to Chrome storage
function saveDataToStorage(dataArray) {
    chrome.storage.local.set({ 'dataArray': dataArray });
}

async function getResults(lat, lon, date) {
    displayLoading1();
    let data;
    await fetch(`https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&appid=fb9577ea5625ed8359e2cc81ede9d2d2&date=${date}`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            data = response;
            console.log(response);
        })
        .catch((err) => {
            console.log(err)
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
    return data;        
}
// Function to add new data point
function addDataPoint() {
    getDataFromStorage(function(dataArray) {
        const currentDate = getCurrentDay(0);
        const currentDate1 = getCurrentDay(1);
        const currentDate2 = getCurrentDay(2);

        const addDataAndSave = (date) => {
            getResults(latitude, longitude, date)
                .then((result) => {
                    dataArray.push({ date: date, value: result });
                    saveDataToStorage(dataArray);
                    console.log(result)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        };

        if (!dataArray.some(item => item.date === currentDate)) {
            addDataAndSave(currentDate);
        }

        if (!dataArray.some(item => item.date === currentDate1)) {
            addDataAndSave(currentDate1);
        }

        if (!dataArray.some(item => item.date === currentDate2)) {
            addDataAndSave(currentDate2);
        }
    });
    setTimeout(() => {
        getDataFromStorage(function(dataArray1) {
            const currentDate = getCurrentDay(0);
            const currentDate1 = getCurrentDay(1);
            const currentDate2 = getCurrentDay(2);
            const foundItem = dataArray1.find(item => item.date === currentDate);
            if (foundItem) {
                let fday = document.querySelector(".first .day");
                fday.innerHTML = `${foundItem.date}`;

                let fwave = document.querySelector(".first .wind");
                fwave.innerHTML = `${foundItem.value.wind.max.speed} km/h`;

                let fwind = document.querySelector(".first .temperature");
                fwind.innerHTML = `${parseFloat(foundItem.value.temperature.max  - 273.15).toFixed(1)} 'C`;

                let ftem = document.querySelector(".first .cloud_cover");
                ftem.innerHTML = `${foundItem.value.cloud_cover.afternoon} %`;
            } 
            const foundItem1 = dataArray1.find(item => item.date === currentDate1);
            if (foundItem1) {
                let sday = document.querySelector(".second .day");
                sday.innerHTML = `${foundItem1.date}`;

                let swave = document.querySelector(".second .wind");
                swave.innerHTML = `${foundItem1.value.wind.max.speed} km/h`;

                let swind = document.querySelector(".second .temperature");
                swind.innerHTML = `${parseFloat(foundItem1.value.temperature.max - 273.15).toFixed(1)} 'C`;

                let stem = document.querySelector(".second .cloud_cover");
                stem.innerHTML = `${foundItem1.value.cloud_cover.afternoon} %`;
            } 
            const foundItem2 = dataArray1.find(item => item.date === currentDate2);
            if (foundItem2) {
                let tday = document.querySelector(".third .day");
                tday.innerHTML = `${foundItem2.date}`;

                let twave = document.querySelector(".third .wind");
                twave.innerHTML = `${foundItem2.value.wind.max.speed} km/h`;

                let twind = document.querySelector(".third .temperature");
                twind.innerHTML = `${parseFloat(foundItem2.value.temperature.max  - 273.15).toFixed(1)} 'C`;

                let ttem = document.querySelector(".third .cloud_cover");
                ttem.innerHTML = `${foundItem2.value.cloud_cover.afternoon} %`;
            } 
            

        });
    }, 3000);
}
// Call addDataPoint function to add data daily
            
function displayLoading() {
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
        setTimeout(() => {
        }, 3000)
    }, 4000);
}
function displayLoading1() {
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 4000);
}


surfingitem.addEventListener("click", (event) => {
    
    select.innerHTML = "<img src='./images/icons8-surfing-48.png' style='width: 20px; margin-left: -20px;margin-right: 20px;'></img>   Surfing <i class='fa fa-caret-down' style='margin-left:10px;'></i>"  
    document.getElementById("display").style.backgroundImage = "url('./images/surfing.webp')";
    localStorage.clear();
    localStorage.setItem("hobby", "surfing");

});
motoritem.addEventListener("click", (event) => {
    select.innerHTML = "<i class='fa fa-motorcycle' style='margin-left: -10px;margin-right: 10px;'></i> Motorcycle <i class='fa fa-caret-down' style='margin-left:10px;'></i>";
    document.getElementById("display").style.backgroundImage = "url('./images/motor.webp')";
    localStorage.clear();
    localStorage.setItem("hobby", "motorcycle");
});
cycleitem.addEventListener("click", (event) => {

    select.innerHTML = "<i class='fa fa-bicycle' style='margin-left: 0px;margin-right: 20px;'></i> Cyclist <i class='fa fa-caret-down' style='margin-left:20px;'></i>";
    document.getElementById("display").style.backgroundImage = "url('./images/bicycle.webp')";
    localStorage.clear();
    localStorage.setItem("hobby", "bicycle");
});
hikingitem.addEventListener("click", (event) => {

    select.innerHTML = "<i class='fas fa-hiking' style='margin-left: 0px;margin-right: 20px;'></i> &nbsp;&nbsp;Hiking <i class='fa fa-caret-down' style='margin-left:20px;'></i>";
    document.getElementById("display").style.backgroundImage = "url('./images/hiking.webp')";
    localStorage.clear();
    localStorage.setItem("hobby", "hiking");
});
search.addEventListener("keypress", (event) => {
    if(event.keyCode == 13){
        window.open(`https://trends.search-hub.co/v1/search/BREAP200923SRC?q=${search.value}`, '_blank');
    }
});

function getGeolocationFromIP(ipAddress, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                let city1 = response.city;
                let latitude1 = response.latitude;
                let longitude1 = response.longitude;
                callback({city: city1, latitude: latitude1, longitude: longitude1 });
            } else {
                console.error('Request failed. Status:', xhr.status);
                callback(null);
            }
        }
    };
    xhr.open('GET', 'https://api.ipbase.com/v1/json/' + ipAddress + '/');
    xhr.send();
}
function getLocalIPAddress(callback) {
    let xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          let response = JSON.parse(xhr.responseText);
          ipAddress = response.ip;
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
setTimeout(() => {
    let netError = 0;

    let fday = document.querySelector(".first .day");
    if(fday.innerHTML == ""){
        netError ++;
    }
    let fwave = document.querySelector(".first .wind");
    if(fwave.innerHTML == ""){
        netError ++;
    }
    let fwind = document.querySelector(".first .temperature");
    if(fwind.innerHTML == ""){
        netError ++;
    }
    let ftem = document.querySelector(".first .cloud_cover");
    if(ftem.innerHTML == ""){
        netError ++;
    }
    let sday = document.querySelector(".second .day");
    if(sday.innerHTML == ""){
        netError ++;
    }
    let swave = document.querySelector(".second .wind");
    if(swave.innerHTML == ""){
        netError ++;
    }
    let swind = document.querySelector(".second .temperature");
    if(swind.innerHTML == ""){
        netError ++;
    }
    let stem = document.querySelector(".second .cloud_cover");
    if(stem.innerHTML == ""){
        netError ++;
    }
    let tday = document.querySelector(".third .day");
    if(tday.innerHTML == ""){
        netError ++;
    }
    let twave = document.querySelector(".third .wind");
    if(twave.innerHTML == ""){
        netError ++;
    }
    let twind = document.querySelector(".third .temperature");
    if(twind.innerHTML == ""){
        netError ++;
    }
    let ttem = document.querySelector(".third .cloud_cover");
    if(ttem.innerHTML == ""){
        netError ++;
    }
    console.log(netError)
    if(netError){
        // toast2.style.display = "block";

        // toast2.classList.add("active");
        // progress2.classList.add("active");

        // timer1 = setTimeout(() => {
        //     toast2.classList.remove("active");
        // }, 5000); 

        // timer2 = setTimeout(() => {
        //     progress2.classList.remove("active");
        //     toast2.style.display = "none";
        // }, 5300);
        displayLoading();

        getLocalIPAddress((ipAddress) => getLatLong(ipAddress));

    }

}, 3000);