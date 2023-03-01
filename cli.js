#!/usr/bin/env node

function show_help() {
    printf -- "Usage: $0 [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n"
    printf -- ;"\n"
    printf -- ;"  -h\t\tShow this help message and exit.\n"
    printf -- ;"  -n, -s\tLatitude: N positive; S negative.\n"
    printf -- ;"  -e, -w\tLongitude: E positive; W negative.\n"
    printf -- ;"  -z\t\tTime zone: uses tz.guess() from moment-timezone by default.\n"
    printf -- ;"  -d 0-6\tDay to retrieve weather: 0 is today; defaults to 1.\n"
    printf -- ;"  -j\t\tEcho pretty JSON from open-meteo API and exit.\n"
    exit(0)
}

const timezone = moment.tz.guess()
