# AGENTS.md

## Cursor Cloud specific instructions

This is a documentation/cookbook repository with two runnable TypeScript sub-projects for validation.

### Repository structure

- `skills/` — Anthropic-pattern SKILL.md files (9 skills)
- `recipes/` — Engineering pattern markdown docs + two TypeScript demo codebases
- `ops/` — Operational scripts (GitHub org health checks, designed for Replit)
- `meta/` — Cookbook metadata and doctrine alignment

### Runnable code

| Sub-project | Path | Run command |
|---|---|---|
| anatomy-evolved-v1 | `recipes/anatomy-evolved-v1/code/` | `npm run test:smoke` (after `npm install`) |
| knot-calculus-v1 | `recipes/knot-calculus-v1/code/` | `npm run demo` (after `npm install`) |

### Lint / Checks

- **Main CI validation** (runs on every push/PR): validates README, LICENSE, skills directories, JSON well-formedness. See `.github/workflows/ci.yml`.
- **Pre-commit hooks**: `pre-commit run --all-files` (trailing-whitespace, end-of-file-fixer, check-yaml, check-json, prettier). Install with `pip install pre-commit`.
- **TypeScript type-check**: `npx tsc --noEmit` in `recipes/anatomy-evolved-v1/code/`. Note: there is a known pre-existing TS2769 error in `a11oy-ks18-witness.ts` line 163 (the `anatomy-evolved-ci` GitHub Actions workflow is currently red).

### Known issues

- The `anatomy-evolved-ci` workflow has a pre-existing type error (`Array<0|1>.reduce` return type mismatch). The smoke tests still pass because TypeScript emits JS despite type errors.
- Pre-commit prettier hook will flag/fix many files in the repo (formatting was not enforced before the hook was added).

### Running smoke tests (anatomy-evolved-v1)

```bash
cd recipes/anatomy-evolved-v1/code
npm install
npx tsc -p tsconfig.test.json   # emits JS to dist-test/ (has type errors but still emits)
echo '{"type":"commonjs"}' > dist-test/package.json
node dist-test/tests/smoke.js
```

Or use the shortcut (which does the above): `npm run test:smoke`

### Running knot-calculus demo

```bash
cd recipes/knot-calculus-v1/code
npm install
npx tsx tests/demo.ts
```
