import ITargetsBehaviour from '../TargetsBehaviours/ITargetsBehaviour';
import Unit from '../Unit';
import { UnitCoords } from '../../../config/config';
import * as DamageType from '../DamageBehaviours/DamageTypes';

export default class MeleeTargetBehaviourUPD implements ITargetsBehaviour {
  public getPossibleTargets(pos: number, board: Unit[], rowsCount: number): boolean[] {
    const canUnitAttack = this.canUnitAttack(pos, [...board], rowsCount);
    if (!canUnitAttack) {
      return this.getFinalTargets(
        this.initBoardWithFalse(board.length, rowsCount),
        board.length,
        rowsCount,
      );
    }

    const enemyLine: number = this.getFrontRowToAttack(pos, [
      ...this.getBoardWithRows([...board], rowsCount),
    ]);
    const unitCoords: UnitCoords = this.getUnitColnRow(
      [...this.getBoardWithRows([...board], rowsCount)],
      pos,
    );

    return this.getFinalTargets(
      [...this.getTargets(unitCoords, enemyLine, rowsCount, [...board])],
      board.length,
      rowsCount,
    );
  }

  private canUnitAttack(pos: number, board: Unit[], rowsCount: number): boolean {
    const boardWithRows: Unit[][] = this.getBoardWithRows([...board], rowsCount);
    const unitCoords: UnitCoords = this.getUnitColnRow([...boardWithRows], pos);
    const unitTeam: 1 | 2 = this.getUnitTeam(pos, board.length);

    let frontRow = boardWithRows.length / 2;
    if (unitTeam === 2) {
      frontRow--;
    }

    if (unitCoords.row === frontRow) {
      return true;
    } else {
      return this.isRowDead(boardWithRows[frontRow]);
    }
  }

  private getBoardWithRows(board: Unit[], rowsCount: number): Unit[][] {
    let boardWithRows: Unit[][] = [];
    const cols: number = board.length / rowsCount;

    for (let i = 0; i < rowsCount; i++) {
      boardWithRows.push(board.splice(0, cols));
    }

    return boardWithRows;
  }

  private isRowDead(row: Unit[]): boolean {
    return row.findIndex(elem => {
      return elem.damageType !== DamageType.DEAD;
    }) === -1
      ? true
      : false;
  }

  private getUnitColnRow(boardWithRows: Unit[][], pos: number): UnitCoords {
    let unitCoords: UnitCoords = {
      col: 0,
      row: 0,
    };

    pos >= boardWithRows[0].length
      ? (unitCoords.col = pos % boardWithRows[0].length)
      : (unitCoords.col = pos);

    pos >= boardWithRows.length - 1
      ? (unitCoords.row = Math.floor(pos / (boardWithRows.length - 1)))
      : (unitCoords.row = 0);

    return unitCoords;
  }

  private getUnitTeam(unitPos: number, boardLength: number): 1 | 2 {
    return unitPos < boardLength / 2 ? 2 : 1;
  }

  private initBoardWithFalse(boardLength: number, rowsCount: number): boolean[][] {
    let possibleTargets: boolean[][] = [];
    const cols = boardLength / rowsCount;

    for (let i = 0; i < rowsCount; i++) {
      let row: boolean[] = new Array(cols);
      possibleTargets.push(row.fill(false, 0));
    }
    return possibleTargets;
  }

  private targetFullRow(rowNumber: number, rowsCount: number, boardLength: number): boolean[][] {
    let possibleTargets: boolean[][] = this.initBoardWithFalse(boardLength, rowsCount);
    let targetRow: boolean[] = new Array(boardLength / rowsCount);
    targetRow.fill(true);

    possibleTargets[rowNumber] = targetRow;
    return possibleTargets;
  }

  private targetFrontUnit(
    unitCoords: UnitCoords,
    enemyLine: number,
    boardWithRows: Unit[][],
    boardLength: number,
  ): boolean[][] {
    let possibleTargets: boolean[][] = this.initBoardWithFalse(boardLength, boardWithRows.length);
    let targetRow: boolean[] = new Array(boardLength / boardWithRows.length);
    targetRow.fill(false);
    if (boardWithRows[enemyLine][unitCoords.col].damageType === DamageType.DEAD) {
      let i = unitCoords.col + 1;
      while (
        i < boardWithRows[0].length &&
        boardWithRows[enemyLine][i].damageType === DamageType.DEAD
      ) {
        i++;
      }
      targetRow[i] = true;
      i = unitCoords.col - 1;
      while (i >= 0 && boardWithRows[enemyLine][i].damageType === DamageType.DEAD) {
        i--;
      }
      targetRow[i] = true;
    } else {
      targetRow[unitCoords.col] = true;
      if (
        unitCoords.col + 1 < boardWithRows[0].length &&
        boardWithRows[enemyLine][unitCoords.col + 1].damageType !== DamageType.DEAD
      ) {
        targetRow[unitCoords.col + 1] = true;
      }
      if (
        unitCoords.col - 1 >= 0 &&
        boardWithRows[enemyLine][unitCoords.col - 1].damageType !== DamageType.DEAD
      ) {
        targetRow[unitCoords.col - 1] = true;
      }
    }

    possibleTargets[enemyLine] = targetRow;

    return possibleTargets;
  }

  private getFinalTargets(
    possibleTargets: boolean[][],
    boardLength: number,
    rowsCount: number,
  ): boolean[] {
    let finalPossibleTargets: boolean[] = [];

    for (let i = 0; i < rowsCount; i++) {
      for (let g = 0; g < boardLength / rowsCount; g++) {
        finalPossibleTargets.push(possibleTargets[i][g]);
      }
    }
    return finalPossibleTargets;
  }

  private getFrontRowToAttack(pos: number, boardWithRows: Unit[][]): number {
    const unitTeam: 1 | 2 = this.getUnitTeam(pos, boardWithRows.length * boardWithRows[0].length);
    const unitCoords: UnitCoords = this.getUnitColnRow([...boardWithRows], pos);

    switch (unitTeam) {
      case 1: {
        let i = unitCoords.row - 1;
        while (this.isRowDead(boardWithRows[i])) {
          i--;
        }
        return i;
      }
      case 2: {
        let i = unitCoords.row + 1;
        while (this.isRowDead(boardWithRows[i])) {
          i++;
        }
        return i;
      }
    }
  }

  private getTargets(
    unitCoords: UnitCoords,
    enemyLine: number,
    rowsCount: number,
    board: Unit[],
  ): boolean[][] {
    if (unitCoords.row === enemyLine + 1 || unitCoords.row === enemyLine - 1) {
      return this.targetFrontUnit(
        unitCoords,
        enemyLine,
        [...this.getBoardWithRows([...board], rowsCount)],
        board.length,
      );
    } else {
      return this.targetFullRow(enemyLine, rowsCount, board.length);
    }
  }
}
