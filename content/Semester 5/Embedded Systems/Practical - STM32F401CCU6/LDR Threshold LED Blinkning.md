```c
#include "stm32f4xx.h"
#define THRESHOLD 1024

int adcData;

int main(void)
{
	/*** LDR PIN CONFIG ***/
	// Analog Port, PA1, LDR
	RCC->AHB1ENR |= (1U << 0); // Enable GPIOA
	GPIOA->MODER |= (3U << 1); // set pin 1 to analog mode
	// enable clock for ADC1 in RCC_APB2ENR
	RCC->APB2ENR |= (1U << 8);

	/*** SET UP LED ***/
	RCC->AHB1ENR |= (1U << 2); // Enable GPIOC
	GPIOC->MODER |= (1U << 28); // Pin 14 output

	/*** ADC CONFIG ***/
	
}
```