
import { Position, Range, TextLine } from "vscode";
import { ImpexLine } from "./ImpexLine";
import { isDataLine } from "../ImpexUtil";

export class ImpexDataLine extends ImpexLine {

    constructor(textLine: TextLine) {
        if (isDataLine(textLine.text)) {
            super(textLine);
        } else {
            throw new Error("Passed line is not an impex data line");
        }
    }

    getColumns(): string[] {
        return this.text.split(";");
    }

    rangeForColumnAtIndex(columnIndex: number): Range {
        let columns: string[] = this.getColumns();

        let startPosition, endPosition: number = 0;
        // only if the line has enough columns
        if (columns.length > columnIndex) {
            let lengthSum: number = 0;
            for (let i = 0; i < columnIndex ; i++) {
                // sum up the length of all columns before the desired column to get start position
                // add 1 to the length for the semicolon
                lengthSum = lengthSum + columns[i].length + 1;
            }
            startPosition =  lengthSum;

            // take the start position and add the length of the desired column to get end position
            endPosition = startPosition + columns[columnIndex].length;

            // add 1 to end position if start and end are the same
            // and it is not the last charachter on the line
            if (startPosition === endPosition &&
                (endPosition + 1) <= this.text.length) {
                endPosition = endPosition + 1;
            }
        }

        return new Range(
            new Position(this.lineNumber, startPosition),
            new Position(this.lineNumber, endPosition)
        );
    }

    columnIndexOfPostion(position: number): number {
        let columns: string[] = this.getColumns();

        let lengthSum: number = 0;
        for (let i = 0; i < columns.length; i++) {
            // add 1 to the length for the semicolon
            let newLengthSum: number = lengthSum + columns[i].length + 1;
            // check if position is in this column
            if (lengthSum <= position &&
                newLengthSum > position) {
                    return i;
            }
            lengthSum = newLengthSum;
        }

        // will never be hit
        return 0;
    }
}