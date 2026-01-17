---
title: Supabase PostgreSQL log settings
date: 2025-09-12T15:21:00.000+02:00
language: en
summary: Enable "RAISE" level logs for debugging in Supabase
---

To enable logging of "RAISE NOTICE", "RAISE WARNING", and similar messages in Supabase adjust the PostgreSQL log level settings. Run this in the SQL editor:

`set log_min_messages = 'notice';`

Useful for debugging purposes.
