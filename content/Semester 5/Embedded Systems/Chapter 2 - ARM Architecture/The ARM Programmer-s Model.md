# The ARM Programmer's Model
A processor's ISA defines the set of instructions that the programmer can use to change the state of the system that the processor is part of.

## Registers
### User Mode
- 15 General Purpose 32 bit registers (`r0` through `r14`)
- Program Counter (`r15`)
- [[CPSR]]
Remaining registers are usable only in system modes.
![[Pasted image 20240624102336.png]]

### System Modes
- Banked registers replace corresponding user registers in their respective modes.
- [[CPSR]] is copied to SPSR.
## Memory System 
- Memory - an array of bytes numbered from 0 to $2^{32} - 1$ 
- Can consist of 
	- 8 bit bytes
	- 16 bit half words (2 bytes) -> Aligned on even byte boundaries
	- 32 bit words (4 bytes) -> Aligned on 4 byte boundaries
- ARM is Little Endian by standard, but can be configured to work with Big Endian as well.

## Load-Store Architecture
- No memory-to-memory ops. Only load, exec, store. We will only work on register contents.

ARM instructions fall in these 3 categories:
1. Data processing instructions: To operate on values stored in registers.
2. Data transfer instructions: Loads and Stores. Additionally, in systems programming, there are register-main_memory exchanges.
3. Control flow instructions: Branch, Branch and Link, Traps(Supervisor calls)

## Supervisor Mode
System calls to OS, bleh.

## The ARM Instruction Set

>[!note]
>Since all ARM Instructions are 32 bits wide (except [[THUMB]] instructions), they are aligned to 4 byte boundaries. Pretty Obvious.


Notable Features:
- Load Store Architecture
- 3 address Data processing instructions. E.g `add r0, r1, r2` We need to specify 2 source and 1 destination registers.
- Conditional execution of every instruction. What?
- Multiple register Loads and Stores
- Can perform General Shift operation+ General ALU Operation in a single instruction, in a single clock cycle
- Open instruction set extension through coprocessor instruction set -> includes adding new registers and datatypes to the programmer's model
- [[THUMB]] instructions -> very dense, compressed version of the ARM Instruction Set

ARM has more formats than other commercial RISC processors. 
More complex instruction decoding BUT also much higher code density. Beats CISC with THUMB instructions. Instruction decode overhead is negligible.

## The I/O System
- I/O peripherals are managed as memory-mapped devices with interrupt support.
	- Internal Registers of the devices are visible as memory locations.
	- We can load from or store to these memory mapped registers
- Interrupts - normal (IRQ) or fast (FIQ)
	- IRQ - most interrupt sources
	- FIQ - one or two time critical sources. (FIQ is higher priority)
	- Both interrupt inputs are level-sensitive and maskable
- Some systems have [[DMA]] hardware external to the processor to handle high-bandwidth I/O traffic

Interrupts are *exceptions*.

## ARM Exceptions
1. Current state is saved. PC -> *r14_exc* and CSPR -> *SPSR_exc* (*exc* is exception type)
2. Processor mode is changed appropriately
3. PC is forced to a value between $00_{16}$ and $1C_{16}$  (the *vector address*) depending on the exception.

Now the instruction at *vector address* would usually branch to an exception handler, which will use *r13_exc* to save user context onto a dedicated stack.

Control is passed back to the user program by restoring user registers and then **atomically** restoring PC and CSPR. PC value may need to be adjusted (pipelining stuff).

