const { MemoryChunk, MemoryManager } = require('./MemoryManager');

test ('allocate memory', () => {
  const memMgr = new MemoryManager(5);
  const chunk = memMgr.alloc(2);
  expect(memMgr.available).toEqual([false, false, true, true, true])
  expect(chunk).toEqual({ numBytes: 2, startIdx: 0, endIdx: 1, arr: [[],[]] })
})

test ('allocate memory and modify it', () => {
  const memMgr = new MemoryManager(5);
  const chunk1 = memMgr.alloc(2);
  chunk1.arr[0].push('h');
  chunk1.arr[1].push('e');
  expect(memMgr.available).toEqual([false, false, true, true, true])
  expect(memMgr.mem).toEqual([['h'],['e'],[],[],[]])
})

test ('allocate more memory than available', () => {
  const memMgr = new MemoryManager(5);
  const chunk = memMgr.alloc(6);
  expect(chunk).toBe(null)
})

test ('allocate memory then free it', () => {
  const memMgr = new MemoryManager(5);
  const chunk1 = memMgr.alloc(2);
  chunk1.arr[0].push('h');
  chunk1.arr[1].push('e');

  memMgr.free(chunk1)

  expect(memMgr.available).toEqual([true, true, true, true, true])
  expect(memMgr.mem).toEqual([[],[],[],[],[]])
})

test ('multiple allocations and frees', () => {
  const memMgr = new MemoryManager(5);

  const chunk1 = memMgr.alloc(2);
  console.log('chunk1', chunk1);
  chunk1.arr[0].push('h');
  chunk1.arr[1].push('e');

  // Too big of an allocation
  const chunk2 = memMgr.alloc(4);
  expect(chunk2).toBe(null)

  const chunk3 = memMgr.alloc(3);
  chunk3.arr[0].push('l');
  chunk3.arr[1].push('l');
  chunk3.arr[2].push('o');
  expect(memMgr.available).toEqual([false, false, false, false, false])
  expect(memMgr.mem).toEqual([['h'],['e'],['l'],['l'],['o']])

  memMgr.free(chunk1)
  expect(memMgr.available).toEqual([true, true, false, false, false])
  expect(memMgr.mem).toEqual([[],[],['l'],['l'],['o']])

  const chunk4 = memMgr.alloc(2)
  chunk4.arr[0].push('w')
  chunk4.arr[1].push('o')
  expect(memMgr.available).toEqual([false, false, false, false, false])
  expect(memMgr.mem).toEqual([['w'],['o'],['l'],['l'],['o']])

})
