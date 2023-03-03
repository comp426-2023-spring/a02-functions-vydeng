#!/usr/bin/env node
import minimist from 'minimist'
import moment from 'moment-timezone'

var args = minimist(process.argv.slice(2));




if (args.h) {
    console.log(`Usage: $0 [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE

        -h\t\tShow this help message and exit.\n"
        -n, -s\tLatitude: N positive; S negative.\n"
        -e, -w\tLongitude: E positive; W negative.\n"
        -z\t\tTime zone: uses tz.guess() from moment-timezone by default.\n"
        -d 0-6\tDay to retrieve weather: 0 is today; defaults to 1.\n"
        -j\t\tEcho pretty JSON from open-meteo API and exit.\n"`)
    exit(0)
}

const timezone = moment.tz.guess()

// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&current_weather=true&timezone=America%2FNew_York');

// Get the data from the request
const data = await response.json();

const days = args.d 

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}
