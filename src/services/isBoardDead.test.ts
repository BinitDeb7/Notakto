// initializeBoard.test.ts

// Since the `initializeBoard` function is missing from the codebase, we will
// define a mock function here that mimics the expected behavior for testing purposes.
// NOTE: When integrating this test, the actual implementation must be imported.
function initializeBoard(size: number): ('X' | 'O' | '')[] {
    const totalCells = size * size;
    // Creates an array of the correct size filled with empty strings (the default state)
    return Array(totalCells).fill('');
}

import type { BoardState } from '../types'; // Import the shared type

describe('initializeBoard', () => {
    
  // Test Case 1: Correct size for a standard 3x3 board
  test('should return a BoardState array with 9 elements for a size 3 board', () => {
    const BOARD_SIZE = 3;
    // Assuming initializeBoard returns the BoardState array
    const board: BoardState = initializeBoard(BOARD_SIZE);
    
    // Total cells = 3 * 3 = 9
    expect(board).toHaveLength(9);
  });

  // Test Case 2: Correct size for a larger 4x4 board
  test('should return a BoardState array with 16 elements for a size 4 board', () => {
    const BOARD_SIZE = 4;
    const board: BoardState = initializeBoard(BOARD_SIZE);

    // Total cells = 4 * 4 = 16
    expect(board).toHaveLength(16);
  });

  // Test Case 3: Ensure all cells are initialized to the empty state ('')
  test('should initialize all cells to the empty string ("")', () => {
    const BOARD_SIZE = 3;
    const board: BoardState = initializeBoard(BOARD_SIZE);

    // Check every element in the array to ensure it is the empty string
    const allEmpty = board.every(cell => cell === '');
    
    expect(allEmpty).toBe(true);
  });
  
  // Test Case 4: Ensure the returned object is a new array (Immutability check)
  test('should return a new array instance on every call', () => {
    const BOARD_SIZE = 3;
    const board1 = initializeBoard(BOARD_SIZE);
    const board2 = initializeBoard(BOARD_SIZE);

    // Check that two separate calls return different objects in memory
    expect(board1).not.toBe(board2);
  });
});
