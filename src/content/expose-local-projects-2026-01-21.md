---
title: "Expose local projects"
date: 2026-01-21T17:05:00.000+01:00
category:
  - Other
language: en
summary: "Services to expose local projects "
---
Options to help you expose local projects to the internet, to be able to access them remotely, share with others, test on other devices etc.

I tried the following to expose the backend part of my project that runs on a RaspberryPi device. 

\- Cloudflare tunnel with cloudflared: did not work in the end, as I didn't want to move my domain to Cloudflare. Cloudflare Tunnel requires the name server to be Cloudflare so that it is Cloudflare's edge doing the DNS resolution.

\- [Serveo](https://serveo.net/): did not work in the end as I needed my subdomain to be reachable with https, and serveo only worked with http. But this has great potential for use cases when you quickly want to expose a local server, so I'm sure I'll be coming back to it. Super quick to use from your terminal.

\- Tailscale Funnel: ended up landing on this one (for now, at least). It works on my RaspberryPi and was easy to set up, and while I gave up on using my subdomain, I got the https part. Here is a[ blog post](https://www.xda-developers.com/tailscale-funnel-access-self-hosted-services/) that explains in more depth why you might want to use this option and for what.
