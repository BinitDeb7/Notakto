// updateBoards.test.ts
import { updateBoards } from './ai'; 
import type { BoardState } from './types'; 

// Constants used for testing
const BOARD_SIZE = 3; 

// Initial state with two boards (3x3 grid = 9 cells)
// This state MUST NOT change during the tests (immutability check)
const INITIAL_BOARDS: BoardState[] = [
  ['', '', '', '', '', '', '', '', ''],         // Board 0: All empty
  ['', 'X', 'O', '', '', '', '', '', ''],       // Board 1: Partially filled
] as BoardState[];


describe('updateBoards', () => {

  // Test Case 1: Correctly applies a move and updates the cell value to 'X'
  test('should correctly place an "X" on the specified cell of the specified board', () => {
    const move = { boardIndex: 0, cellIndex: 4 }; // Middle cell of Board 0 (index 4)
    
    const newBoards = updateBoards(INITIAL_BOARDS, move);

    // 1. Check that the specific cell has been updated
    expect(newBoards[0][4]).toBe('X');

    // 2. Check that a nearby cell remains unchanged
    expect(newBoards[0][0]).toBe('');
  });

  // Test Case 2: Crucial Immutability Check
  test('should return a new array of boards without modifying the original array', () => {
    const move = { boardIndex: 0, cellIndex: 4 };

    // Apply the move
    const newBoards = updateBoards(INITIAL_BOARDS, move);

    // Check 1: The returned array object must be different from the input array object
    expect(newBoards).not.toBe(INITIAL_BOARDS);

    // Check 2: The ORIGINAL board state must be UNCHANGED (still empty at index 4)
    expect(INITIAL_BOARDS[0][4]).toBe('');
  });

  // Test Case 3: Applying a move to a partially filled board
  test('should update a cell on a partially filled board while preserving existing marks', () => {
    const move = { boardIndex: 1, cellIndex: 3 }; // Cell 3 of Board 1
    
    const newBoards = updateBoards(INITIAL_BOARDS, move);

    // Check 1: The new move is applied
    expect(newBoards[1][3]).toBe('X');
    
    // Check 2: The existing marks ('X' and 'O') remain preserved
    expect(newBoards[1][1]).toBe('X'); 
    expect(newBoards[1][2]).toBe('O'); 

    // Check 3: The original board is still intact
    expect(INITIAL_BOARDS[1][3]).toBe(''); 
  });
});
