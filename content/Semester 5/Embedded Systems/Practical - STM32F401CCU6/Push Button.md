Push button is connected to Pin A6 with a pull up resistor.
## Code
```c
#include "stm32f4xx.h"

int main(void)
{
	// port C
	RCC->AHB1ENR |= (1U << 2); // Enable clock for GPIOC port at bit 2
	GPIOC->MODER |= (1U << 26); // Set Pin 13 to output mode 01
	// port A
	RCC->AHB1ENR |= (1U << 0); // without loss of generality; A is at bit 0
	// 00 is input. Assuming bits are set to 0 at startup, we don't modify anything. This assumption was implicit for the previous code.
	// GPIOA->MODER |= (0U << 12);
	// GPIOA->MODER |= (0U << 13);
	GPIOA->PUPDR |= (1U << 12); // set pull up; CHECK THIS, JUST IN CASE I'M WRONG
	// main loop
	while(1)
	{
		if (GPIOA->IDR & (1U << 6))
			GPIOC->ODR |= (1U << 13);
		else
			GPIOC->ODR &= ~(1U << 13);
	}
}
```