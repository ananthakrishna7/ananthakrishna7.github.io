## Data Processing instructions
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
```arm-asm
AND r0, r1, r2
ORR r0, r1, r2 ; This is just r1 OR r2. fancy spelling
EOR r0, r1, r2 ; r0 = r1 XOR r2.
BIC r0, r1, r2 ; r0 = r1 AND NOT r2
```

### Movement
```arm-asm
MOV r0, r1; move r1 to r0. 
MVN r0, r1; move negated. r0 = NOT r1
```

### Comparison
```arm-asm
CMP r0, r1 ; compare. set Z on r1 - r2
CMN r0, r1 ; compare negated. set Z on r1 + r2 [r1 - (-r2)]
TST r0, r1 ; bit test. r0 AND r1
TEQ r0, r1 ; test equal. r0 XOR r1
```