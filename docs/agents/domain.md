# Domain docs

## Before exploring

Read the root `GLOSSARY.md`, if it exists, and any `docs/adr/` entries relevant to the area being changed. If those files do not exist, proceed silently.

## Repository layout

This is a single-context repository. Domain terminology belongs in a root `GLOSSARY.md`; architecture decisions belong in `docs/adr/`.

## Vocabulary

Use terms defined in `GLOSSARY.md` consistently. If a needed term is missing, note the gap for domain modeling rather than silently inventing conflicting terminology.

## ADR conflicts

Surface conflicts with an existing ADR explicitly rather than silently overriding a prior decision.
