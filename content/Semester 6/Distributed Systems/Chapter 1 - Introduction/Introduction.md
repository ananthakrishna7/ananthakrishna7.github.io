Computers used to be big and expensive, and had no means to communicate with each other. But that changed in the mid 1980s.
- 8-bit computers to 16/32/even 64 bit computers. Multicore systems also became common
- High Speed computer Networking
- Computers also became smaller, more powerful, *and* cheaper.

And thus **Distributed System** came into being.

# 1.1 What is a Distributed System?

> A distributed system is a collection of autonomous computing elements that appears to its users as a single coherent system.

- *Computing element* - independent, can be a hardware device or a software process.
- Users (people/applications)think they are using a single system

## Characteristic 1: Collection of autonomous computing elements
- Cannot always assume that there's something like a **global clock**
- Managing **Group membership** is difficult. Eg. Admission control:
	- 