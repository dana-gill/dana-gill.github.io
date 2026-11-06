# how i use AI

At this point in the world, AI is an integral part of software engineering. It's common for me to receive questions about how I use AI as freelancer. As with many things, I take a holistic approach. For me, it depends on the values of the organization, and what the task is.

For the record, I do use AI to do most, if not all of my work. I have a stronger preference to using Claude, but I have used Codex and Qwen in the past. I do try to get AI to complete as much of my work as possible. I still do all my communications manually since I believe the human connection is invaluable, and I do believe that humans should still talk to other humans.

To safeguard my own personal computer and files, I work in devcontainers. The devcontainer I used it based off of [trailofbits](https://github.com/trailofbits/claude-code-devcontainer). There are many discussions online about Claude being able to escape the sandbox by altering the config file itself [1](https://news.ycombinator.com/item?id=47236910), [2] (https://securityaffairs.com/198814/hacking/a-new-claude-s-sandbox-failure-shows-how-ai-can-rationalize-real-world-harm.html). If you give an LLM access to everything, sandboxes are still brittle and are maybe one step above telling the claude.md, "Don't look at my tokens." Therefore I believe the best way to safeguard your own personal data is to shove everything in a docker container where it cannot escape due to infrastructure.

In terms of how I much trust I give to AI, this is dependent on the values of the organization, and what the task is. 

I have worked across the spectrum of how much human is in the loop because of the organization or the task. 