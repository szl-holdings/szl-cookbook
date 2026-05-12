# szl-cookbook

**SZL Holdings engineering cookbook.** A curated set of skills (Anthropic SKILL.md pattern) used by every engineer and every agent across the SZL Holdings platform.

[![Skills](https://img.shields.io/badge/skills-9-2DA44E?style=flat-square)](#catalog)
[![Pattern](https://img.shields.io/badge/pattern-Anthropic%20SKILL.md-805AD5?style=flat-square)](https://github.com/anthropics/anthropic-cookbook)
[![License](https://img.shields.io/badge/license-Apache--2.0-2DA44E?style=flat-square)](./LICENSE)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/szl-holdings/szl-cookbook/badge)](https://securityscorecards.dev/viewer/?uri=github.com/szl-holdings/szl-cookbook)

These skills encode the practices that make our codebase reproducible, auditable, and Series-A defensible:

- **Pre-flight thinking** before code is written
- **Disciplined refactoring** when shared logic emerges
- **Component review** before shipping React UI
- **Monorepo impact analysis** before touching shared packages
- **Debug protocol** with falsifiable hypotheses
- **Dependency health** audits
- **Dead-code detection** for sustained code health
- **Doc & comment hygiene** for future readers
- **Commit hygiene** for clean history and clean rollbacks

## Catalog

| Skill | Purpose |
|-------|---------|
| [`pre-flight-thinking`](skills/pre-flight-thinking/SKILL.md) | Force structured thinking before writing code |
| [`typescript-refactor`](skills/typescript-refactor/SKILL.md) | Systematic refactoring in the pnpm monorepo |
| [`react-component-review`](skills/react-component-review/SKILL.md) | Quality + perf review for React components |
| [`monorepo-impact-analysis`](skills/monorepo-impact-analysis/SKILL.md) | Map blast radius before shared-package edits |
| [`debug-protocol`](skills/debug-protocol/SKILL.md) | Hypothesis-driven debugging |
| [`dependency-health`](skills/dependency-health/SKILL.md) | Audit, upgrade, rationalize deps |
| [`dead-code-detector`](skills/dead-code-detector/SKILL.md) | Locate and safely remove dead code |
| [`doc-comment-hygiene`](skills/doc-comment-hygiene/SKILL.md) | Inline docs, JSDoc, READMEs |
| [`commit-hygiene`](skills/commit-hygiene/SKILL.md) | Commit messages, PR scope, git history |

## Usage

Skills are designed for both humans and AI agents. Each `SKILL.md` carries a YAML frontmatter (`name`, `description`) so it can be loaded by Claude Code, Cursor, or any Anthropic-compatible agent.

### From a Claude Code session
```
/skills/<skill-name>
```

### From a human engineer
Read the SKILL.md. Apply the checklist. Cite the skill in your PR description.

## Provenance

Adapted from the public **Awesome Claude Code**, **Antigravity Awesome Skills**, **Everything Claude Code**, and **Claude Agent Blueprints** collections, then specialized to the SZL Holdings monorepo conventions.

## Related

- **Platform**: [szl-holdings/platform](https://github.com/szl-holdings/platform) (private) — 1,220 tests across 76 packages where these skills are exercised
- **Runtime**: [szl-holdings/ouroboros](https://github.com/szl-holdings/ouroboros) — the bounded-loop substrate (218/218 tests verified 2026-05-12)
- **Trust portal**: [szl-holdings/szl-trust](https://github.com/szl-holdings/szl-trust) — publishes CPS proof-chain run artifacts
- **Thesis**: [szl-holdings/ouroboros-thesis](https://github.com/szl-holdings/ouroboros-thesis) — v1→v11 published, v12 in review

## License

Apache-2.0
