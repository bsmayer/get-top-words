const { findTopWords, findTopWordsAsync } = require("./util");

describe("findTopWords", () => {
  it("should return an empty array for an empty string", () => {
    const arr = findTopWords("");
    expect(arr).toBeDefined();
    expect(arr.length).toBe(0);
  });

  it("should return an empty array for a string with no letters", () => {
    const arr = findTopWords(": , {} 8");
    expect(arr).toBeDefined();
    expect(arr.length).toBe(0);
  });

  it("should return only one item for a string with the same word", () => {
    const arr = findTopWords("one one one");
    expect(arr.length).toBe(1);
    expect(arr[0]).toEqual("one");
  });

  it("should return two items for a string with two words only", () => {
    const arr = findTopWords("one two one two one");
    expect(arr.length).toBe(2);
    expect(arr[0]).toEqual("one");
    expect(arr[1]).toEqual("two");
  });

  it("should group the words in case-insensitive", () => {
    const arr = findTopWords("one One ONE oNe");
    expect(arr.length).toBe(1);
    expect(arr[0]).toEqual("one");
  });

  it("should return the correct array with more than 3 different words", () => {
    const arr = findTopWords("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e");
    expect(arr.length).toBe(3);
    expect(arr[0]).toEqual("e");
    expect(arr[1]).toEqual("ddd");
    expect(arr[2]).toEqual("aa");
  });

  it("should return the correct array if numberOfPositions > 3", () => {
    const arr = findTopWords("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e", 4);
    expect(arr.length).toBe(4);
    expect(arr[0]).toEqual("e");
    expect(arr[1]).toEqual("ddd");
    expect(arr[2]).toEqual("aa");
    expect(arr[3]).toEqual("cc");
  });
});

describe("findTopWordsAsync", () => {
  it("should return an empty array for an empty string", async () => {
    const arr = await findTopWordsAsync("");
    expect(arr).toBeDefined();
    expect(arr.length).toBe(0);
  });

  it("should return an empty array for a string with no letters", async () => {
    const arr = await findTopWordsAsync(": , {} 8");
    expect(arr).toBeDefined();
    expect(arr.length).toBe(0);
  });

  it("should return only one item for a string with the same word", async () => {
    const arr = await findTopWordsAsync("one one one");
    expect(arr.length).toBe(1);
    expect(arr[0]).toEqual("one");
  });

  it("should return two items for a string with two words only", async () => {
    const arr = await findTopWordsAsync("one two one two one");
    expect(arr.length).toBe(2);
    expect(arr[0]).toEqual("one");
    expect(arr[1]).toEqual("two");
  });

  it("should group the words in case-insensitive", async () => {
    const arr = await findTopWordsAsync("one One ONE oNe");
    expect(arr.length).toBe(1);
    expect(arr[0]).toEqual("one");
  });

  it("should return the correct array with more than 3 different words", async () => {
    const arr = await findTopWordsAsync("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e");
    expect(arr.length).toBe(3);
    expect(arr[0]).toEqual("e");
    expect(arr[1]).toEqual("ddd");
    expect(arr[2]).toEqual("aa");
  });

  it("should return the correct array if numberOfPositions > 3", async () => {
    const arr = await findTopWordsAsync("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e", 4);
    expect(arr.length).toBe(4);
    expect(arr[0]).toEqual("e");
    expect(arr[1]).toEqual("ddd");
    expect(arr[2]).toEqual("aa");
    expect(arr[3]).toEqual("cc");
  });
});
