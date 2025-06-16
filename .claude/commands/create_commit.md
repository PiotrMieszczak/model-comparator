# Create Commit Guidelines

Writing clean, semantic commit messages for all staged files.

## Rules for Commit Messages

### Format
The message must strictly follow the **Conventional Commits** specification:
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Type
Analyze the changes and choose the most appropriate type from the following list:

- **feat**: A new feature for the user
- **fix**: A bug fix for the user  
- **chore**: Routine tasks, maintenance, or dependency updates
- **docs**: Changes to documentation only
- **style**: Code style changes that do not affect meaning (e.g., formatting, white-space)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts

### Description
Write a concise, imperative-mood description of the change:
- ✅ "add login button" 
- ❌ "added login button"

### Body (Optional)
If the change is complex, provide a longer body explaining the "what" and "why" of the changes.

### Breaking Changes
If there are any breaking changes, add a `BREAKING CHANGE:` footer.