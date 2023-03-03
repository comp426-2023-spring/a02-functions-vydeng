#!/usr/bin/env node

function show_help() {
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
