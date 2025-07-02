'use strict';

// prettier-ignore

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10) // Creating a new id for the last 10 digits of the Date() class
    constructor(coords, distance, duration){
        this.coords = coords
        this.distance = distance // in km
        this.duration = duration // in mins
       
    }

    _description(){
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    }
}

class Running extends Workout{
    type = 'running'
    constructor(coords,distance,duration,cadence){
        super(coords,distance,duration)
        this.cadence = cadence
        this.calcPace();
        this._description()
    }

    calcPace(){
        this.pace = (this.duration/60)/this.distance

        return this.pace
    }
}
class Cycling extends Workout{
    type = 'cycling'
    constructor(coords,distance,duration,elevationGain){
        super(coords,distance,duration)
        this.elevationGain = elevationGain
        this.calcSpeed();
        this._description()
    }

    calcSpeed(){
        this.speed = this.distance/(this.duration/60)
    }
}


const run1 = new Running();
class App {
    #map; // private instance properties that we can use throughtout the class that we created intead of using the map and mapEvent variables
    #mapEvent; 
    #workouts = []

    constructor(){
        this._getposition(); // We do this because once the page loads the App constructor executes so we set the getcurrent position right at the constructor

        form.addEventListener('submit', this._newWorkout.bind(this))

        inputType.addEventListener('change', this._toggleElevationField)
        
    }

    _getposition(){
        if (navigator.geolocation) // Enuser that a old browser can use heolocation
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this)/*This binds with the current object*/,function(){
                alert('Could not get the current position')
            })
    }
    _loadMap(position){
            const {latitude} = position.coords;
            const {longitude} = position.coords;
            console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

            const coords = [latitude,longitude]

            this.#map = L.map('map').setView(coords, 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);
            
            L.marker(coords)
            .addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidhth: 100,
                autoClose: false,
                closeOnClick: false, 
                className: `workout--popup`
            }))
            .setPopupContent(`You are here`)
            .openPopup();

            // L.marker(coords).addTo(map)
            // .bindPopup('A pretty CSS popup.<br> Easily customizable.')
            // .openPopup();
            this.#map.on('click',this._showForm.bind(this))
            
    }
    _showForm(mapE){
           this.#mapEvent = mapE;
           form.classList.remove('hidden')
           inputDistance.focus()
    }
    
    _hideForm(){
        inputDistance.value = inputDuration.value = inputCadence.value = '';
        form.style.display = 'none'
        form.classList.add('hidden')
        setTimeout(()=> form.style.display='grid', 1000)
    }
    
    _toggleElevationField(e){
        e.preventDefault()
            inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
            inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    }
    _newWorkout(e){
        e.preventDefault();
        const checkValid = (...inputs) => inputs.every(inp => Number.isFinite(inp))
        const checkPositive = (...inputs) => inputs.every(inp => inp > 0)

        
        // 1. Get Data from the form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const {lat, lng} = this.#mapEvent.latlng
        let workout;
        //3. If activity running, then create running object
        if (type === 'running') {
            // 2. Check if the values are valid
            const cadence = +inputCadence.value;
            if(!checkValid(distance,duration,cadence) || !checkPositive(distance,duration,cadence)) return alert('Inputs must be positive')
            workout = new Running([lat,lng], distance,duration,cadence)
            
        }

        //4. If activity cycling, then create cycling object
        if (type === 'cycling') {
            const elevationGain = +inputElevation.value;
            if(!checkValid(distance,duration,elevationGain)|| !checkPositive(distance,duration)) return alert('Inputs must be positive')
            workout = new Cycling([lat,lng], distance,duration,elevationGain)
        }
    

        //5. Add workout to new object array
        this.#workouts.push(workout)
        //6.Render workout
        this._renderWorkout(workout);

        this._renderWorkoutMarker(workout);

        // Clear output fields
        this._hideForm()
    }
    _renderWorkoutMarker(workout){
        L.marker(workout.coords)
        .addTo(this.#map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidhth: 100,
            autoClose: false,
            closeOnClick: false, 
            className: `${workout.type}-popup`
        }))
        .setPopupContent(`${workout.description}`)
        .openPopup();
    
    }
    
    _renderWorkout(workout){
        let html = `<li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️':'🚴‍♀️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div> 
        `
        if(workout.type === 'running'){
            html += ` <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`
        }

        if(workout.type === 'cycling'){
            html+= ` <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li> `
        }
        form.insertAdjacentHTML('afterend',html)

    }

}

const app = new App();