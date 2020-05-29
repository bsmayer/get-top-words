const { Readable } = require("stream");

/* 
  Author: Bruno Mayer
  This file contains two versions of functions for solving the same problem: getting the top words from a string.
  One of them is sync, blocking and does not need the latest version of NodeJS.
  The other one is async, non-blocking and I did as an experiment. It Uses the latest NodeJS Stream API (Node 12+)
*/

/**
 * Find the top words from a string (sync)
 * @param {*} sentence
 * @param {*} numberOfPositions
 */
function findTopWords(sentence, numberOfPositions = 3) {
  if (!sentence.trim()) return [];

  // Filter for the words only, removing ponctuation
  const str = sentence.toLowerCase().replace(/[^a-zA-Z ]+/g, "");
  if (!str.trim()) return [];

  // Find the number of occurencies for each word
  const words = str.split(" ");
  const occurencies = new Map();
  for (const word of words) {
    let value = occurencies.has(word) ? occurencies.get(word) : { word, count: 0 };
    occurencies.set(word, { word, count: value.count + 1 });
  }

  // Sort the array by count desc
  const sorted = [...occurencies.values()].sort((a, b) => (a.count > b.count ? -1 : 1));

  // Return the top words
  return sorted.map((o) => o.word.toLowerCase()).slice(0, numberOfPositions);
}

/**
 * Find the top words from a string using streams - Needs Node 12+
 * Important: experiment only
 * @param {*} sentence
 * @param {*} numberOfPositions
 */
function findTopWordsAsync(sentence, numberOfPositions = 3) {
  return new Promise((resolve, reject) => {
    try {
      if (!sentence.trim()) return resolve([]);

      // Filter for the words only, removing ponctuation
      const str = sentence.toLowerCase().replace(/[^a-zA-Z ]+/g, "");
      if (!str.trim()) return resolve([]);

      // Creates a readble stream from the array of words
      const stream = Readable.from(str.split(" "));
      const occurencies = new Map();

      // Find the number of occurencies for each word
      stream.on("data", (word) => {
        let value = occurencies.has(word) ? occurencies.get(word) : { word, count: 0 };
        occurencies.set(word, { word, count: value.count + 1 });
      });

      // Finished reading the words, sort the array to find the top words
      stream.on("end", () => {
        const sorted = [...occurencies.values()].sort((a, b) => (a.count > b.count ? -1 : 1));
        return resolve(sorted.map((o) => o.word.toLowerCase()).slice(0, numberOfPositions));
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { findTopWords, findTopWordsAsync };
