---
title: Trema
description: My attempt to get Trema working
---

# Trema

## Some background
This semester, I had a course on Advanced Computer Networks. One of the course assignments was to implement a simulation of an SDN. At that time, I had started learning Ruby, and wanted to try to build something with it. And that is how I stumbled across [Trema](https://github.com/trema/trema). Trema didn't work, and in the end I used [os-ken](https://github.com/openstack/os-ken) instead.

## Ruby-chan!
I don't want to give up yet. I just started learning Ruby, so I thought it would be a *nice* experience to try and get Trema working. Ruby is such an awesome language. The syntax feels absolutely delightful! My first impression was that it felt somewhat similar to Scala, but I have only scratched the surface, so let's see how this goes!

## The problem
The last commit on the Trema repo's `develop` branch was on June 14, 2018. That was not promising. I thought "Maybe it's so good that it needs no more development?". How wrong I was! When I installed Trema via `gem` and tried to run it, there were so many errors - version conflicts, missing libraries, deprecation warnings. I tried to install Ruby 2.0.0, but apparently `rbenv` no longer supports that version. I have yet to try `rvm`, but I have little hope.

## The plan
I want to "update" Trema just enough so that it works. It seems like a great tool, and I think it would be a pity to let it go stale. Now, I know there are better contollers like OpenDaylight, and os-ken, and whatnot, but I suppose this little hobby project of mine is worth a try. 

## What I've done till now

I'll update whatever I've tried here. [This](https://github.com/ananthakrishna7/trema) is my fork.

```info
2025-10-15: Added copilot instructions
```
<!-- Add some code to make commits come here? -->

## If you want to help

Get in touch with me via email (it's here -> [[../index.md]]) or drop a comment below!