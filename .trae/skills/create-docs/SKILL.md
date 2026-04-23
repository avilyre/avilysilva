---
name: Update docs
description: When the user wants to update the project documentation to keep AI flow optimized
---

# Create docs based on the core project files

Perform a complete re-analysis of the project, considering any new changes, and update the existing architecture files separated by domain.
The domains must be updated in `.trae/reference/` using the following files:
Note: Each file must contain a maximum of 200 lines. If it exceeds this limit, it must be compacted to comply with the rule.
Existing structure must be preserved whenever possible, updating only what is necessary.

- `.trae/reference/code-patterns.md`
- `.trae/reference/important-notes.md`
- `.trae/reference/architecture.md`
- `.trae/reference/design.md`

Ensure that:
- Outdated information is removed or corrected
- New patterns, decisions, and structures are incorporated
- Consistency across all files is maintained
- No duplication of content across domains

After updating the domains, revise the `AGENTS.md` file:
- Update references to each domain file (path + purpose)
- Ensure agents can clearly understand when and how to use each reference
- If `AGENTS.md` does not exist, create it in the root of the project 

The final output must reflect the current state of the project, ensuring accuracy, clarity, and usability for AI agents.

# Create good practices file
## Rules Clean code file
Create the following files:
- `.trae/rules/clean-code.md`
with the following content:
```
---
alwaysApply: false
description: When the user wants to add new code to the project, creating new modifying files or updating existing ones.
---
- Clear all whitespace from the code.
- Clear all comments from the code (if it's not necessary).
- Clear all unused variables, functions, or classes.
- All code must to be in English.
- Void to use any special characters or symbols.
- Void to use for variables, functions, or classes one character in it's name.
- Wrap every fetch request in a try catch block following the fetch request.
- Handle the error in the catch block.
- Return the response in the try block.
```