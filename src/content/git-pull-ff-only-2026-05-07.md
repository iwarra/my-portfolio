---
title: git pull --ff-only
date: 2026-05-07T15:52:00.000+02:00
category:
  - Other
language: en
summary: Why you should switch git pull for git pull --ff-only
---

If you want to avoid getting merge commits when pulling changes from remote, replace git pull with this instead:\
\
`git pull --ff-only`

The reason why git pull creates the merge commit for you lies in the following:

In its default mode, git pull is shorthand for git fetch followed by git merge FETCH_HEAD.\
\
To avoid that set this as your default:\
`$ git config --global pull.ff only`
