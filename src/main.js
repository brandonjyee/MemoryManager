const { MemoryChunk, MemoryManager } = require('./MemoryManager');

/*
See comments in MemoryManager.js
*/
function run() {
  console.log('Creating memory manager')
  const memMgr = new MemoryManager(5);
  memMgr.print();
  console.log()

  console.log(`Allocating 2 bytes and filling it with 'h' and 'e'`)
  const chunk1 = memMgr.alloc(2);
  console.log('chunk1', chunk1);
  chunk1.arr[0].push('h');
  chunk1.arr[1].push('e');
  memMgr.print();
  console.log()

  console.log('Trying to allocate more memory than available')
  const chunk2 = memMgr.alloc(4);
  console.log('chunk2', chunk2);
  console.log()

  console.log(`Allocating last 3 bytes and filling it with 'l', 'l', 'o'`)
  const chunk3 = memMgr.alloc(3);
  console.log('chunk3', chunk3, chunk3 instanceof MemoryChunk);
  chunk3.arr[0].push('l');
  chunk3.arr[1].push('l');
  chunk3.arr[2].push('o');
  memMgr.print();
  console.log()

  console.log('Freeing first chunk of 2 bytes')
  memMgr.free(chunk1)
  memMgr.print()
  console.log()

  console.log(`Reallocating first 2 bytes and filling them with 'w', 'o'`)
  const chunk4 = memMgr.alloc(2)
  chunk4.arr[0].push('w')
  chunk4.arr[1].push('o')
  memMgr.print()
  console.log()

  // Able to free the same chunk even tho it's been freed already
  // Also able to arbitrarily set a MemoryChunk so that you can set some invalid values
  console.log('Freeing chunk1 again')
  memMgr.free(chunk1)
  memMgr.print()
}

run();
