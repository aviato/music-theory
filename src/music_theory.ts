const Notes = Object.freeze(
  {
    C: "C",
    C_SHARP: "C#",
    D: "D",
    D_SHARP: "D#",
    E: "E",
    F: "F",
    F_SHARP: "F#",
    G: "G",
    G_SHARP: "G#",
    A: "A",
    A_SHARP: "A#",
    B: "B",
  } as const,
);

const NoteNames: readonly string[] = Object.values(Notes);
type NoteName = (typeof NoteNames)[number];

export const Intervals = Object.freeze(
  {
    UNISON: "unison",
    MINOR_2ND: "minor 2nd",
    MAJOR_2ND: "major 2nd",
    MINOR_3RD: "minor 3rd",
    MAJOR_3RD: "major 3rd",
    PERFECT_4TH: "perfect 4th",
    AUGMENTED_4TH: "augmented 4th",
    DIMINISHED_5TH: "diminished 5th",
    PERFECT_5TH: "perfect 5th",
    MINOR_6TH: "minor 6th",
    MAJOR_6TH: "major 6th",
    MINOR_7TH: "minor 7th",
    MAJOR_7TH: "major 7th",
    OCTAVE: "octave",
  } as const,
);

export const IntervalShorthandNames = Object.freeze(
  {
    [Intervals.UNISON]: "P1",
    [Intervals.MINOR_2ND]: "m2",
    [Intervals.MAJOR_2ND]: "M2",
    [Intervals.MINOR_3RD]: "m3",
    [Intervals.MAJOR_3RD]: "M3",
    [Intervals.PERFECT_4TH]: "P4",
    [Intervals.AUGMENTED_4TH]: "A4",
    [Intervals.DIMINISHED_5TH]: "d5",
    [Intervals.PERFECT_5TH]: "P5",
    [Intervals.MINOR_6TH]: "m6",
    [Intervals.MAJOR_6TH]: "M6",
    [Intervals.MINOR_7TH]: "m7",
    [Intervals.MAJOR_7TH]: "M7",
    [Intervals.OCTAVE]: "P8",
  } as const,
);

export const IntervalSemitones = {
  [Intervals.UNISON]: 0,
  [Intervals.MINOR_2ND]: 1,
  [Intervals.MAJOR_2ND]: 2,
  [Intervals.MINOR_3RD]: 3,
  [Intervals.MAJOR_3RD]: 4,
  [Intervals.PERFECT_4TH]: 5,
  [Intervals.AUGMENTED_4TH]: 6,
  [Intervals.DIMINISHED_5TH]: 6,
  [Intervals.PERFECT_5TH]: 7,
  [Intervals.MINOR_6TH]: 8,
  [Intervals.MAJOR_6TH]: 9,
  [Intervals.MINOR_7TH]: 10,
  [Intervals.MAJOR_7TH]: 11,
  [Intervals.OCTAVE]: 12,
} as const;

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

export const sharpKeys = ["G", "D", "A", "E", "B", "F#", "C#"];
export const flatKeys = ["F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"];

// Function to determine if a key uses sharps or flats
export function usesSharpsOrFlats(rootNote: string): string {
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

type IntervalSemitoneValue =
  (typeof IntervalSemitones)[keyof typeof IntervalSemitones];

export type ScaleType =
  | "chromatic"
  | "major"
  | "minor"
  | "harmonic minor"
  | "melodic minor"
  | "major pentatonic"
  | "minor pentatonic"
  | "blues"
  | "major blues"
  | "minor blues";

export const ScaleTypes = Object.freeze(
  {
    MAJOR: "major",
    MINOR: "minor",
    HARMONIC_MINOR: "harmonic minor",
    MELODIC_MINOR: "melodic minor",
    MAJOR_PENTATONIC: "major pentatonic",
    MINOR_PENTATONIC: "minor pentatonic",
    BLUES: "blues",
    MAJOR_BLUES: "major blues",
    MINOR_BLUES: "minor blues",
    CHROMATIC: "chromatic",
    WHOLETONE: "wholetone",
  } as const,
);

export const ScaleTypeValue = Object.values(ScaleTypes);

const ScaleTypeIntervalMap: { [key: string]: IntervalSemitoneValue[] } = {
  [ScaleTypes.MAJOR]: [
    IntervalSemitones[Intervals.MAJOR_2ND],
    IntervalSemitones[Intervals.MAJOR_3RD],
    IntervalSemitones[Intervals.PERFECT_4TH],
    IntervalSemitones[Intervals.PERFECT_5TH],
    IntervalSemitones[Intervals.MAJOR_6TH],
    IntervalSemitones[Intervals.MAJOR_7TH],
  ],
  [ScaleTypes.MINOR]: [
    IntervalSemitones[Intervals.MAJOR_2ND],
    IntervalSemitones[Intervals.MINOR_3RD],
    IntervalSemitones[Intervals.PERFECT_4TH],
    IntervalSemitones[Intervals.PERFECT_5TH],
    IntervalSemitones[Intervals.MINOR_6TH],
    IntervalSemitones[Intervals.MINOR_7TH],
  ],
  [ScaleTypes.HARMONIC_MINOR]: [
    IntervalSemitones[Intervals.MAJOR_2ND],
    IntervalSemitones[Intervals.MINOR_3RD],
    IntervalSemitones[Intervals.PERFECT_4TH],
    IntervalSemitones[Intervals.PERFECT_5TH],
    IntervalSemitones[Intervals.MINOR_6TH],
    IntervalSemitones[Intervals.MAJOR_7TH],
  ],
  [ScaleTypes.MELODIC_MINOR]: [
    IntervalSemitones[Intervals.MAJOR_2ND],
    IntervalSemitones[Intervals.MINOR_3RD],
    IntervalSemitones[Intervals.PERFECT_4TH],
    IntervalSemitones[Intervals.PERFECT_5TH],
    IntervalSemitones[Intervals.MAJOR_6TH],
    IntervalSemitones[Intervals.MAJOR_7TH],
  ],
  [ScaleTypes.MAJOR_PENTATONIC]: [
    IntervalSemitones[Intervals.MAJOR_2ND],
    IntervalSemitones[Intervals.MAJOR_3RD],
    IntervalSemitones[Intervals.PERFECT_5TH],
    IntervalSemitones[Intervals.MAJOR_6TH],
  ],
  [ScaleTypes.MINOR_PENTATONIC]: [
    IntervalSemitones[Intervals.MINOR_3RD],
    IntervalSemitones[Intervals.PERFECT_4TH],
    IntervalSemitones[Intervals.PERFECT_5TH],
    IntervalSemitones[Intervals.MINOR_7TH],
  ],
  [ScaleTypes.BLUES]: [
    IntervalSemitones[Intervals.MAJOR_3RD],
    IntervalSemitones[Intervals.PERFECT_4TH],
    IntervalSemitones[Intervals.AUGMENTED_4TH],
    IntervalSemitones[Intervals.PERFECT_5TH],
    IntervalSemitones[Intervals.MINOR_7TH],
  ],
  [ScaleTypes.MAJOR_BLUES]: [
    IntervalSemitones[Intervals.MAJOR_2ND],
    IntervalSemitones[Intervals.MAJOR_3RD],
    IntervalSemitones[Intervals.AUGMENTED_4TH],
    IntervalSemitones[Intervals.PERFECT_5TH],
    IntervalSemitones[Intervals.MAJOR_6TH],
    IntervalSemitones[Intervals.MAJOR_7TH],
  ],
  [ScaleTypes.MINOR_BLUES]: [
    IntervalSemitones[Intervals.MAJOR_3RD],
    IntervalSemitones[Intervals.AUGMENTED_4TH],
    IntervalSemitones[Intervals.PERFECT_5TH],
    IntervalSemitones[Intervals.MINOR_6TH],
    IntervalSemitones[Intervals.MINOR_7TH],
  ],
  [ScaleTypes.CHROMATIC]: [
    IntervalSemitones[Intervals.MINOR_2ND],
    IntervalSemitones[Intervals.MAJOR_2ND],
    IntervalSemitones[Intervals.MINOR_3RD],
    IntervalSemitones[Intervals.MAJOR_3RD],
    IntervalSemitones[Intervals.PERFECT_4TH],
    IntervalSemitones[Intervals.AUGMENTED_4TH],
    IntervalSemitones[Intervals.PERFECT_5TH],
    IntervalSemitones[Intervals.MINOR_6TH],
    IntervalSemitones[Intervals.MAJOR_6TH],
    IntervalSemitones[Intervals.MINOR_7TH],
    IntervalSemitones[Intervals.MAJOR_7TH],
  ],
  [ScaleTypes.WHOLETONE]: [
    IntervalSemitones[Intervals.MAJOR_2ND],
    IntervalSemitones[Intervals.MAJOR_3RD],
    IntervalSemitones[Intervals.AUGMENTED_4TH],
    IntervalSemitones[Intervals.AUGMENTED_4TH],
    IntervalSemitones[Intervals.AUGMENTED_4TH],
    IntervalSemitones[Intervals.AUGMENTED_4TH],
  ],
};

export const MAJOR_TRIAD_FORMULA = [
  IntervalSemitones[Intervals.MAJOR_3RD],
  IntervalSemitones[Intervals.PERFECT_5TH],
];

export const MINOR_TRIAD_FORMULA = [
  IntervalSemitones[Intervals.MINOR_3RD],
  IntervalSemitones[Intervals.PERFECT_5TH],
];

export const AUGMENTED_TRIAD_FORMULA = [
  IntervalSemitones[Intervals.MAJOR_3RD],
  IntervalSemitones[Intervals.AUGMENTED_4TH],
];

export const DIMINISHED_TRIAD_FORMULA = [
  IntervalSemitones[Intervals.MINOR_3RD],
  IntervalSemitones[Intervals.DIMINISHED_5TH],
];

export const SUS2_TRIAD_FORMULA = [
  IntervalSemitones[Intervals.MAJOR_2ND],
  IntervalSemitones[Intervals.PERFECT_5TH],
];

export const SUS4_TRIAD_FORMULA = [
  IntervalSemitones[Intervals.PERFECT_4TH],
  IntervalSemitones[Intervals.PERFECT_5TH],
];

export const MAJOR_SEVENTH_FORMULA = [
  IntervalSemitones[Intervals.MAJOR_3RD],
  IntervalSemitones[Intervals.PERFECT_5TH],
  IntervalSemitones[Intervals.MAJOR_7TH],
];

export const MINOR_SEVENTH_FORMULA = [
  IntervalSemitones[Intervals.MINOR_3RD],
  IntervalSemitones[Intervals.PERFECT_5TH],
  IntervalSemitones[Intervals.MINOR_7TH],
];

export const DOMINANT_SEVENTH_FORMULA = [
  IntervalSemitones[Intervals.MAJOR_3RD],
  IntervalSemitones[Intervals.PERFECT_5TH],
  IntervalSemitones[Intervals.MINOR_7TH],
];

export const HALF_DIMINISHED_SEVENTH_FORMULA = [
  IntervalSemitones[Intervals.MINOR_3RD],
  IntervalSemitones[Intervals.DIMINISHED_5TH],
  IntervalSemitones[Intervals.MINOR_7TH],
];

export const DIMINISHED_SEVENTH_FORMULA = [
  IntervalSemitones[Intervals.MINOR_3RD],
  IntervalSemitones[Intervals.DIMINISHED_5TH],
  IntervalSemitones[Intervals.DIMINISHED_5TH],
];

export const MAJOR_NINTH_FORMULA = [
  IntervalSemitones[Intervals.MAJOR_3RD],
  IntervalSemitones[Intervals.PERFECT_5TH],
  IntervalSemitones[Intervals.MAJOR_7TH],
  IntervalSemitones[Intervals.MAJOR_2ND],
];

export const MINOR_NINTH_FORMULA = [
  IntervalSemitones[Intervals.MINOR_3RD],
  IntervalSemitones[Intervals.PERFECT_5TH],
  IntervalSemitones[Intervals.MINOR_7TH],
  IntervalSemitones[Intervals.MAJOR_2ND],
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

export const CHORD_QUALITY_NAMES = Object.freeze(
  {
    MAJOR: "major",
    MINOR: "minor",
    AUGMENTED: "augmented",
    DIMINISHED: "diminished",
    SUS2: "sus2",
    SUS4: "sus4",
    MAJOR_SEVENTH: "major seventh",
    MINOR_SEVENTH: "minor seventh",
    DOMINANT_SEVENTH: "dominant seventh",
    HALF_DIMINISHED_SEVENTH: "half diminished seventh",
    DIMINISHED_SEVENTH: "diminished seventh",
    MAJOR_NINTH: "major ninth",
    MINOR_NINTH: "minor ninth",
  } as const,
);

export type ChordQualityName =
  (typeof CHORD_QUALITY_NAMES)[keyof typeof CHORD_QUALITY_NAMES];

export const CHORD_QUALITY_FORMULAS = Object.freeze(
  {
    [CHORD_QUALITY_NAMES.MAJOR]: MAJOR_TRIAD_FORMULA,
    [CHORD_QUALITY_NAMES.MINOR]: MINOR_TRIAD_FORMULA,
    [CHORD_QUALITY_NAMES.AUGMENTED]: AUGMENTED_TRIAD_FORMULA,
    [CHORD_QUALITY_NAMES.DIMINISHED]: DIMINISHED_TRIAD_FORMULA,
    [CHORD_QUALITY_NAMES.SUS2]: SUS2_TRIAD_FORMULA,
    [CHORD_QUALITY_NAMES.SUS4]: SUS4_TRIAD_FORMULA,
    [CHORD_QUALITY_NAMES.MAJOR_SEVENTH]: MAJOR_SEVENTH_FORMULA,
    [CHORD_QUALITY_NAMES.MINOR_SEVENTH]: MINOR_SEVENTH_FORMULA,
    [CHORD_QUALITY_NAMES.DOMINANT_SEVENTH]: DOMINANT_SEVENTH_FORMULA,
    [CHORD_QUALITY_NAMES.HALF_DIMINISHED_SEVENTH]:
      HALF_DIMINISHED_SEVENTH_FORMULA,
    [CHORD_QUALITY_NAMES.DIMINISHED_SEVENTH]: DIMINISHED_SEVENTH_FORMULA,
    [CHORD_QUALITY_NAMES.MAJOR_NINTH]: MAJOR_NINTH_FORMULA,
    [CHORD_QUALITY_NAMES.MINOR_NINTH]: MINOR_NINTH_FORMULA,
  } as const,
);

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

    const [_, baseNote, accidental, octaveStr] = match;
    const pitchClass = baseNote.toUpperCase();
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

    const freq = this.calculateFrequency(pitchClass, accidental, octave);

    return { accidental, freq, octave, pitchClass };
  }

  public getNoteIndex(note: NoteName, accidentalOffset: number = 0): number {
    const i = NoteNames.indexOf(note);

    if (i === -1) {
      throw new Error(`Invalid base note: ${note}`);
    }

    const noteIndexWithOffset = (i + accidentalOffset) % NoteNames.length;

    return noteIndexWithOffset < 0
      ? noteIndexWithOffset + NoteNames.length
      : noteIndexWithOffset;
  }

  private calculateFrequency(
    baseNote: string,
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
    const A4_INDEX = this.getNoteIndex("A");
    const n = noteIndex - A4_INDEX + (octave - 4) * 12;

    const frequency = 440 * Math.pow(2, n / 12);

    return Math.round(frequency * 100) / 100;
  }
}
// TODO refactor Interval API to allow users to pass in shorthand names
// ex: new Interval("C4", "M3") or new Interval("C4", "major 3rd"
// TODO infer useFlats based on the root note's accidental
export class Interval {
  public intervalNote: Note;
  public name: string = "";
  public shorthand: string = "";

  constructor(
    public rootNote: Note,
    public distance: number,
    public direction: "up" | "down" = "up",
    public useFlats: boolean = false,
  ) {
    this.name = Object.keys(IntervalSemitones).find(
      (key) =>
        IntervalSemitones[key as keyof typeof IntervalSemitones] === distance,
    ) as string;

    this.shorthand =
      IntervalShorthandNames[this.name as keyof typeof IntervalShorthandNames];

    let newNoteName: string = "";

    // Adjust semitone shift based on the direction
    const semitoneShift = this.direction === "up"
      ? this.distance
      : -this.distance;

    // Calculate the new index by adding the semitone shift to the root note's index
    const intervalNoteIndex = (rootNote.index + semitoneShift) %
      NoteNames.length;

    // Handle cases where the index is negative
    const adjustedNoteIndex = intervalNoteIndex < 0
      ? intervalNoteIndex + NoteNames.length
      : intervalNoteIndex;

    // Create the new interval note based on the calculated index and octave shift
    // taking into account the root note's accidental
    if (this.useFlats && sharpToFlatMap[NoteNames[adjustedNoteIndex]]) {
      newNoteName = sharpToFlatMap[NoteNames[adjustedNoteIndex]];
    } else {
      newNoteName = NoteNames[adjustedNoteIndex];
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
    const octaveShift = Math.floor(totalSemitones / NoteNames.length);
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

  constructor(rootNote: Note, scaleType: ScaleType) {
    this.useFlats = flatKeys.includes(
      `${rootNote.pitchClass}${rootNote.accidental}`,
    );
    this.intervals = ScaleTypeIntervalMap[scaleType].map(
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

export const C_MAJOR_SCALE = new MajorScale(new Note("C4"));
export const G_MAJOR_SCALE = new MajorScale(new Note("G4"));
export const D_MAJOR_SCALE = new MajorScale(new Note("D4"));
export const A_MAJOR_SCALE = new MajorScale(new Note("A4"));
export const E_MAJOR_SCALE = new MajorScale(new Note("E4"));
export const B_MAJOR_SCALE = new MajorScale(new Note("B4"));
export const F_SHARP_MAJOR_SCALE = new MajorScale(new Note("F#4"));
export const C_SHARP_MAJOR_SCALE = new MajorScale(new Note("C#4"));
export const F_MAJOR_SCALE = new MajorScale(new Note("F4"));
export const B_FLAT_MAJOR_SCALE = new MajorScale(new Note("Bb4"));
export const E_FLAT_MAJOR_SCALE = new MajorScale(new Note("Eb4"));
export const A_FLAT_MAJOR_SCALE = new MajorScale(new Note("Ab4"));
export const D_FLAT_MAJOR_SCALE = new MajorScale(new Note("Db4"));
export const G_FLAT_MAJOR_SCALE = new MajorScale(new Note("Gb4"));
export const C_FLAT_MAJOR_SCALE = new MajorScale(new Note("Cb4"));

export const STANDARD_GUITAR_TUNING = [
  new Note("E2"),
  new Note("A2"),
  new Note("D3"),
  new Note("G3"),
  new Note("B3"),
  new Note("E4"),
];

export const STANDARD_UKULELE_TUNING = [
  new Note("G4"),
  new Note("C4"),
  new Note("E4"),
  new Note("A4"),
];

export const STANDARD_MANDOLIN_TUNING = [
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
        IntervalSemitones[Intervals.MINOR_2ND],
      ).intervalNote;
      notes.push(nextNote);
    }
    return notes;
  }
}
