import * as SunCalc from "./node_modules/suncalc/suncalc.js";

const table = document.querySelector('.main')
const btn = document.querySelector('.button')
const divMain = document.querySelector('.main__div');
const title = document.querySelector('.ask__click');
// const spin = document.querySelector('.spin')

const state = {
    sunCheck: {},
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}

let today = new Date();

const twoDigit = val => val < 10 ? `0${val}` : val;

const day = date => `${state.weekdays[date.getDay()].slice(0, 3)} ${state.months[date.getMonth()].slice(0, 3)} ${twoDigit(date.getDate())} ${date.getFullYear()}`

const time24 = date => `${twoDigit(date.getHours())}:${twoDigit(date.getMinutes())}:${twoDigit(date.getSeconds())}(24 hours format)`

const time12 = date => `${date.getHours() > 12 ? twoDigit(date.getHours() - 12) : twoDigit(date.getHours())}:${twoDigit(date.getMinutes())}:${twoDigit(date.getSeconds())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`


title.insertAdjacentText('afterbegin', `Click the button for the details on ${day(today)}`)

const createSunDetails = function(sunData, moonData) {
    // const details = sunData;
    return {
        sunRise: time12(sunData.sunrise),
        sunRiseEnd: time12(sunData.sunriseEnd),
        sunsetStart: time12(sunData.sunsetStart),
        sunSet: time12(sunData.sunset),
        goldenHourEvening: time12(sunData.goldenHour),
        goldenHourMorning: time12(sunData.goldenHourEnd),
        dawn: time12(sunData.dawn),
        dusk: time12(sunData.dusk),
        solarNoon: time12(sunData.solarNoon),
        night: time12(sunData.night),
        nadir: time12(sunData.nadir),
        nightEnds: time12(sunData.nightEnd),
        nauticalDusk: time12(sunData.nauticalDusk),
        nauticalDawn: time12(sunData.nauticalDawn),
        moonRise: time12(moonData.rise),
        moonSet: time12(moonData.set),
    }

}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            if (!position) alert('Turn on the location and press allow')
            console.log(position)
            const { latitude } = position.coords;
            const { longitude } = position.coords;

            const sunDet = SunCalc.getTimes(today, latitude, longitude);
            const moonDet = SunCalc.getMoonTimes(today, latitude, longitude);

            state.sunCheck = createSunDetails(sunDet, moonDet);

        },
        function() {
            alert(`Could not get your location`)
        })
}

btn.addEventListener('click', function(e) {
    e.preventDefault();
    btn.style.opacity = 0;
    title.innerHTML = ''
    divMain.innerHTML = ''
    table.innerHTML = '';
    table.classList.add('loader');
    setTimeout(function() {
        title.insertAdjacentText("afterbegin", `On ${day(today)}, the events details are given below`)
        table.classList.remove('loader')
        const html = `
    <table id="customers" class="section--hidden">
    <tr>
    <th>Details</th>
    <th>Description</th>
    <th>Time</th>
</tr>
<tr>
    <td>Sunrise</td>
    <td>When the top edge of sun appears on the horizon</td>
    <td class="sunrise">${state.sunCheck.sunRise}</td>
</tr>
<tr>
    <td>Sunrise end</td>
    <td>When the bottom edge of sun touches the horizon</td>
    <td class="sunrise_end">${state.sunCheck.sunRiseEnd}</td>
</tr>
<tr>
    <td>Golden hour in Morning</td>
    <td>Soft light, best time for photography</td>
    <td class="golden_morn">${state.sunCheck.goldenHourMorning}</td>
</tr>
<tr>
    <td>Solar Noon</td>
    <td>Sun is in the hightest position</td>
    <td class="solar_noon">${state.sunCheck.solarNoon}</td>
</tr>
<tr>
    <td>Golden hour in Evening</td>
    <td>Same as golden hour in morning</td>
    <td class="golden_eve">${state.sunCheck.goldenHourEvening}</td>
</tr>
<tr>
    <td>Sunset Start</td>
    <td>When the bottom edge of sun touch the horizon</td>
    <td class="sunset_start">${state.sunCheck.sunsetStart}</td>
</tr>
<tr>
    <td>Sunset End</td>
    <td>When the sun disappears below the horizon, evening civil twilight starts</td>
    <td class="sunset_end">${state.sunCheck.sunSet}</td>
</tr>
<tr>
    <td>Dusk</td>
    <td>When evening nautical twilight starts</td>
    <td class="dusk">${state.sunCheck.dusk}</td>
</tr>
<tr>
    <td>Nautical Dusk</td>
    <td>When evening astronomical twilight starts</td>
    <td class="nautical_dusk">${state.sunCheck.nauticalDusk}</td>
</tr>
<tr>
    <td>Night</td>
    <td>Dark enough for astronomical observations</td>
    <td class="night">${state.sunCheck.night}</td>
</tr>
<tr>
    <td>Nadir</td>
    <td>Darkest moment of the night, sun is in the lowest position</td>
    <td class="nadir">${state.sunCheck.nadir}</td>
</tr>
<tr>
    <td>Night end</td>
    <td>Morning astronomical twilight starts</td>
    <td class="night_end">${state.sunCheck.nightEnds}</td>
</tr>
<tr>
    <td>Nautical Dawn</td>
    <td>Morning nautical twilight starts</td>
    <td class="nautical_dawn">${state.sunCheck.nauticalDawn}</td>
</tr>
<tr>
    <td>Dawn</td>
    <td>Morning nautical twilight ends, morning civil twilight starts</td>
    <td class="dawn">${state.sunCheck.dawn}</td>
</tr>
<!--<td>Moon Rise</td>
<td>When moon rises</td>
<td class="moon_Rise">${state.sunCheck.moonRise}</td>
</tr>
<tr>
    <td>Moon set</td>
    <td>When moon sets</td>
    <td class="moon_set">${state.sunCheck.moonSet}</td>
</tr>-->
</table>
    `
        table.insertAdjacentHTML('afterbegin', html)
        table.classList.remove('.section--hidden')

    }, 1000)
})