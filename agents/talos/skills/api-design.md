# Skill: REST API Design

## URL Structure
- Use nouns, not verbs: /invoices not /getInvoices
- Plural resources: /invoices not /invoice
- Nested resources for clear ownership: /customers/{id}/invoices
- Keep to 2 levels of nesting maximum

## HTTP Methods
| Method | Use | Idempotent |
|---|---|---|
| GET | Retrieve | Yes |
| POST | Create | No |
| PUT | Replace entire resource | Yes |
| PATCH | Partial update | No |
| DELETE | Remove (or soft delete) | Yes |

## Response Formats

### Success responses
```json
// 200 OK — resource returned
{ "id": "inv_123", "status": "draft", "amountCents": 10000 }

// 201 Created — resource created
{ "id": "inv_124", "status": "draft", "amountCents": 5000 }

// 204 No Content — success, nothing to return
(empty body)
```

### Error responses (always consistent)
```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request contains invalid fields",
    "details": [
      { "field": "amountCents", "message": "Must be a positive integer" }
    ]
  }
}
```

## Status Codes
- 200: Success with body
- 201: Created
- 204: Success, no content
- 400: Bad request (validation failed)
- 401: Not authenticated
- 403: Authenticated but not authorized
- 404: Resource not found
- 409: Conflict (duplicate, state conflict)
- 422: Unprocessable entity (business rule violation)
- 429: Rate limited
- 500: Server error

## Pagination
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "pageSize": 50,
    "total": 234,
    "totalPages": 5
  }
}
```

## Versioning
- URL versioning: /api/v1/invoices
- Always version from day one
- Support previous version for minimum 6 months after new version release
- Document breaking changes in changelog
