const button = document.querySelector("button")

button.addEventListener("click", ()=>{
    if(navigator.geolocation){

        button.innerText = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onSuccess, onerror);
    
    }else{
        button.innerText = "Your browser not support"
    }
});

 function onSuccess(position){
    button.innerText = "Detecting your location...";
     let {latitude, longitude} = position.coords;
    fetch('https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR-API-KEY')

    .then(response => response.json()).then(result => {
let allDetails = result.results[0].components;
let {county, postcode, country} = allDetails;
button.innerText = '${county} ${postcode}, ${country}';
console.table(allDetails);
}).catch(()=>{
    button.innerText = "Something went wrong";
})
}

function onerror(error){
    if(error.code ==1){
        button.innerText = "Your denied the request"
    }
    else if(error.code ==2){
        button.innerText = "Location not available"
    }else{
        button.innerText = "Something went wrong"
    }
}
// button.setAttribute("disabled", "true");

