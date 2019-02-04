const { MemoryChunk, MemoryManager } = require('./MemoryManager');

function run() {
  console.log('hello');
  const memMgr = new MemoryManager(5);
  memMgr.print();

  const chunk1 = memMgr.alloc(2);
  console.log('chunk1', chunk1);
  chunk1.arr[0].push('h');
  chunk1.arr[1].push('e');
  memMgr.print();

  const chunk2 = memMgr.alloc(4);
  console.log('chunk2', chunk2);

  const chunk3 = memMgr.alloc(3);
  console.log('chunk3', chunk3, chunk3 instanceof MemoryChunk);
  chunk3.arr[0].push('l');
  chunk3.arr[1].push('l');
  chunk3.arr[2].push('o');
  memMgr.print();

  memMgr.free(chunk1)
  memMgr.print()

  const chunk4 = memMgr.alloc(2)
  chunk4.arr[0].push('w')
  chunk4.arr[1].push('o')
  memMgr.print()

  // Able to free the same chunk even tho it's been freed already
  // Also able to arbitrarily set a MemoryChunk so that you can set some invalid values
  memMgr.free(chunk1)
  memMgr.print()
}

run();
