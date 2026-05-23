# Contributing to AI Integration Hub

Thanks for helping make this the most accurate AI API reference for engineers. Here's how to contribute effectively.

## What we need most

- **Broken link fixes** — API docs and pricing pages move often
- **New providers** — if a provider has a public API and developer docs, it belongs here
- **Model updates** — new releases, deprecated models, pricing changes
- **Code templates** — new frameworks, languages, or patterns
- **Roadmap content** — additional topics or improved learning paths

## How to contribute

### Quick fix (broken link, typo, pricing)

1. Open an [issue](https://github.com/MusaIslamFahad/ai-integration-hub/issues) using the relevant template
2. Or go straight to editing the file and opening a PR

### Larger change (new provider, new section)

1. Fork the repo
2. Create a branch: `git checkout -b feat/add-<provider-name>`
3. Make your changes
4. Open a PR against `main` using the PR template

## Standards

- **Links must work** — verify every URL before submitting
- **Pricing must link to source** — link to the official pricing page, not a third-party summary
- **Code must run** — test templates before adding them
- **No duplicates** — check if the provider already exists before adding
- **Keep descriptions concise** — one clear sentence per item is better than a paragraph

## File map

```
src/App.tsx          → Live site (React + Tailwind)
README.md            → GitHub landing page
docs/API_DIRECTORY.md    → Machine-readable API list
docs/MODEL_COMPARISON.md → Model data
CONTRIBUTING.md      → This file
CHANGELOG.md         → Version history
```

## Questions?

Open a [Discussion](https://github.com/MusaIslamFahad/ai-integration-hub/discussions) — no question is too small.
