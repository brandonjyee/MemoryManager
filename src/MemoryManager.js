/*
Since I only have 2 hours, my approach is to do the most naive approach first:
- For an alloc(), search for an open contiguous chunk of memory that fits the given request size. Return the first one found. If none found, return null
- For a free(), mark the given memory locations as free

If have time, can try a better algorithm.

*/
class MemoryChunk {
  constructor(startIdx, endIdx, arr) {
    this.numBytes = endIdx - startIdx + 1;
    this.startIdx = startIdx;
    this.endIdx = endIdx;
    this.arr = arr;
  }
}

class MemoryManager {
  constructor(numBytes) {
    /* Instantiate an 'array' of memory and fill each cell with an empty array so that the memory cell can be modified (as opposed to placing a primitive)
     */
    // This will keep track of values placed in memory
    this.mem = new Array(numBytes);
    this._fill(this.mem);
    // This will keep track of which memory locations are free or in-use
    // Initialized to all memory being free at the beginning
    this.available = new Array(numBytes).fill(true);
  }

  alloc(numBytes) {
    // Must allocate at least 1 byte
    if (numBytes <= 0) return null;

    // Search for an open contiguous block of the given size
    let idx = 0;
    // If unable to find an open memory chunk of that size, return null
    let retChunk = null;
    while (idx < this.available.length) {
      if (this.available[idx]) {
        let startIdx = idx;
        let endIdx;
        let count = 0;
        while (this.available[idx]) {
          count++;
          if (count === numBytes) {
            endIdx = idx;
            const memChunk = new MemoryChunk(
              startIdx,
              endIdx,
              this.mem.slice(startIdx, endIdx + 1)
            );
            // Update availability
            this.available.fill(false, startIdx, endIdx + 1);
            return memChunk;
          }
          idx++;
        }
      }
      idx++;
    }
    return retChunk;
  }

  free(memChunk) {
    if (!memChunk || !(memChunk instanceof MemoryChunk)) throw new Error('Invalid input');

    // Free up the memory specified by the memChunk
    const {startIdx, endIdx} = memChunk
    this.available.fill(true, startIdx, endIdx + 1)
    for (let i = startIdx; i <= endIdx; i++) {
      // Reset value at this memory location
      this.mem[i].length = 0
    }
    memChunk;
  }

  _fill(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = [];
    }
  }

  print() {
    console.log('mem:', this.mem);
    console.log('available:', this.available);
  }
}

module.exports = { MemoryChunk, MemoryManager };
