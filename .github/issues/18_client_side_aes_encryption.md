# Issue 18: [PERF/SECURITY] Add client-side zero-knowledge AES-GCM encryption for private pastes

- **Difficulty:** Advanced
- **Labels:** `security`, `performance`, `feature`, `cryptography`
- **Relevant Files:** `src/components/CreatePasteForm.tsx`, `src/components/PasteViewer.tsx`, `src/lib/crypto.ts`
- **Good First Issue:** No

## Problem
Currently, password protection is verified on the server using `bcrypt` comparisons. While passwords are safe, the paste content itself remains stored in plaintext in the database, and the server must spend CPU resources running computationally expensive password hashing on every verification.

## Why It Matters
Client-side end-to-end encryption (Zero-Knowledge) offloads all cryptographic work to the user's browser via native Web Crypto API (`SubtleCrypto`). The database only ever stores ciphertext, and the decryption key resides solely in the URL fragment (`#key=...`), which is never sent over the wire to the server.

## Expected Behavior
1. Add an "End-to-End Encrypted" toggle when creating a paste.
2. In the browser, generate a 256-bit AES-GCM key and encrypt the content before submitting to `POST /api/paste`.
3. The generated link embeds the secret key in the URL hash (e.g. `/paste/xyz123#key=...`).
4. On `/paste/xyz123`, the browser extracts the key from `window.location.hash`, decrypts the payload locally, and displays the code.
5. If the URL hash is missing, prompt the user for the decryption key/passphrase.

## Acceptance Criteria
- [ ] Server database stores only encrypted ciphertext.
- [ ] Decryption is executed entirely in the client browser using Web Crypto API.
- [ ] Backward compatibility with existing non-encrypted pastes is maintained.
