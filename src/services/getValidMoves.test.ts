// Adjust the path below if your 'ai.ts' file is located elsewhere relative to this test file.
import { getValidMoves } from './ai'; 
// 💡 IMPORTANT: Import the BoardState type from the central 'types' file
import type { BoardState } from './types'; 

// --- Setup Definitions ---
// Removed the local definition: type BoardState = ('X' | 'O' | '')[];
const BOARD_SIZE = 3; // Assuming a 3x3 Tic-Tac-Toe style board (9 cells)

// --- Test Board Scenarios ---

// 1. Empty Board (all cells are valid moves)
const EMPTY_BOARD: BoardState = [
  '', '', '',
  '', '', '',
  '', '', ''
];

// 2. Dead Board (The AI's win condition is met, e.g., X, X, X in the first row)
const DEAD_BOARD_0: BoardState = [
  'X', 'X', 'X',
  '', '', '',
  '', '', ''
];

// 3. Partially Filled Board (only the center (index 4) is empty)
const PARTIAL_BOARD: BoardState = [
  'X', 'O', 'X',
  'O', '', 'O',
  'X', 'O', 'X'
];


// --- Jest Test Suite ---
describe('getValidMoves', () => {

  // Test Case 1: Identifies all empty cells as valid moves on an empty board
  test('should return all 9 cells as valid moves for a single empty board', () => {
    const boards = [EMPTY_BOARD];
    const moves = getValidMoves(boards, BOARD_SIZE);

    // Expect 9 valid moves for a 3x3 empty board
    expect(moves.length).toBe(9);
    
    // Check that the structure of a move is correct
    expect(moves[0]).toEqual({ boardIndex: 0, cellIndex: expect.any(Number) });
  });

  // Test Case 2: Filters out moves on dead/winning boards
  test('should not return any moves if the only board provided is already dead', () => {
    const boards = [DEAD_BOARD_0];
    const moves = getValidMoves(boards, BOARD_SIZE);

    // isBoardDead will be true for this board, so it should be skipped.
    expect(moves.length).toBe(0);
  });
  
  // Test Case 3: Filters out occupied cells
  test('should only return the single empty cell on a nearly full board', () => {
    const boards = [PARTIAL_BOARD]; // Only index 4 is empty
    const moves = getValidMoves(boards, BOARD_SIZE);

    // Only 1 valid move expected
    expect(moves.length).toBe(1);
    
    // Check that the returned move is indeed the empty cell (index 4)
    expect(moves[0].cellIndex).toBe(4); 
  });
  
  // Test Case 4: Checks filtering across multiple boards
  test('should filter out the dead board but find all moves on the empty board', () => {
    // Board 0 is dead, Board 1 is empty
    const boards = [DEAD_BOARD_0, EMPTY_BOARD]; 
    const moves = getValidMoves(boards, BOARD_SIZE);

    // All 9 moves should come from the EMPTY_BOARD (Board 1)
    expect(moves.length).toBe(9);
    
    // Check that all moves are correctly assigned to boardIndex 1
    moves.forEach(move => {
      expect(move.boardIndex).toBe(1);
    });
  });

  // Test Case 5: Checks the center-bias move ordering (Heuristic)
  test('should sort moves by the center-bias heuristic (highest value, center-most first)', () => {
    const boards = [EMPTY_BOARD];
    const moves = getValidMoves(boards, BOARD_SIZE);

    // For a 3x3 board, the center cell (index 4) has the highest heuristic value 
    // and should be the first move returned after sorting.
    expect(moves[0].cellIndex).toBe(4);
    
    // The corners (indices 0, 2, 6, 8) have the lowest heuristic value 
    // and should be among the last moves returned.
    const lastFourMoves = moves.slice(-4).map(m => m.cellIndex);
    expect(lastFourMoves).toContain(0);
    expect(lastFourMoves).toContain(2);
    expect(lastFourMoves).toContain(6);
    expect(lastFourMoves).toContain(8);
  });
});
