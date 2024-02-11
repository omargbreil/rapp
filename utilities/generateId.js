const crypto = require('crypto');

function generateId() {
  const timestamp = Date.now().toString(36); // Use the current timestamp in base 36 for more compactness
  const randomChars = crypto.randomBytes(4).toString('hex'); // Generate a random string using crypto
  const processId = process.pid.toString(36); // Use the process ID in base 36
  const uniqueCounter = generateId.counter.toString(36); // A counter to ensure uniqueness within the same process

  generateId.counter = (generateId.counter + 1) % 36**5; // Increment the counter with a max value

  return `${timestamp}-${processId}-${randomChars}-${uniqueCounter}`;
}

generateId.counter = 0; // Initialize the counter

module.exports = generateId;