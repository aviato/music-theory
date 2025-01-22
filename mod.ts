export enum Notes {
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

export type NoteNameKeys = keyof typeof Notes;
export type NoteName = (typeof Notes)[keyof typeof Notes];
export const NoteNames: NoteName[] = Object.values(Notes);

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

export type IntervalKeys = keyof typeof Intervals;
export type IntervalValue = (typeof Intervals)[keyof typeof Intervals];

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

export type SemitoneKeys = keyof typeof IntervalSemitones;
export type SemitoneValue =
  (typeof IntervalSemitones)[keyof typeof IntervalSemitones];

const getIntervalNameBySemitones = (
  semitones: SemitoneValue,
): IntervalValue => {
  const intervalKeyName = Object.keys(IntervalSemitones).find(
    (key) => IntervalSemitones[key as SemitoneKeys] === semitones,
  );

  return Intervals[intervalKeyName as IntervalKeys] as IntervalValue;
};

export const sharpToFlatMap: { [key: string]: string } = {
  "C#": "Db",
  "D#": "Eb",
  "F#": "Gb",
  "G#": "Ab",
  "A#": "Bb",
  "B#": "C",
  "E#": "F",
};

export const flatToSharpMap: { [key: string]: string } = {
  Cb: "B",
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#",
  Fb: "E",
};

export const sharpKeys: string[] = [
  "G",
  "D",
  "A",
  "E",
  "B",
  "F#",
  "C#",
];

export const flatKeys: string[] = [
  "F",
  "Bb",
  "Eb",
  "Ab",
  "Db",
  "Gb",
  "Cb",
];

// TODO: This should be renamed if not entirely rewritten
export function usesSharpsOrFlats(rootNote: NoteName): string {
  if (rootNote === "C") {
    return "none"; // C major has no sharps or flats
  } else if (sharpKeys.includes(rootNote)) {
    return "sharps";
  } else if (flatKeys.includes(rootNote)) {
    return "flats";
  } else {
    throw new Error(`Unknown root note: ${rootNote}`);
  }
}

export enum ScaleTypes {
  MAJOR = "major",
  MINOR = "minor",
  MAJOR_PENTATONIC = "major pentatonic",
  MINOR_PENTATONIC = "minor pentatonic",
  MAJOR_BLUES = "major blues",
  MINOR_BLUES = "minor blues",
  CHROMATIC = "chromatic",
}

export type ScaleTypesKeys = keyof typeof ScaleTypes;
export type ScaleTypeValue = (typeof ScaleTypes)[keyof typeof ScaleTypes];

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

// Chord Formulas
// TODO: Add more chord formulas like 9th, 11th, 13th, etc.
export const MAJOR_TRIAD_FORMULA = [
  IntervalSemitones.MAJOR_3RD,
  IntervalSemitones.PERFECT_5TH,
];

export const MINOR_TRIAD_FORMULA = [
  IntervalSemitones.MINOR_3RD,
  IntervalSemitones.PERFECT_5TH,
];

export const AUGMENTED_TRIAD_FORMULA = [
  IntervalSemitones.MAJOR_3RD,
  IntervalSemitones.AUGMENTED_4TH,
];

export const DIMINISHED_TRIAD_FORMULA = [
  IntervalSemitones.MINOR_3RD,
  IntervalSemitones.DIMINISHED_5TH,
];

export const SUS2_TRIAD_FORMULA = [
  IntervalSemitones.MAJOR_2ND,
  IntervalSemitones.PERFECT_5TH,
];

export const SUS4_TRIAD_FORMULA = [
  IntervalSemitones.PERFECT_4TH,
  IntervalSemitones.PERFECT_5TH,
];

export const MAJOR_SEVENTH_FORMULA = [
  IntervalSemitones.MAJOR_3RD,
  IntervalSemitones.PERFECT_5TH,
  IntervalSemitones.MAJOR_7TH,
];

export const MINOR_SEVENTH_FORMULA = [
  IntervalSemitones.MINOR_3RD,
  IntervalSemitones.PERFECT_5TH,
  IntervalSemitones.MINOR_7TH,
];

export const DOMINANT_SEVENTH_FORMULA = [
  IntervalSemitones.MAJOR_3RD,
  IntervalSemitones.PERFECT_5TH,
  IntervalSemitones.MINOR_7TH,
];

export const HALF_DIMINISHED_SEVENTH_FORMULA = [
  IntervalSemitones.MINOR_3RD,
  IntervalSemitones.DIMINISHED_5TH,
  IntervalSemitones.MINOR_7TH,
];

export type ChordQuality =
  | "major"
  | "minor"
  | "augmented"
  | "diminished"
  | "sus2"
  | "sus4"
  | "major seventh"
  | "minor seventh"
  | "dominant seventh"
  | "half diminished seventh"
  | "diminished seventh"
  | "major ninth"
  | "minor ninth";

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

export type ChordQualityKeys = keyof typeof ChordQualityNames;
export type ChordQualityValue =
  (typeof ChordQualityNames)[keyof typeof ChordQualityNames];

export class Note {
  readonly pitchClass: string = ""; // Ex: "C"
  readonly octave: number = -1;
  readonly accidental?: string = ""; // Ex: "#" or "bb"
  readonly freq: number = -999; // Frequency in Hz
  readonly enharmonicSpelling?: string = ""; // Ex: "B#" or "E#"
  readonly enharmonicNote?: Note | null = null; // Ex: new Note("B#")
  index: number = -1; // TODO make readonly

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
export class Interval {
  public intervalNote: Note;
  public name: string = "";
  public shorthand: string = "";

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

export class Chord {
  public notes: Note[] = [];

  constructor(rootNote: Note, intervals: Interval[]) {
    this.notes.push(rootNote);

    intervals.forEach((interval) => {
      this.notes.push(interval.intervalNote);
    });
  }
}

export class Scale {
  public notes: Note[] = [];
  public intervals: Interval[] = [];
  public name: string = "";
  public flatsCount: number = 0;
  public sharpsCount: number = 0;
  public useFlats: boolean = false;

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

  public getScaleDegree(note: Note): number {
    const index = this.notes.findIndex((scaleNote) =>
      scaleNote.pitchClass + scaleNote.accidental ===
        note.pitchClass + note.accidental
    );

    return index >= 0 ? index + 1 : -1;
  }
}

export class MajorScale extends Scale {
  constructor(rootNote: Note) {
    super(rootNote, ScaleTypes.MAJOR);
    this.name = "Major";
  }
}

export class MinorScale extends Scale {
  constructor(rootNote: Note) {
    super(rootNote, ScaleTypes.MINOR);
    this.name = "Minor";
  }
}

export class ChromaticScale extends Scale {
  constructor(rootNote: Note) {
    super(rootNote, ScaleTypes.CHROMATIC);
    this.name = "Chromatic";
  }
}

export const C_MAJOR_SCALE: Scale = new MajorScale(new Note("C4"));
export const G_MAJOR_SCALE: Scale = new MajorScale(new Note("G4"));
export const D_MAJOR_SCALE: Scale = new MajorScale(new Note("D4"));
export const A_MAJOR_SCALE: Scale = new MajorScale(new Note("A4"));
export const E_MAJOR_SCALE: Scale = new MajorScale(new Note("E4"));
export const B_MAJOR_SCALE: Scale = new MajorScale(new Note("B4"));
export const F_SHARP_MAJOR_SCALE: Scale = new MajorScale(new Note("F#4"));
export const C_SHARP_MAJOR_SCALE: Scale = new MajorScale(new Note("C#4"));
export const F_MAJOR_SCALE: Scale = new MajorScale(new Note("F4"));
export const B_FLAT_MAJOR_SCALE: Scale = new MajorScale(new Note("Bb4"));
export const E_FLAT_MAJOR_SCALE: Scale = new MajorScale(new Note("Eb4"));
export const A_FLAT_MAJOR_SCALE: Scale = new MajorScale(new Note("Ab4"));
export const D_FLAT_MAJOR_SCALE: Scale = new MajorScale(new Note("Db4"));
export const G_FLAT_MAJOR_SCALE: Scale = new MajorScale(new Note("Gb4"));
export const C_FLAT_MAJOR_SCALE: Scale = new MajorScale(new Note("Cb4"));

export const STANDARD_GUITAR_TUNING: Note[] = [
  new Note("E2"),
  new Note("A2"),
  new Note("D3"),
  new Note("G3"),
  new Note("B3"),
  new Note("E4"),
];

export const STANDARD_UKULELE_TUNING: Note[] = [
  new Note("G4"),
  new Note("C4"),
  new Note("E4"),
  new Note("A4"),
];

export const STANDARD_MANDOLIN_TUNING: Note[] = [
  new Note("G3"),
  new Note("D4"),
  new Note("A4"),
  new Note("E5"),
];

export class Fretboard {
  public strings: Note[][];

  constructor(
    public tuning: Note[] = [],
    public numFrets: number = 24,
  ) {
    this.strings = this.buildFretboard(this.tuning, this.numFrets);
  }

  private buildFretboard(tuning: Note[], frets: number): Note[][] {
    return tuning.map((openStringNote) =>
      this.buildStringNotes(openStringNote, frets)
    );
  }

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
