# GitHub Automation

A hosted maintenance task checks for work in randomly selected hours between 09:00 and 22:00 India time. Each date gets one to six distinct hours. The same date always produces the same choices, including after a repository switch. Actual start times depend on the hosted scheduler.

## Change the active repository

Edit `rotation.json` on the default branch. Dates are inclusive. Use ISO dates and avoid overlapping ranges. Outside the listed periods the default repository applies.

```json
{
  "default_repository": "ShreyPatel-1008/Github-Automation",
  "periods": [
    {
      "start": "2026-12-01",
      "end": "2026-12-07",
      "repository": "ShreyPatel-1008/Knowledge-Base-AI"
    }
  ]
}
```

## Queue work

Create an issue in the target repository with the label `automation-ready`. Describe one small change and how to verify it. The worker picks up one eligible issue in a selected hour and proposes one verified change in a pull request. Empty queues and failed checks produce no work commit. Grant the connected GitHub app access before adding a private target.

## Deployment

The recurring task is managed from ChatGPT Automations. This repository contains its settings and reference planner. A clone alone does not register a new worker. Pause or resume the hosted task in Automations. Use Node.js to preview today's hours with `node --input-type=module -e "import {dailyHours} from './planner.mjs'; console.log(dailyHours(new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Kolkata'})))"`.
