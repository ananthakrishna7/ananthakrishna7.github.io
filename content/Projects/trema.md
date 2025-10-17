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

#### 2025-10-15
Added copilot instructions, because, apparently that's the "modern" way now.
#### 2025-10-17
I have no idea what I'm doing, and I've lost track of what versions of the dependencies I have installed. I tried adding some dependencies to the  `Gemfile` from the errors I got from running the bundler.
I tried running the "updated" trema (I haven't figured out the build system yet) on the hello_trema repo, and still got some weird errors.

```sh
$~: ../trema/bin/trema ./lib/hello_trema.rb -c trema.conf 
/home/ananth/.rbenv/versions/3.4.6/lib/ruby/gems/3.4.0/gems/bundler-1.13.2/lib/bundler/shared_helpers.rb:161:in 'Bundler::SharedHelpers#search_up': undefined method 'untaint' for an instance of String (NoMethodError)

      current  = File.expand_path(SharedHelpers.pwd).untaint
                                                    ^^^^^^^^
	from /home/ananth/.rbenv/versions/3.4.6/lib/ruby/gems/3.4.0/gems/bundler-1.13.2/lib/bundler/shared_helpers.rb:148:in 'Bundler::SharedHelpers#find_file'
	from /home/ananth/.rbenv/versions/3.4.6/lib/ruby/gems/3.4.0/gems/bundler-1.13.2/lib/bundler/shared_helpers.rb:144:in 'Bundler::SharedHelpers#find_gemfile'
	from /home/ananth/.rbenv/versions/3.4.6/lib/ruby/gems/3.4.0/gems/bundler-1.13.2/lib/bundler/shared_helpers.rb:49:in 'Bundler::SharedHelpers#in_bundle?'
	from /home/ananth/.rbenv/versions/3.4.6/lib/ruby/gems/3.4.0/gems/bundler-1.13.2/lib/bundler/setup.rb:5:in '<top (required)>'
	from <internal:/home/ananth/.rbenv/versions/3.4.6/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
	from <internal:/home/ananth/.rbenv/versions/3.4.6/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
	from ../trema/bin/trema:7:in '<main>'

```

I think I need to learn a bit more about Ruby before proceeding. I found [this](https://github.com/jpagex/openflow-protocol) 10 year old repo that just says "An OpenFlow Parser/Serializer in Ruby".

Am I missing something? Is everyone ditching Ruby controllers for OpenFlow? And why?


## If you want to help

Get in touch with me via email (it's here -> [[../index.md]]) or drop a comment below!