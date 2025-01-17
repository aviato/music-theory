import {
  Fretboard,
  Interval,
  IntervalSemitones,
  Note,
  Scale,
  ScaleTypes,
  STANDARD_GUITAR_TUNING,
} from "./music_theory.ts";
import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

describe("Note", () => {
  it("parseNoteName", () => {});

  it("Creates valid Note instances when given scientific note names", () => {
    const A4 = new Note("A4");
    const Gs6 = new Note("G#6");
    const Ebb5 = new Note("Ebb5");
    const Bb3 = new Note("Bb3");
    expect(A4.pitchClass).toBe("A");
    expect(A4.accidental).toBe("");
    expect(A4.octave).toBe(4);
    expect(A4.freq).toBe(440);
    expect(Gs6.pitchClass).toBe("G");
    expect(Gs6.accidental).toBe("#");
    expect(Gs6.octave).toBe(6);
    expect(Gs6.freq).toBe(1661.22);
    expect(Ebb5.pitchClass).toBe("E");
    expect(Ebb5.accidental).toBe("bb");
    expect(Ebb5.octave).toBe(5);
    expect(Ebb5.freq).toBe(587.33);
    expect(Bb3.pitchClass).toBe("B");
    expect(Bb3.accidental).toBe("b");
    expect(Bb3.octave).toBe(3);
    expect(Bb3.freq).toBe(233.08);
  });
});

describe("Interval", () => {
  it("Creates M3 with the correct interval note", () => {
    const M3 = new Interval(
      new Note("C4"),
      IntervalSemitones.MAJOR_3RD,
    );
    const m7 = new Interval(
      new Note("G5"),
      IntervalSemitones.MINOR_7TH,
    );
    const p5Down = new Interval(
      new Note("Bb3"),
      IntervalSemitones.PERFECT_5TH,
      "down",
      true,
    );
    expect(M3.rootNote.name).toBe("C4");
    expect(M3.intervalNote.name).toBe("E4");
    expect(m7.rootNote.name).toBe("G5");
    expect(m7.intervalNote.name).toBe("F6");
    expect(p5Down.intervalNote.name).toBe("Eb3");
  });
  it("Creates new notes by stringing together intervals", () => {
    const C4 = new Note("C4");
    const M3 = new Interval(C4, IntervalSemitones.MAJOR_3RD); // E4
    const P5 = new Interval(
      M3.intervalNote,
      IntervalSemitones.PERFECT_5TH,
    );
    const M7 = new Interval(
      P5.intervalNote,
      IntervalSemitones.MAJOR_7TH,
    );
    expect(M3.intervalNote.name).toBe("E4");
    expect(P5.intervalNote.name).toBe("B4");
    expect(M7.intervalNote.name).toBe("A#5");
  });
});

describe("Chord", () => {
  it("Creates chord given a root note, and an array of intervals", () => {});
});

describe("Scale", () => {
  it("creates a major scale when given a root and a scale type", () => {
    const root = new Note("C4");
    const majorScale = new Scale(root, ScaleTypes.MAJOR);

    expect(majorScale.notes[0].name).toBe("C4");
    expect(majorScale.notes[1].name).toBe("D4");
    expect(majorScale.notes[2].name).toBe("E4");
    expect(majorScale.notes[3].name).toBe("F4");
    expect(majorScale.notes[4].name).toBe("G4");
    expect(majorScale.notes[5].name).toBe("A4");
    expect(majorScale.notes[6].name).toBe("B4");

    expect(majorScale.intervals[0].shorthand).toBe("M2");
    expect(majorScale.intervals[1].shorthand).toBe("M3");
    expect(majorScale.intervals[2].shorthand).toBe("P4");
    expect(majorScale.intervals[3].shorthand).toBe("P5");
    expect(majorScale.intervals[4].shorthand).toBe("M6");
    expect(majorScale.intervals[5].shorthand).toBe("M7");
  });
  it("creates a minor scale when given a root and a scale type", () => {
    const root = new Note("A4");
    const minorScale = new Scale(root, ScaleTypes.MINOR);

    expect(minorScale.notes[0].name).toBe("A4");
    expect(minorScale.notes[1].name).toBe("B4");
    expect(minorScale.notes[2].name).toBe("C5");
    expect(minorScale.notes[3].name).toBe("D5");
    expect(minorScale.notes[4].name).toBe("E5");
    expect(minorScale.notes[5].name).toBe("F5");
    expect(minorScale.notes[6].name).toBe("G5");

    expect(minorScale.intervals[0].shorthand).toBe("M2");
    expect(minorScale.intervals[1].shorthand).toBe("m3");
    expect(minorScale.intervals[2].shorthand).toBe("P4");
    expect(minorScale.intervals[3].shorthand).toBe("P5");
    expect(minorScale.intervals[4].shorthand).toBe("m6");
    expect(minorScale.intervals[5].shorthand).toBe("m7");
  });
  it("creates a major pentatonic scale when given a root and a scale type", () => {
    const root = new Note("C4");
    const majorPentatonicScale = new Scale(root, ScaleTypes.MAJOR_PENTATONIC);

    expect(majorPentatonicScale.notes[0].name).toBe("C4");
    expect(majorPentatonicScale.notes[1].name).toBe("D4");
    expect(majorPentatonicScale.notes[2].name).toBe("E4");
    expect(majorPentatonicScale.notes[3].name).toBe("G4");
    expect(majorPentatonicScale.notes[4].name).toBe("A4");

    expect(majorPentatonicScale.intervals[0].shorthand).toBe("M2");
    expect(majorPentatonicScale.intervals[1].shorthand).toBe("M3");
    expect(majorPentatonicScale.intervals[2].shorthand).toBe("P5");
    expect(majorPentatonicScale.intervals[3].shorthand).toBe("M6");
  });
  it("creates a minor pentatonic scale when given a root and a scale type", () => {
    const root = new Note("A4");
    const minorPentatonicScale = new Scale(root, ScaleTypes.MINOR_PENTATONIC);

    expect(minorPentatonicScale.notes[0].name).toBe("A4");
    expect(minorPentatonicScale.notes[1].name).toBe("C5");
    expect(minorPentatonicScale.notes[2].name).toBe("D5");
    expect(minorPentatonicScale.notes[3].name).toBe("E5");
    expect(minorPentatonicScale.notes[4].name).toBe("G5");

    expect(minorPentatonicScale.intervals[0].shorthand).toBe("m3");
    expect(minorPentatonicScale.intervals[1].shorthand).toBe("P4");
    expect(minorPentatonicScale.intervals[2].shorthand).toBe("P5");
    expect(minorPentatonicScale.intervals[3].shorthand).toBe("m7");
  });
});

describe("Fretboard", () => {
  it("creates a fretboard with 6 strings and 10 frets", () => {
    const mockGuitarFretboard = [
      ["E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", "C3", "C#3"],
      ["A2", "A#2", "B2", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3"],
      ["D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3"],
      ["G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4"],
      ["B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4"],
      ["E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5"],
    ].map((string) => string.map((note) => new Note(note)));

    const fretboard = new Fretboard(STANDARD_GUITAR_TUNING, 10);

    for (let i = 0; i < fretboard.strings.length; i++) {
      for (let j = 0; j < fretboard.strings[i].length; j++) {
        expect(fretboard.strings[i][j].name).toBe(
          mockGuitarFretboard[i][j].name,
        );
      }
    }

    expect(fretboard.strings.length).toBe(6);
    expect(fretboard.strings[0][0].name).toBe("E2");
    expect(fretboard.strings[0].length).toBe(10);
    expect(fretboard.numFrets).toBe(10);
    expect(fretboard.strings[0][9].name).toBe("C#3");
  });
});
