---
title: What I learned from "WTF is a Software Factory?"
date: 2026-10-27T09:54:00.000+01:00
category:
  - Beyond the Stack
language: en
summary: "Tips: Listen to Syntax podcast, episode #1049 on software factories,
  black-box testing, architecture, and engineering the machine that builds the
  machine. Here's what I'm taking away..."
---
"Software factory" sounds like marketing for a slop cannon. This episode of Syntax is the best argument I've heard that it isn't.

*Syntax #1049 with Adam Jacob (CEO of Swamp Club), hosted by Wes Bos and Scott Tolinski. [Listen here.](https://syntax.fm/show/1049/wtf-is-a-software-factory)*

I've really enjoyed listening to the "WTF is a Software Factory?" episode of one of my fave podcasts. This conversation made engineering feel bigger instead of smaller. You stop building only the thing and start building the machine that builds the thing, and that's still engineering. Along the way, they also cover Swamp Club, black-box testing, domain-driven design, whether you should delete your unit tests, and what happens to a company with 10,000 engineers when everyone gets faster.

## The problem it solves

Adam describes the default AI workflow as thousand-line PRs nobody understands, pushed through the same old process, just faster. His way out is counterintuitive:

> "the way out of that process, paradoxically, is more AI, not less."

More structure, more automation, more of the system *designed*. It's a systems design problem, not a prompting problem.

## Tips I'm taking away

**1. Start with black-box tests.** Test the product from the outside, with no knowledge of the internals, and keep those tests outside the agent that changes the code. 

**2. Treat unit tests as an open question.** The argument here is that strong type systems (TypeScript, Rust) already catch much of what unit tests used to. He also cites a Thoughtworks write-up suggesting TDD made agent output worse. 

**3. Commit to an architecture and give the agent its vocabulary.** Left alone, an agent picks whatever feels right in the moment. Domain-driven design helps because the agent already knows the terms. Write the architecture down as a skill and review all generated code against it.

**4. Add adversarial review for everything else.** Accessibility is his example: a skill that checks every change against your standards. That's how Swamp Club holds a 100% Lighthouse score.

**5. When something slips through, fix the machine.** Don't conclude the LLM is dumb. Ask how to change the factory so that whole class of error gets caught next time.
