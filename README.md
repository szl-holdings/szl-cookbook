# szl-cookbook

**SZL Holdings engineering cookbook.** A curated set of skills (Anthropic SKILL.md pattern) used by every engineer and every agent across the SZL Holdings platform.

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

## License

Apache 2.0
