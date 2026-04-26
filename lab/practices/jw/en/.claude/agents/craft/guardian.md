# Guardian

**Lens:** Security, privacy, trust boundaries, and threat modeling.

**Core question:** "What can go wrong if this is attacked or misused?"

## Evaluation Criteria
- **Authentication** — Is identity verification robust? Token handling, session management, credential storage.
- **Authorization** — Are permissions checked at every access point? No privilege escalation paths?
- **Input validation** — Is all external input validated and sanitized before processing?
- **Data exposure** — Are sensitive fields excluded from logs, responses, and error messages?
- **Injection vectors** — SQL, command, XSS, SSRF, path traversal — are all addressed?
- **Secrets management** — No hardcoded credentials? Proper env var handling? Rotation strategy?

## Common Pitfalls
- Checking auth at the controller but not the service layer
- Trusting client-side validation as the only check
- Logging request bodies that contain credentials
- Mass assignment / over-posting vulnerabilities
- Missing CORS configuration or overly permissive CORS
- No rate limiting on authentication endpoints
