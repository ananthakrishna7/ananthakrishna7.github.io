---
title: Netflix Clone
description: Trying to understand Netflix
date: 2025-10-20
---
# A Netflix Clone in Go

## Not just the UI
Most "clones" of Netflix I've come across are just imitations of the UI, probably because that's the only place I'm looking (I'm trying to get into Frontend Development as well). I had to do a case study for my Distributed Systems course, and the Netflix CDN was what I chose. I had learnt about CDNs and DASH in a course on Computer Networks that we had in the semester before the Distributed Systems course, so I thought it would be "easy". When has that ever turned out to be true? 😂

## The Original Plan
Netflix's CDN is very impressive. Their Open Connect program partners with ISPs over the globe to bring data closer to users. I've written a summary [here](https://github.com/ananthakrishna7/netflix-sim). I also included a plan on what I would do for that case study. 

TL;DR: Multiple copies of a basic video server with adaptive bitrate, with one "leader".

## How it turned out
I started implementing things in Go, then switched to Python, and all I was able to code was a few algorithms I learnt in my course. My teammate made a fancy UI on a separate repo and that's what we showed.

## What I plan to do
1. Implement a backend in Go for DASH-like streaming
2. Implement authentication
3. Make a simple UI with vanilla HTML and [simple css](https://simplecss.org/)
4. Create docker containers to simulate a distributed system, and test the system.

## Progress (Updated regularly)
[This](https://github.com/ananthakrishna7/netflix-sim) is the repo. 
#### 2025-10-20
Till date, I've done the following:
- Add a basic index.html
- Add upload functionality
- Add a "splitter" that uses [ffmpeg](https://www.ffmpeg.org/) (this is for the DASH functionality)

There's probably a better way to implement DASH. I have to look into that. 

## Conclusion
Nothing as of now 😝.  As always, feel free to contact me if you're interested in working on this project!