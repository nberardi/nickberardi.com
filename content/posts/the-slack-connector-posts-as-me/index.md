---
title: "The Slack Connector Posts as Me"
date: 2026-08-29T09:00:00-04:00
slug: "the-slack-connector-posts-as-me"
draft: true
tags:
  - "AI"
  - "Agents"
  - "Homelab"
  - "Hermes"
description: "I have agents in the cloud and Hermes at the house, and I wanted the cloud ones to hand off work as themselves. Slack was the first thing I tried."
---

I run Hermes on a machine at the house, and more of my day-to-day has been going through agents that live in the cloud. What I actually want is for those cloud agents to hand Hermes real work as themselves, not by pretending to be me.

Slack was the first thing I tried, because it looked like it was already done. Hermes is in Slack and Telegram, so I wired up the connector and sent a message from a cloud agent. The connector posted it under my name. Hermes treated it like I had typed it, because as far as Hermes could tell, I had. I thought about giving the cloud agents their own Slack bot so they would stop borrowing my account, and that is a real project. Identity, ingress, a bot that is allowed to speak under its own name. I did not want to spend a weekend on Slack.

I also looked at Hermes as an MCP server, which is supposed to be how another agent calls it. What ships today is local stdio. If you are on the same machine that is fine. I am not, and a cloud agent cannot stdio into the house. The MCP they ship is a messaging bridge for a local process, not a way in from the internet.

The last option I seriously considered was putting the agent API on the public internet through a tunnel and calling it a day. Technically it would work. It would also be a remote shell hanging off a hostname, so I am not doing that.

What I wrote instead is a small service that sits next to Hermes. It speaks Streamable HTTP MCP. On the inside it talks to the dashboard. There is an optional one-shot `ask` that goes through the agent API, also internal; if that API is not running, `ask` is just off and everything else still works. Anything it queues is not allowed to auto-start or auto-approve. I still have to say yes.

The tunnel publishes this service, not Hermes. Access is two policies on purpose: a service token for the cloud agents, and Google for me. I do not mix those in one policy. The agents add the `/mcp` URL as a custom connector and send `CF-Access-Client-Id` and `CF-Access-Client-Secret`, which is the Access service token. The edge mints a JWT. The service checks that JWT itself, so something else on the same docker network without a token gets a 401. The compose file does not publish a host port. The tunnel talks to the container on the docker network, and there is no hole in the router.

The repo is `nberardi/hermes-agent-bridge`. I am not publishing the setup. MCP is the first protocol because I would rather rename it later than rebuild the front door, and something like ACP might show up.
