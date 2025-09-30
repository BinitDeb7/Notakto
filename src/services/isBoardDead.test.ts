// isBoardDead.test.ts
import { isBoardDead } from './ai'; 
import type { BoardState } from './types'; 

// Define a simple 3x3 board (size 9) for testing
const BOARD_SIZE = 3;

// --- Test Scenarios ---

// 1. Non-Winning / Ongoing Board (Should return false)
const ONGOING_BOARD: BoardState = [
  'X', 'O', '',
  'O', '', 'X',
  '', '', ''
] as BoardState;

// 2. Win Case: Full Row (Should return true)
const ROW_WIN_BOARD: BoardState = [
  'O', 'O', '',
  'X', 'X', 'X', // Win here
  '', '', ''
] as BoardState;

// 3. Win Case: Full Column (Should return true)
const COLUMN_WIN_BOARD: BoardState = [
  'X', 'O', '',
  'X', 'O', '',
  'X', '', '' // Win here
] as BoardState;

// 4. Win Case: Main Diagonal (Should return true)
const DIAG_WIN_BOARD: BoardState = [
  'X', 'O', 'O', // X
  '', 'X', '',   // X
  'O', '', 'X'  // X
] as BoardState;

// 5. Win Case: Anti-Diagonal (Should return true)
const ANTI_DIAG_WIN_BOARD: BoardState = [
  'O', 'O', 'X', // X
  '', 'X', '',   // X
  'X', '', 'O'  // X
] as BoardState;

// 6. Draw/Full Board (No winner, should return false)
const DRAW_BOARD: BoardState = [
  'X', 'O', 'X',
  'X', 'O', 'O',
  'O', 'X', 'O'
] as BoardState;


describe('isBoardDead', () => {

  // Test Case 1: Game is still ongoing
  test('should return false when the board is partially filled and no win condition is met', () => {
    expect(isBoardDead(ONGOING_BOARD, BOARD_SIZE)).toBe(false);
  });

  // Test Case 2: Win detected on a Row
  test('should return true when a player (X) has completed a full row', () => {
    expect(isBoardDead(ROW_WIN_BOARD, BOARD_SIZE)).toBe(true);
  });
  
  // Test Case 3: Win detected on a Column
  test('should return true when a player (X) has completed a full column', () => {
    expect(isBoardDead(COLUMN_WIN_BOARD, BOARD_SIZE)).toBe(true);
  });

  // Test Case 4: Win detected on the Main Diagonal
  test('should return true when a player (X) has completed the main diagonal (0, 4, 8)', () => {
    expect(isBoardDead(DIAG_WIN_BOARD, BOARD_SIZE)).toBe(true);
  });

  // Test Case 5: Win detected on the Anti-Diagonal
  test('should return true when a player (X) has completed the anti-diagonal (2, 4, 6)', () => {
    expect(isBoardDead(ANTI_DIAG_WIN_BOARD, BOARD_SIZE)).toBe(true);
  });

  // Test Case 6: Draw detected (Full Board with no winner)
  test('should return false for a full board where X has not won (a Draw)', () => {
    expect(isBoardDead(DRAW_BOARD, BOARD_SIZE)).toBe(false);
  });
});
