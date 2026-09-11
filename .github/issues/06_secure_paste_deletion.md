# Issue 6: [SECURITY] Protect DELETE /api/paste/:slug with an owner deletion token

- **Difficulty:** Intermediate
- **Labels:** `security`, `backend`, `help wanted`
- **Relevant Files:** `prisma/schema.prisma`, `src/app/api/paste/route.ts`, `src/app/api/paste/[id]/route.ts`
- **Good First Issue:** No

## Problem
The `DELETE /api/paste/:slug` route handler currently allows anyone to delete any paste in the database without any authentication, owner secret, or proof of ownership.

## Why
This is a critical vulnerability. Any anonymous user or bot could iterate through paste slugs and delete all pastes on the entire platform.

## Current Behavior
```ts
// src/app/api/paste/[id]/route.ts
export async function DELETE(request: NextRequest, { params }) {
  const { id } = await params;
  await prisma.paste.delete({ where: { slug: id } });
  return NextResponse.json({ success: true });
}
```

## Expected Behavior
1. When a paste is created via `POST /api/paste`, generate a secret deletion token (`deleteToken`, e.g. 24-character random string).
2. Store the hashed `deleteToken` in the database.
3. Return the plain `deleteToken` to the creator in the JSON response of `POST /api/paste`.
4. To delete a paste, the client must provide the deletion token via request header `x-delete-token` or query param `?token=...`.
5. If the token is missing or invalid, return `403 Forbidden`.

## Possible Approach
1. Add `deleteToken String?` to the `Paste` model in `prisma/schema.prisma`.
2. Generate token using `nanoid(24)` in `POST /api/paste` and hash it using bcrypt or SHA-256 before saving.
3. In `DELETE /api/paste/[id]/route.ts`, compare the incoming header `x-delete-token` with the stored hash.

## Acceptance Criteria
- [ ] Schema migration adds `deleteToken` to the database.
- [ ] Deletion requests without a valid deletion token fail with HTTP 403.
- [ ] Deletion requests with the matching token succeed and delete the paste.
