# `ts-knowledge`

I've begun to work extensively with [TypeScript](https://www.typescriptlang.org/), both at work and in my hobby code. I figured I should probably document some of this.

## Intro

Every file should follow a similar format:

* Stack: Provides all the necessary libraries for the section.
* Config: Provides pertinent config files (or sections of them).

I've tried to make each `## Named Code Section` its own self-contained folder with code, e.g.
```bash
cd <repo root>/testing/a-basic-test && npm install
npm test
# Results of nyc mocha
```

## Notes

* Usage of single quotes: I made the switch from single to double recently because of my job. I'm in the middle of changing back. For the most part, you'll see double quotes around strings unless it's a template string (because those use backticks) or I screwed up.