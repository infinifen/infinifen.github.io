const INTERVALS = {}
INTERVALS._1 = {sounds: [0, 0], name: "1"}
INTERVALS.MIN2 = {sounds: [0, 1], name: "2>"}
INTERVALS.MAJ2 = {sounds: [0, 2], name: "2"}
INTERVALS.MIN3 = {sounds: [0, 3], name: "3>"}
INTERVALS.MAJ3 = {sounds: [0, 4], name: "3"}
INTERVALS._4 = {sounds: [0, 5], name: "4"}
INTERVALS.TRIT = {sounds: [0, 6], name: "tryt"}
INTERVALS._5 = {sounds: [0, 7], name: "5"}
INTERVALS.MIN6 = {sounds: [0, 8], name: "6>"}
INTERVALS.MAJ6 = {sounds: [0, 9], name: "6"}
INTERVALS.MIN7 = {sounds: [0, 10], name: "7"}
INTERVALS.MAJ7 = {sounds: [0, 11], name: "7<"}
INTERVALS._8 = {sounds: [0, 12], name: "8"}

const CHORDS = {}
CHORDS.MAJOR = {sounds: [0, 4, 7], name: "+"}
CHORDS.MINOR = {sounds: [0, 3, 7], name: "o"}
CHORDS.AUG = {sounds: [0, 4, 8], name: "+<sup>5<</sup>"}
CHORDS.DIM = {sounds: [0, 3, 6], name: "o<sup>5></sup>"}
CHORDS.MAJOR3 = {sounds: [0, 3, 8], name: "+<sub>3</sub>"}
CHORDS.MINOR3 = {sounds: [0, 4, 9], name: "o<sub>3</sub>"}
CHORDS.MAJOR5 = {sounds: [0, 5, 9], name: "+<sub>5</sub>"}
CHORDS.MINOR5 = {sounds: [0, 5, 8], name: "o<sub>5</sub>"}
CHORDS.D7 = {sounds: [0, 4, 7, 10], name: "D<sup>7</sup>"}
CHORDS.D73 = {sounds: [0, 3, 6, 8], name: "D<sup>7</sup><sub>3</sub>"}
CHORDS.D75 = {sounds: [0, 3, 5, 9], name: "D<sup>7</sup><sub>5</sub>"}
CHORDS.D77 = {sounds: [0, 2, 6, 9], name: "D<sub>7</sub>"}

let CHORDSANDINTERVALS = {}
Object.assign(CHORDSANDINTERVALS, CHORDS, INTERVALS)

const TIMINGS = {}
TIMINGS.ATONCE = {times: [0, 0, 0, 0], name: "naraz"}
TIMINGS.ARPEGGIO = {times: [0, 50, 100, 150], name: "arpeggio"}
TIMINGS.FAST = {times: [0, 100, 200, 300], name: "szybko"}
TIMINGS.MEDIUM = {times: [0, 300, 600, 900], name: "średnio"}
TIMINGS.SLOW = {times: [0, 650, 1300, 1950], name: "wolno"}
TIMINGS.VSLOW = {times: [0, 1200, 2400, 3600], name: "b.wolno"}