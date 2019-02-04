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

test ('allocate more memory than available', () => {

})
