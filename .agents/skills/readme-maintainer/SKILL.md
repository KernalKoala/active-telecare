---
name: readme-maintainer
description: Review and update the Active TeleCare README against the current codebase. Use after changes to features, routes, dependencies, setup, environment variables, data storage, authentication, deployment, or developer commands, and when asked to audit documentation. Make focused README edits, not just recommendations.
---

# README Maintainer

Keep the root `README.md` accurate, concise, and useful to someone setting up, developing, or operating Active TeleCare. Treat it as current project documentation, not a development diary.

## When to run

Run when explicitly requested or after meaningful implementation changes that affect documented behavior or developer workflows. Skip cosmetic/internal refactors unless they invalidate documentation. This role runs when invoked by an agent or user; it is not a background file watcher or scheduled job.

## Review workflow

1. Read the repository guidance and root `README.md`. Preserve existing user edits.
2. Establish the scope from the user's request and available development context. Inspect the working tree with `git --no-pager --no-optional-locks status --short`, `git --no-pager diff`, and `git --no-pager diff --cached` as appropriate. Inspect relevant untracked source files, but never secrets. For a requested commit range, use that range; do not assume all changes are in the latest commit. If there is no diff, audit the README against the current implementation.
3. Follow the changed code far enough to establish actual behavior. Existing documentation is context, not proof that a feature or guarantee exists. Verify version claims and scripts against `package.json`; use `package-lock.json` or installed package metadata when an exact resolved version or runtime requirement matters.
4. Identify only information readers need to understand, set up, use, maintain, or deploy the project. Update the affected README sections in place. Remove obsolete statements rather than adding contradictory notes. If nothing material needs updating, leave the file unchanged.
5. Validate the documentation changes and report what changed, what was checked, and any unresolved discrepancies.

## Project-specific evidence checklist

Discover current paths before reading them; these are starting points, not a fixed inventory:

- `package.json`, `package-lock.json`, and framework/tooling configuration: framework and dependency versions, runtime prerequisites, install/build/start/lint commands, and available tests. Do not invent a test command or claim checks pass without running them.
- `app/`: public pages, admin flows, layouts, and API routes. Check route handlers for actual HTTP methods and behavior before describing endpoints.
- `components/` and `components/admin/`: user-visible features, product catalog behavior, and product management workflows.
- `lib/supabase.ts`, `lib/supabase-server.ts`, and `SUPABASE_SETUP.md`: browser/server client boundaries, database schema, storage setup, and authentication requirements. Cross-check setup documentation with code and available schema/policy definitions; flag conflicts that cannot be resolved from evidence.
- Contact API implementation: Resend configuration, recipient/sender requirements, validation, and error behavior.
- Environment-variable references in source and tracked configuration templates: required/optional variables, purpose, where they are used, and server-only versus browser-exposed values.
- `content/`, `public/`, and deployment configuration: content maintenance, assets, analytics, and deployment steps when relevant.

Prioritize setup prerequisites, commands, environment variables, important features, architectural boundaries, database/storage changes, breaking changes, and actionable migration/deployment requirements. Keep the project structure overview high-level rather than cataloging every file. Link to detailed setup guides instead of duplicating their contents.

## Accuracy and safety

- Edit only the root `README.md`. Report necessary changes to other documentation or implementation as follow-ups; do not make them in this role.
- Never read secret-bearing files such as `.env.local`, dump process environments, or copy credentials into documentation. Infer variable names from source references and use clearly fake example values.
- Do not equate a protected admin page with protected API endpoints. Verify server-side authorization separately. Supabase service-role access bypasses RLS; do not claim RLS protects operations performed through that client without checking the actual authorization path.
- Do not invent security, privacy, legal-compliance, production-readiness, or deployment guarantees. Describe implemented behavior and flag unsupported claims.
- Do not install dependencies, contact live services, change databases, upload data, deploy, commit, or push as part of a README review.
- Prefer stable factual wording over phrases such as "recently added". Avoid changelog-style notes, trivial implementation details, speculative roadmap items, or wholesale rewrites of an otherwise useful README.
- If evidence is missing, report the uncertainty. Ask for clarification only when it blocks a material documentation decision.

## Validation and completion

- Check documented file paths, relative links, commands, environment-variable names, and version claims against the repository. Inspect the README diff for accidental deletions, duplication, and unrelated changes.
- Run `git --no-pager diff --check -- README.md` to check whitespace. This does not validate behavior, links, or Markdown rendering; verify those separately where practical.
- A documentation-only update normally does not require a build. Run additional checks only when needed to substantiate a claim, using bounded, noninteractive commands. Do not start a development server merely to review documentation.
- Finish with a short summary of updated sections (or why no update was needed), validation actually performed, and any unresolved discrepancies or follow-ups. Never report unrun tests as passing.
