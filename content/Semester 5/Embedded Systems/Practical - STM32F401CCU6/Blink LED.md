You need to set up a project in KEIL $\mu$Vision 5

## Code
Here's the code for blinking the on-board LED:
```c
#include "stm32f4xx.h"

int main(void) // "void" is important; program won't compile without it
{
	RCC->AHB1ENR |= (1U << 2); // Enable clock for GPIOC port
	GPIOC->MODER |= (1U << 26); // Set Pin 13 to output mode 01
	// main loop; this is REQUIRED
	while(1)
	{ // 
		GPIOC->ODR |= (1U << 13); // writing logic HIGH to the LED pin
		for(int i = 0; i < 500000; i++); // delay
		GPIOC->ODR &= ~(1U << 13); // writing logic LOW to the LED pin
		for(int)
	}
}
```