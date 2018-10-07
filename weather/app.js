const reqCity = 'https://api.openweathermap.org/data/2.5/weather?q='
const key = '&APPID=ca99c3a7c2554bf092ed012ff5a04ca9';


const getWeatherCity = (e) => {
  let city = document.getElementById('city').value;
  let request = reqCity + city + key;
  fetch(request)
  .then(res => res.json())
  .then(data => {
    let curTemp = Math.round(data.main.temp - 273.15);
    let out = `
    <ul class="list-group">
      <li class="list-group-item"><b>Location: </b> ${data.name}</li>
      <li class="list-group-item"><b>Temperature: </b> ${curTemp} <i class="deg">o</i>C</li>
      <li class="list-group-item"><b>Weather: </b> ${data.weather[0].main}</li>
      <li class="list-group-item"><b>Pressure: </b> ${data.main.pressure} mm</li>
      <li class="list-group-item"><b>Wind: </b> ${data.wind.speed} m/s</li>
    </ul>`;

    document.querySelector('.output').innerHTML = out;
    console.log((data));
  
  })
  e.preventDefault();
}

  // add Event Listeners
document.getElementById('get-weather').addEventListener('click', getWeatherCity);