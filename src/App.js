import React from 'react';
import Weather from './Weather';
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './Form';
import './App.css';
import stars from "./assets/stars.jpg";

const apiKey = '478673cdf5e3e079efaec584e509fbfc';

class App extends React.Component {
  constructor (){
    super();
    this.state = {
      city : undefined,
      country : undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      tempMax: undefined,
      tempMin: undefined,
      description: '',
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: 'wi-thunderstorm',
      Drizzle: 'wi-sleet',
      Rain: 'wi-storm-showers',
      Snow: 'wi-snow',
      Atmosphere: 'wi-fog',
      Clear: 'wi-day-sunny',
      Clouds: 'wi-day-fog'
    };
  }

  calCelsius(temp){
    let cel = Math.floor(temp - 273.15);
    return cel;
  }

  getWeatherIcon(icons, rangeId){
    switch(true){
      case rangeId >= 200 && rangeId <= 232:
      this.setState({icon:this.weatherIcon.Thunderstorm});
      break;
      case rangeId >= 300 && rangeId <= 321:
      this.setState({icon:this.weatherIcon.Drizzle});
      break;
      case rangeId >= 500 && rangeId <= 531:
      this.setState({icon:this.weatherIcon.Rain});
      break;
      case rangeId >= 600 && rangeId <= 622:
      this.setState({icon:this.weatherIcon.Snow});
      break;
      case rangeId >= 701 && rangeId <= 781:
      this.setState({icon:this.weatherIcon.Atmosphere});
      break;
      case rangeId === 800:
      this.setState({icon:this.weatherIcon.Clear});
      break;
       case rangeId >= 801 && rangeId <= 804:
      this.setState({icon:this.weatherIcon.Clouds});
      break;
      default:
       this.setState({icon:this.weatherIcon.Clouds});
    }
  }

  getWeather = async (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;
   
    if (city && country){  
      const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`);
      const response = await apiCall.json();
      console.log(response);

    //updating the state
      this.setState({
        city : `${response.name}, ${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        tempMax: this.calCelsius(response.main.temp_max),
        tempMin: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error : false
       });
      
       this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
       
       }else{
        this.setState({error:true});
       }
    };

  render(){
    return(
        <div className="App" style={{backgroundImage: `url(${stars})`}}>
          <Form loadWeather={this.getWeather} error ={this.state.error}/>
          <Weather 
          city= {this.state.city} 
          country= {this.state.country}
          tempCelsius= {this.state.celsius}
          tempMax = {this.state.tempMax}
          tempMin = {this.state.tempMin}
          description = {this.state.description}
          weatherIcon = {this.state.icon}
          />
        </div>
    );
  }
}


export default App;
