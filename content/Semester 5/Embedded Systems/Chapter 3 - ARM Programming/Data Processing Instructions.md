# Data Processing Instructions
- Perform arithmetic and logical operations on data values in registers.
- The only instructions that modify data values.
- Typically require 2 source operands and produce a single result. 

## Rules for DPI in ARM
- All operands are 32 bits wide, and come from either registers or immediates.
- Result (if applicable) is 32 bit. Only exception is long multiply (64 bit product) 
- 3 address format - `instruction dest, src, src`

## Instructions
### Arithmetic
```arm-asm
ADD r0, r1, r2 ; Regular addition
ADC r0, r1, r2 ; add with carry. r0 = r1 + r2 + C [from CPSR]
SUB r0, r1, r2 ; r0 = r1 - r2
SBC r0, r1, r2 ; r0 = r1 - r2 + C - 1
RSB r0, r1, r2 ; Reverse SUB, r0 = r2 - r1
RSC r0, r1, r2 ; RSB with carry. r0 = r2 - r1 + C - 1

```

### Logical
Instructions are bitwise. They operate on every bit in the supplied registers.

```arm-asm
AND r0, r1, r2
ORR r0, r1, r2 ; This is just r1 OR r2. fancy spelling
EOR r0, r1, r2 ; r0 = r1 XOR r2.
BIC r0, r1, r2 ; r0 = r1 AND NOT r2
```

BIC - every 1 in the second operand clears the corresponding bit in the first. 2nd operand tells the processor which bits to clear in the first operand. This result is placed in the destination register.

### Movement
These instructions move data from second operand register to the first operand register. 
```arm-asm
MOV r0, r1; move r1 to r0. 
MVN r0, r1; move negated. r0 = NOT r1
```

### Comparison
These instructions produce no output. They update CPSR's N, C, Z, V bits.
```arm-asm
CMP r0, r1 ; compare. set Z on r1 - r2
CMN r0, r1 ; compare negated. set Z on r1 + r2 [r1 - (-r2)]
TST r0, r1 ; bit test. r0 AND r1
TEQ r0, r1 ; test equal. r0 XOR r1
```

## Immediate Operands
Immediates are specified with a hash (`#`). 
**Example:**
```arm-asm
ADD r0, r0, #1 ; Decimal
ADD r0, r1, #0x56 ; Hexadecimal
```

Immediates must be within the range
$$(0 \rightarrow 255)\times 2^{2n}; n \epsilon(0, 12)$$
Reason is explained in Chapter 5.

## Shifted Register Operands

Shifts are a bit weird.
```arm-asm
ADD r3, r2, r1, LSl #3 ; r3 := r2 + r1*8
```

### Kinds of Shifts
- LSL
- LSR
- ASL - Arithmetic Shift Left, = LSL
- ASR,  Arithmetic Shift Right -> shift right and fill leftmost bit with 1 or 0 depending on the bit after it. **Preserves sign of a number** 
- ROR, Rotate right. Fall off bits come on the other side
- RRX: Textbook says: 
>RRX: rotate right extended by 1 place; the vacated bit (bit 31) is filled with the old value of the C flag and the operand is shifted one place to the right. With appropriate use of the condition codes, a 33-bit rotate of the operand and the C flag is performed.


## Setting Condition Codes
Make the instruction set condition codes (NCVZ).
Just add an S to instructions that don't do this by default.
THIS IS THE BEGINNING OF THE POWER OF CONDITIONAL EXECUTION!
## Multiplies
- Immediates not supported
- Result register
- V not modified, C meaningless
Only lower 32 bits of product are placed in the destination register.

```arm-asm
MUL r0, r1, r2 ; r0 has only lower 32 bits of prod
MULS r0, r1, r2 ; Sets only N and Z flags if applicable
MLA r4, r3, r2, r1 ; Multiply accumulate, r4 := r3xr2 + r1
```

There's a more efficient way to multiply immediates, but my copy is not clear about that. Check later. Irrelevant right now.


