
import { ImpexDataLine } from "../../src/model/ImpexDataLine";
import { TextLine, Range } from "vscode";
import { expect } from "chai";
import { createStubInstance } from "sinon";

suite("ImpexDataLine Integration Test", () => {

    let validLine1: TextLine = createTextLine(4, ";;\"string\";45;;");
    let invalidLine: TextLine = createTextLine(8, "");

    test("should not instantiate on invalid line", () => {
        expect(() => new ImpexDataLine(createTextLine(8, ""))).to.throw(Error);
        expect(() => new ImpexDataLine(createTextLine(34, "#;item;"))).to.throw(Error);
    });

    test("should return the correct column number", () => {
        // TODO add column with semicolon in an string
        let line1: ImpexDataLine = new ImpexDataLine(createTextLine(67, ";;\"string\";45;;"));
        let line2: ImpexDataLine = new ImpexDataLine(createTextLine(12, ";   ;  ergR;535;    ;f454"));

        let columns1: string[] = line1.getColumns();
        let columns2: string[] = line2.getColumns();

        expect(columns1.length).to.be.equals(6);
        expect(columns2.length).to.be.equals(6);
    });
});

function createTextLine(lineNumber: number, text: string): TextLine {
    return {
        lineNumber: lineNumber,
        text: text,
        range: createStubInstance(Range),
        rangeIncludingLineBreak: createStubInstance(Range),
        firstNonWhitespaceCharacterIndex: 0,
        isEmptyOrWhitespace: false,
    };
}