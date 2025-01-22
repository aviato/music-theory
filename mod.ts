/**
 * This module provides classes and functions for working with music theory concepts like a {@linkcode Note}, {@linkcode Interval}, {@linkcode Chord}, or {@linkcode Scale}.
 *
 * @example
 * ```ts
 * import { MajorScale, Note } from "@aviato/music-theory";
 * const middleC = new Note("C4"); // Note { name: "C4", pitchClass: "C", octave: 4, accidental: "", freq: 261.63 }
 * const cMajorScale = new MajorScale(middleC); // Scale { name: "Major", notes: [Note { name: "C4", pitchClass: "C", octave: 4, accidental: "", freq: 261.63 }, ...] }
 * ```
 *
 * @module music-theory
 */

/**
 * Enum providing constants for the 12 musical note names
 */
export enum Notes {
  C_FLAT = "Cb",
  C = "C",
  C_SHARP = "C#",
  D_FLAT = "Db",
  D = "D",
  D_SHARP = "D#",
  E_FLAT = "Eb",
  E = "E",
  F = "F",
  F_SHARP = "F#",
  G_FLAT = "Gb",
  G = "G",
  G_SHARP = "G#",
  A_FLAT = "Ab",
  A = "A",
  A_SHARP = "A#",
  B_FLAT = "Bb",
  B = "B",
}

const indexedNotes: Notes[] = [
  Notes.C,
  Notes.C_SHARP,
  Notes.D,
  Notes.D_SHARP,
  Notes.E,
  Notes.F,
  Notes.F_SHARP,
  Notes.G,
  Notes.G_SHARP,
  Notes.A,
  Notes.A_SHARP,
  Notes.B,
];

/**
 * Keys of the Notes enum
 */
export type NoteNameKeys = keyof typeof Notes;
/**
 * Values of the Notes enum as type
 */
export type NoteName = (typeof Notes)[keyof typeof Notes];
/**
 * Array of note names (meant to be used for display purposes)
 */
export const NoteNames: NoteName[] = Object.values(Notes);
/**
 * Enum for working with interval names
 */
export enum Intervals {
  UNISON = "unison",
  MINOR_2ND = "minor 2nd",
  MAJOR_2ND = "major 2nd",
  MINOR_3RD = "minor 3rd",
  MAJOR_3RD = "major 3rd",
  PERFECT_4TH = "perfect 4th",
  AUGMENTED_4TH = "augmented 4th",
  DIMINISHED_5TH = "diminished 5th",
  PERFECT_5TH = "perfect 5th",
  MINOR_6TH = "minor 6th",
  MAJOR_6TH = "major 6th",
  MINOR_7TH = "minor 7th",
  MAJOR_7TH = "major 7th",
  OCTAVE = "octave",
}
/**
 * Keys of the Intervals enum
 */
export type IntervalKeys = keyof typeof Intervals;
/**
 * Values of the Intervals enum as type
 */
export type IntervalValue = (typeof Intervals)[keyof typeof Intervals];
/**
 * Enum for working with interval shorthand names
 */
export enum IntervalShorthandNames {
  P1 = "P1",
  m2 = "m2",
  M2 = "M2",
  m3 = "m3",
  M3 = "M3",
  P4 = "P4",
  A4 = "A4",
  d5 = "d5",
  P5 = "P5",
  m6 = "m6",
  M6 = "M6",
  m7 = "m7",
  M7 = "M7",
  P8 = "P8",
}

const IntervalNamesToShorthand = {
  [Intervals.UNISON]: IntervalShorthandNames.P1,
  [Intervals.MINOR_2ND]: IntervalShorthandNames.m2,
  [Intervals.MAJOR_2ND]: IntervalShorthandNames.M2,
  [Intervals.MINOR_3RD]: IntervalShorthandNames.m3,
  [Intervals.MAJOR_3RD]: IntervalShorthandNames.M3,
  [Intervals.PERFECT_4TH]: IntervalShorthandNames.P4,
  [Intervals.AUGMENTED_4TH]: IntervalShorthandNames.A4,
  [Intervals.DIMINISHED_5TH]: IntervalShorthandNames.d5,
  [Intervals.PERFECT_5TH]: IntervalShorthandNames.P5,
  [Intervals.MINOR_6TH]: IntervalShorthandNames.m6,
  [Intervals.MAJOR_6TH]: IntervalShorthandNames.M6,
  [Intervals.MINOR_7TH]: IntervalShorthandNames.m7,
  [Intervals.MAJOR_7TH]: IntervalShorthandNames.M7,
  [Intervals.OCTAVE]: IntervalShorthandNames.P8,
};

/**
 * Enum for working with interval semitone values
 */
export enum IntervalSemitones {
  UNISON = 0,
  MINOR_2ND = 1,
  MAJOR_2ND = 2,
  MINOR_3RD = 3,
  MAJOR_3RD = 4,
  PERFECT_4TH = 5,
  AUGMENTED_4TH = 6,
  DIMINISHED_5TH = 6,
  PERFECT_5TH = 7,
  MINOR_6TH = 8,
  MAJOR_6TH = 9,
  MINOR_7TH = 10,
  MAJOR_7TH = 11,
  OCTAVE = 12,
}
/**
 * Keys of the IntervalSemitones enum
 */
export type SemitoneKeys = keyof typeof IntervalSemitones;
/**
 * Values of the IntervalSemitones enum as type
 */
export type SemitoneValue =
  (typeof IntervalSemitones)[keyof typeof IntervalSemitones];
/**
 * Enum for supported scale types
 */
export enum ScaleTypes {
  MAJOR = "major",
  MINOR = "minor",
  MAJOR_PENTATONIC = "major pentatonic",
  MINOR_PENTATONIC = "minor pentatonic",
  MAJOR_BLUES = "major blues",
  MINOR_BLUES = "minor blues",
  CHROMATIC = "chromatic",
}
/**
 * Keys of the ScaleTypes enum
 */
export type ScaleTypesKeys = keyof typeof ScaleTypes;
/**
 * Values of the ScaleTypes enum as type
 */
export type ScaleTypeValue = (typeof ScaleTypes)[keyof typeof ScaleTypes];
/**
 * Object mapping scale types to their interval values
 */
type ScaleTypesToIntervalsObj = {
  [key in ScaleTypeValue]: number[];
};

const ScaleTypesToIntervals: ScaleTypesToIntervalsObj = {
  [ScaleTypes.MAJOR]: [
    IntervalSemitones.MAJOR_2ND,
    IntervalSemitones.MAJOR_3RD,
    IntervalSemitones.PERFECT_4TH,
    IntervalSemitones.PERFECT_5TH,
    IntervalSemitones.MAJOR_6TH,
    IntervalSemitones.MAJOR_7TH,
  ],
  [ScaleTypes.MINOR]: [
    IntervalSemitones.MAJOR_2ND,
    IntervalSemitones.MINOR_3RD,
    IntervalSemitones.PERFECT_4TH,
    IntervalSemitones.PERFECT_5TH,
    IntervalSemitones.MINOR_6TH,
    IntervalSemitones.MINOR_7TH,
  ],
  [ScaleTypes.MAJOR_PENTATONIC]: [
    IntervalSemitones.MAJOR_2ND,
    IntervalSemitones.MAJOR_3RD,
    IntervalSemitones.PERFECT_5TH,
    IntervalSemitones.MAJOR_6TH,
  ],
  [ScaleTypes.MINOR_PENTATONIC]: [
    IntervalSemitones.MINOR_3RD,
    IntervalSemitones.PERFECT_4TH,
    IntervalSemitones.PERFECT_5TH,
    IntervalSemitones.MINOR_7TH,
  ],
  [ScaleTypes.MAJOR_BLUES]: [
    IntervalSemitones.MAJOR_2ND,
    IntervalSemitones.MINOR_3RD,
    IntervalSemitones.PERFECT_4TH,
    IntervalSemitones.PERFECT_5TH,
    IntervalSemitones.MAJOR_6TH,
  ],
  [ScaleTypes.MINOR_BLUES]: [
    IntervalSemitones.MINOR_3RD,
    IntervalSemitones.PERFECT_4TH,
    IntervalSemitones.DIMINISHED_5TH,
    IntervalSemitones.PERFECT_5TH,
    IntervalSemitones.MINOR_7TH,
  ],
  [ScaleTypes.CHROMATIC]: [
    IntervalSemitones.MINOR_2ND,
    IntervalSemitones.MAJOR_2ND,
    IntervalSemitones.MINOR_3RD,
    IntervalSemitones.MAJOR_3RD,
    IntervalSemitones.PERFECT_4TH,
    IntervalSemitones.DIMINISHED_5TH,
    IntervalSemitones.PERFECT_5TH,
    IntervalSemitones.MINOR_6TH,
    IntervalSemitones.MAJOR_6TH,
    IntervalSemitones.MINOR_7TH,
    IntervalSemitones.MAJOR_7TH,
  ],
};

/**
 * Enum for valid chord qualities
 * NOTE some chord qualities are not yet implemented
 */
export enum ChordQualityNames {
  MAJOR = "major",
  MINOR = "minor",
  AUGMENTED = "augmented",
  DIMINISHED = "diminished",
  SUS2 = "sus2",
  SUS4 = "sus4",
  MAJOR_SEVENTH = "major seventh",
  MINOR_SEVENTH = "minor seventh",
  DOMINANT_SEVENTH = "dominant seventh",
  HALF_DIMINISHED_SEVENTH = "half diminished seventh",
}
/**
 * Keys of the ChordQualityNames enum
 */
export type ChordQualityKeys = keyof typeof ChordQualityNames;
/**
 * Values of the ChordQualityNames enum as type
 */
export type ChordQualityValue =
  (typeof ChordQualityNames)[keyof typeof ChordQualityNames];

// Utility functions
const getIntervalNameBySemitones = (
  semitones: SemitoneValue,
): IntervalValue => {
  const intervalKeyName = Object.keys(IntervalSemitones).find(
    (key) => IntervalSemitones[key as SemitoneKeys] === semitones,
  );

  return Intervals[intervalKeyName as IntervalKeys] as IntervalValue;
};

const flatKeys: NoteName[] = [
  Notes.F,
  Notes.B_FLAT,
  Notes.E_FLAT,
  Notes.A_FLAT,
  Notes.D_FLAT,
  Notes.G_FLAT,
  Notes.C_FLAT,
];

const sharpToFlatMap: { [key: string]: string } = {
  "C#": "Db",
  "D#": "Eb",
  "F#": "Gb",
  "G#": "Ab",
  "A#": "Bb",
  "B#": "C",
  "E#": "F",
};

const flatToSharpMap: { [key: string]: string } = {
  Cb: "B",
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#",
  Fb: "E",
};

/**
 * Class representing a musical note
 */
export class Note {
  /**
   * The pitch class of the note. Ex: "C"
   */
  readonly pitchClass: string = "";
  /**
   * The octave of the note. Ex: 4
   * Defaults to -1 to indicate an invalid octave
   */
  readonly octave: number = -1;
  /**
   * The accidental of the note. Ex: "#" or "b"
   * Defaults to an empty string to indicate no accidental
   */
  readonly accidental?: string = "";
  /**
   * The frequency of the note in Hz
   * Defaults to -999 to indicate an invalid frequency
   */
  readonly freq: number = -999;
  /**
   * The enharmonic spelling of the note. Ex: If pitchClass is "A#" this would be "Bb"
   * Defaults to an empty string
   */
  readonly enharmonicSpelling?: string = "";
  /**
   * The enharmonic note object. This is the same note with a different spelling. Ex: A#4 === Bb4
   * Defaults to null
   */
  readonly enharmonicNote?: Note | null = null;
  /**
   * The index of the note in the indexedNotes array
   * Defaults to -1 to indicate an invalid index
   */
  index: number = -1;

  /**
   * Create a new Note note using the name of the note in scientific pitch notation.
   * @param name The name of the note in scientific pitch notation. Invalid note names will throw an error.
   * @param includeEnharmonicNote Optional parameter to include the enharmonic note in the object. Defaults to true. WARNING: this param will likely be removed in future versions and its use is discouraged.
   */
  constructor(
    public readonly name: string,
    includeEnharmonicNote: boolean = true,
  ) {
    try {
      const { accidental, freq, octave, pitchClass } = this.parseNoteName(name);
      this.pitchClass = pitchClass;
      this.octave = octave;
      if (accidental) {
        this.accidental = accidental;
        // NOTE: This is a naive implementation that only handles single sharps and flats
        if (accidental.length === 1) {
          if (this.accidental === "b") {
            this.enharmonicSpelling =
              flatToSharpMap[this.pitchClass + this.accidental];
          } else {
            this.enharmonicSpelling =
              sharpToFlatMap[this.pitchClass + this.accidental];
          }
          if (includeEnharmonicNote) {
            this.enharmonicNote = new Note(
              this.enharmonicSpelling + this.octave,
              false,
            );
          }
        }
      }
      this.freq = freq;
    } catch (e) {
      console.error("Note construction failed.");
      console.error(e);
    }
  }

  /**
   * Parse a note name into its components. Throws errors if required information is missing or invalid.
   * @param noteName The name of the note in scientific pitch notation
   * @returns An object containing the note's accidental, frequency, octave, and pitch class
   */
  private parseNoteName(
    noteName: string,
  ): { accidental: string; freq: number; octave: number; pitchClass: string } {
    const notePattern = /^([A-Ga-g])(#{1,3}|b{1,3})?(\d+)$/;
    const match = notePattern.exec(noteName);

    if (!match) {
      throw new Error(`Invalid note name: ${noteName}`);
    }

    const [_, unvalidatedPitchClass, accidental, octaveStr] = match;

    if (!unvalidatedPitchClass) {
      throw new Error("Note names must contain a pitch class.");
    }

    const pitchClass = unvalidatedPitchClass.toUpperCase();

    const octave = parseInt(octaveStr, 10);

    if (accidental === null) {
      throw new Error(
        `Must provide a valid accidental. You provided ${accidental}.}`,
      );
    }

    if (octave === null) {
      throw new Error("Must provide an octave.");
    }

    if (isNaN(octave) || octave < 0 || octave > 9) {
      throw new Error(`Invalid octave: ${octave}`);
    }

    const freq = this.calculateFrequency(
      pitchClass as NoteName,
      accidental,
      octave,
    );

    return { accidental, freq, octave, pitchClass };
  }

  /**
   * Get the index of the note in the indexedNotes array
   * @param note The note name to get the index of
   * @param accidentalOffset Optional parameter to adjust the index by a number of semitones
   * @returns The index of the note in the indexedNotes array
   */
  public getNoteIndex(note: NoteName, accidentalOffset: number = 0): number {
    const i = indexedNotes.indexOf(note);

    if (i === -1) {
      throw new Error(`Invalid base note: ${note}`);
    }

    const noteIndexWithOffset = (i + accidentalOffset) % NoteNames.length;

    return noteIndexWithOffset < 0
      ? noteIndexWithOffset + NoteNames.length
      : noteIndexWithOffset;
  }

  /**
   * Calculate the frequency of a note based on its pitch class, accidental, and octave
   * @param baseNote The base note name
   * @param accidental The accidental of the note
   * @param octave The octave of the note
   * @returns The frequency of the note in Hz
   */
  private calculateFrequency(
    baseNote: NoteName,
    accidental: string = "",
    octave: number,
  ): number {
    let semitoneShift = 0;
    let noteIndex = 0;

    if (accidental) {
      if (accidental[0] === "#") {
        semitoneShift = accidental.length;
      } else if (accidental[0] === "b") {
        semitoneShift = -accidental.length;
      }
    }

    noteIndex = this.getNoteIndex(baseNote, semitoneShift);
    this.index = noteIndex;

    // Calculate the number of semitones from A4 (440 Hz)
    const A4_INDEX = this.getNoteIndex(Notes.A);
    const n = noteIndex - A4_INDEX + (octave - 4) * 12;

    const frequency = 440 * Math.pow(2, n / 12);

    return Math.round(frequency * 100) / 100;
  }
}
// TODO: refactor Interval API to allow users to pass in shorthand names
// ex: new Interval("C4", "M3") or new Interval("C4", "major 3rd"
// TODO: infer useFlats based on the root note's accidental

/**
 * Class representing a musical interval
 */
export class Interval {
  /**
   * The interval note created by applying the interval to the root note
   */
  public intervalNote: Note;
  /**
   * The name of the interval in long form. Ex: "major 3rd"
   */
  public name: string = "";
  /**
   * The shorthand name of the interval. Ex: "M3"
   */
  public shorthand: string = "";
  /**
   * Create a new Interval object by applying an interval to a root note
   * @param rootNote The root note to apply the interval to
   * @param distance The distance of the interval in semitones
   * @param direction The direction of the interval. Defaults to "up"
   * @param useFlats Whether to use flats in the interval. Defaults to false
   * @returns A new Interval object
   */
  constructor(
    public rootNote: Note,
    public distance: SemitoneValue,
    public direction: "up" | "down" = "up",
    public useFlats: boolean = false,
  ) {
    this.name = getIntervalNameBySemitones(distance);

    if (!this.name) {
      throw new Error(`Invalid interval distance: ${distance}.`);
    }

    this.shorthand = IntervalNamesToShorthand[
      this.name as IntervalValue
    ];

    let newNoteName: string = "";

    // Adjust semitone shift based on the direction
    const semitoneShift = this.direction === "up"
      ? this.distance
      : -this.distance;

    // Calculate the new index by adding the semitone shift to the root note's index
    const intervalNoteIndex = (rootNote.index + semitoneShift) %
      indexedNotes.length;

    // Handle cases where the index is negative
    const adjustedNoteIndex = intervalNoteIndex < 0
      ? intervalNoteIndex + indexedNotes.length
      : intervalNoteIndex;

    // Create the new interval note based on the calculated index and octave shift
    // taking into account the root note's accidental
    if (this.useFlats && sharpToFlatMap[indexedNotes[adjustedNoteIndex]]) {
      newNoteName = sharpToFlatMap[indexedNotes[adjustedNoteIndex]];
    } else {
      newNoteName = indexedNotes[adjustedNoteIndex];
    }

    const newNoteOctave = this.adjustOctave(rootNote, semitoneShift);
    this.intervalNote = new Note(newNoteName + newNoteOctave);

    if (!this.intervalNote) {
      throw new Error("Invalid interval note.");
    }
  }

  // Helper method to adjust the octave based on the semitone distance
  private adjustOctave(rootNote: Note, semitoneDistance: number): number {
    const totalSemitones = rootNote.index + semitoneDistance;
    const octaveShift = Math.floor(totalSemitones / indexedNotes.length);
    return rootNote.octave + octaveShift;
  }
}

/**
 * Class representing a musical chord
 */
export class Chord {
  /**
   * The notes that make up the chord
   */
  public notes: Note[] = [];
  /**
   * Create a new Chord object by applying a series of intervals to a root note
   * @param rootNote The root note of the chord
   * @param intervals The intervals to apply to the root note
   * @returns A new Chord object
   */
  constructor(rootNote: Note, intervals: Interval[]) {
    this.notes.push(rootNote);

    intervals.forEach((interval) => {
      this.notes.push(interval.intervalNote);
    });
  }
}

/**
 * Class representing a musical scale
 */
export class Scale {
  /**
   * The notes that make up the scale. Ex: [Note { name: "C4" }, ...]
   */
  public notes: Note[] = [];
  /**
   * The intervals that make up the scale. Ex: [Interval { name: "M3" }, ...]
   */
  public intervals: Interval[] = [];
  /**
   * The name of the scale. Ex: "Major"
   */
  public name: string = "";
  /**
   * The number of flats in the scale. Defaults to 0.
   */
  public flatsCount: number = 0;
  /**
   * The numbs of sharps in the scale. Defaults to 0.
   */
  public sharpsCount: number = 0;
  /**
   * Whether to use flats in the scale. Defaults to false.
   */
  public useFlats: boolean = false;

  /**
   * Create a new Scale object by applying a series of intervals to a root note
   * @param rootNote The root note of the scale
   * @param scaleType The type of scale to Create
   * @returns A new Scale object
   */
  constructor(rootNote: Note, scaleType: ScaleTypeValue) {
    this.useFlats = flatKeys.includes(
      `${rootNote.pitchClass}${rootNote.accidental}` as NoteName,
    );
    this.intervals = ScaleTypesToIntervals[scaleType].map(
      (interval) => new Interval(rootNote, interval, "up", this.useFlats),
    );
    this.notes.push(rootNote);
    this.notes.push(...this.intervals.map((interval) => interval.intervalNote));
  }

  /**
   * Check if a note is in the scale
   * @param note The note to Check
   * @returns A boolean indicating whether the note is in the scale
   */
  public hasNote(note: Note): boolean {
    if (!(note instanceof Note)) {
      console.error("Argument supplied was note an instance of Note Class.");
      return false;
    }
    return this.notes.some((scaleNote) =>
      scaleNote.pitchClass + scaleNote.accidental ===
        note.pitchClass + note.accidental
    );
  }

  /**
   * Get the scale degree of a note
   * @param note The note to get the scale degree of
   * @returns The scale degree of the note
   */
  public getScaleDegree(note: Note): number {
    const index = this.notes.findIndex((scaleNote) =>
      scaleNote.pitchClass + scaleNote.accidental ===
        note.pitchClass + note.accidental
    );

    return index >= 0 ? index + 1 : -1;
  }
}

/**
 * Class representing a major scale
 */
export class MajorScale extends Scale {
  /**
   * Create a new MajorScale object by applying a series of intervals to a root note
   */
  constructor(rootNote: Note) {
    super(rootNote, ScaleTypes.MAJOR);
    this.name = "Major";
  }
}
/**
 * Class representing a minor scale
 */
export class MinorScale extends Scale {
  /**
   * Create a new MinorScale object by applying a series of intervals to a root note
   * @param rootNote The root note of the scale
   * @returns A new MinorScale object
   */
  constructor(rootNote: Note) {
    super(rootNote, ScaleTypes.MINOR);
    this.name = "Minor";
  }
}
/**
 * Class representing the ChromaticScale
 */
export class ChromaticScale extends Scale {
  /**
   * Create a new ChromaticScale object by applying a series of intervals to a root note
   * @param rootNote The root note of the scale
   * @returns A new ChromaticScale object
   */
  constructor(rootNote: Note) {
    super(rootNote, ScaleTypes.CHROMATIC);
    this.name = "Chromatic";
  }
}

/**
 * A constant for working with standard guitar tuning
 */
export const STANDARD_GUITAR_TUNING: Note[] = [
  new Note("E2"),
  new Note("A2"),
  new Note("D3"),
  new Note("G3"),
  new Note("B3"),
  new Note("E4"),
];
/**
 * A constant for working with standard ukulele tuning
 */
export const STANDARD_UKULELE_TUNING: Note[] = [
  new Note("G4"),
  new Note("C4"),
  new Note("E4"),
  new Note("A4"),
];
/**
 * A constant for working with standard mandolin tuning
 */
export const STANDARD_MANDOLIN_TUNING: Note[] = [
  new Note("G3"),
  new Note("D4"),
  new Note("A4"),
  new Note("E5"),
];

/**
 * Class representing a fretboard
 */
export class Fretboard {
  /**
   * The strings that make up the fretboard
   */
  public strings: Note[][];
  /**
   * Create a new Fretboard object with a given tuning and number of frets
   * @param tuning The tuning of the fretboard. Defaults to an empty array
   * @param numFrets The number of frets on the fretboard. Defaults to 24
   * @returns A new Fretboard object
   */
  constructor(
    public tuning: Note[] = [],
    public numFrets: number = 24,
  ) {
    this.strings = this.buildFretboard(this.tuning, this.numFrets);
  }
  /**
   * Build the fretboard based on the tuning and number of frets
   * @param tuning The tuning of the fretboard
   * @param frets The number of frets on the fretboard
   * @returns A 2D array of notes representing the fretboard
   */
  private buildFretboard(tuning: Note[], frets: number): Note[][] {
    return tuning.map((openStringNote) =>
      this.buildStringNotes(openStringNote, frets)
    );
  }
  /**
   * Build the notes for a single string on the fretboard
   * @param rootNote The root note of the string
   * @param frets The number of frets on the string
   * @returns An array of notes representing the string
   */
  private buildStringNotes(rootNote: Note, frets: number): Note[] {
    const notes: Note[] = [rootNote];
    for (let i = 1; i < frets; i++) {
      const lastNote = notes[notes.length - 1];
      const nextNote = new Interval(
        lastNote,
        IntervalSemitones.MINOR_2ND,
      ).intervalNote;
      notes.push(nextNote);
    }
    return notes;
  }
}
