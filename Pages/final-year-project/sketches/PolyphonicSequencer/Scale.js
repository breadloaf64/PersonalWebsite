var scale_chromatic
var scale_Amaj
var scale_Aoct
var scale_Cpenta

function initialiseScales() {
    scale_chromatic = new Scale(0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    scale_Amaj = new Scale(0, [0, 2, 4, 5, 7, 9, 11])
    scale_Aoct = new Scale(0, [0])
    scale_Cpenta = new Scale(3, [0, 2, 4, 7, 9])
}

// this class is responsible for holding all the information for a musical scale. It has functions for snapping notes and frequencies to that scale
class Scale {
    constructor(tonic, degrees) {
        this.tonic = tonic
        this.degrees = degrees

        this.makeNotes()
    }

    snapFrequency(frequency) {
        // takes a freqency and returns the frequency of the nearest note in the scale

        let note = frequencyToNote(frequency)
        let nearestNote = round(note)
        let snappedFrequency = noteToFrequency(this.snapNote(nearestNote))
        return snappedFrequency
    }

    snapNote(note) {
        // takes a note and returns the nearest note in the scale

        // these markers will point to places on the notes array, and use binary search to converge
        let indexLow = 0
        let indexHigh = this.notes.length - 1

        // loopCount makes sure we don't enter an infinite loop
        let loopCount = 0
        while (indexHigh - indexLow > 1 || loopCount > 10000) {
            let middleIndex = floor(indexLow + (indexHigh - indexLow) / 2)

            if (this.notes[middleIndex] < note) {
                indexLow = middleIndex
            } else indexHigh = middleIndex

            loopCount++
        }

        // These are the notes in the scale closest to our chosen note. Pick the closer on (picking the lower note in a tie)
        let distToLow = abs(note - this.notes[indexLow])
        let distToHigh = abs(note - this.notes[indexHigh])

        let snappedNote = 0

        if (distToLow <= distToHigh) {
            snappedNote = this.notes[indexLow]
        } else snappedNote = this.notes[indexHigh]
        return snappedNote
    }

    makeNotes() {
        // returns note indices of all notes that are in the human hearing frequency range

        this.notes = []

        let currentTonic = this.tonic

        //build upwards from middle tonic
        while (currentTonic < maxNote) {
            for (let d of this.degrees) {
                this.notes.push(currentTonic + d)
            }
            currentTonic += 12
        }

        // build downwards from middle tonic
        currentTonic = this.tonic - 12
        while (currentTonic > minNote - 12) {
            for (let d of this.degrees) {
                this.notes.push(currentTonic + d)
            }
            currentTonic -= 12
        }

        this.notes.sort(function (a, b) {
            return a - b
        })
    }
}
