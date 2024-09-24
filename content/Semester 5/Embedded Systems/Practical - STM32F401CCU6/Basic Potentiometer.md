```c
#include "stm32f4xx.h"

int main(void)
{
	// Analog Port, PA0, POtetnitometer
	RCC->AHB1ENR |= (1U << 0); // ENable GPIOA
	GPIOA->MODER |= (3U << 0); // set pin 0 to analog mode
	// must configure ADC after this
}
```