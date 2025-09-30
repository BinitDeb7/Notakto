module.exports = {
  // Keep the React Native preset
  preset: 'react-native', 
  
  // Add support for all React Native file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // Update the test matching pattern to include JSX files
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  
  // Configure ts-jest to transform both .ts and .tsx files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    // The React Native preset usually handles .js and .jsx, 
    // but explicitly transform them if needed:
    // '^.+\\.(js|jsx)$': 'babel-jest',
  },
  
  // Specify test environment for node (useful for utility functions like game logic)
  testEnvironment: 'node', 

  // Ensure ts-jest uses the correct config file (crucial for ts-jest)
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', 
    },
  },
};
