# Architectural Inheritance
ARM designed used some features from the Berkeley RISC design and rejected others.

## Features Used
1. A load-store Architecture
2. Fixed length 32 bit instructions
3. 3-address instruction formats

## Features Rejected
1. Register Windows - A large number of registers, of which only 32 are active at the time of execution of a program. This was helpful to reduce Processor-Memory Traffic resulting from Register saving and restoring during context switches. This was rejected due to cost. Altough shadow registers for exception handling are not too different. Only Sun SPARC implemented Register Windows.
2. Delayed Branches - Rejected due to complexity in exception handling. This also helped in the long run.
3. Single Cycle Execution of all instructions - ARM uses multiple cycles for load/store instruction due to the existence of only one memory bank

## Simplicity
- KEEP IT SIMPLE, STUPID!
- ARM designers were not well versed in custom CMOS chip design so they minimized whatever risks they could.
- ARM follows RISC principles, but also has a few CISC features. It has more code density than a pure RISC. This led to its power-efficiency and small core design.