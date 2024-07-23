# Current Program Status Register(CSPR)
![[Pasted image 20240624102727.png]]
This register records the results of the last comparison operation. These results are used to decide during a branch instruction. It is not directly written by the user program. It is protected from change by the user program.

# Parts
- Bits 0 to 4 - Processor mode
- 5 (T) - insTruction set (ie. normal or [[THUMB]])
- 6(F) and 7(I) - [[Interrupt Enables]]
- 28 - V - oVerflow - The last ALU operation resulted in an oVerflow 
- 29 - C - Carry
- 30 - Z - Zero
- 31 - N - Negative

I think it is better to look at registers as given in the image. High to low. Little Endianness??
