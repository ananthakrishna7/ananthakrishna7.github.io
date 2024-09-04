# Direct Memory Access
*Without DMA*, When a peripheral device completes an operation, it generates an interrupt. Whenever there's an interrupt, the OS will have to service that. 
*DMA* is required when the peripheral device need to write a lot to memory, and we don't want it to interrupt the processor for every write. 
We say to the peripheral device, "Here is the memory you need to write to. Write everything and tell me."
It will generate an interrupt only when the data transfer is complete(rather than interrupting at every byte written).