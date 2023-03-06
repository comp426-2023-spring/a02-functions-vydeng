#!/usr/bin/env node

import minimist from 'minimist'
import moment from 'moment-timezone'
import fetch from 'node-fetch';


var args = minimist(process.argv.slice(2));

if (args.h) {
	console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit`);
	process.exit(0);
}

const timezone = args.z ?? moment.tz.guess();
let longitude = 0;
let latitude = 0;

if (args.e || args.w) {
longitude = args.e || args.w * -1;
}
if (args.n || args.s) {
  latitude = args.n || args.s * -1;
}

// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&current_weather=true&timezone=' + timezone);

// Get the data from the request
const data = await response.json();

if (args.j) {
  console.log(data);
  process.exit(0);
}

const days = args.d ?? 1;

let result = ""

if (data.daily.precipitation_hours[days] > 0) {
  result += "You might need your galoshes "
} else {
  result += "You will not need your galoshes "
}

if (days == 0) {
  result += "today."
} else if (days > 1) {
  result += "in " + days + " days."
} else {
  result += "tomorrow."
}

console.log(result)