# Local-First Schema Reference

## Vendor Directory

CSV and JSON vendor imports should map to this shape:

```json
{
  "id": "vend-123",
  "slug": "example-vendor",
  "name": "Example Vendor",
  "category": "Office Supplies",
  "tier": 1,
  "terms": "Net 30",
  "reportsTo": ["D&B", "Experian"],
  "startupFriendly": true,
  "requiresDuns": false,
  "requiresBankAccount": true,
  "hasFees": false,
  "verificationStatus": "needs_review",
  "cautionNote": "Review this imported record."
}
```

## Tradeline Planner

```csv
id,vendorName,accountType,tier,status,limitAmount,balanceAmount,reportsTo,notes
tl-123,Uline,Vendor account,1,planned,0,0,D&B,Review terms directly
```

## Dashboard State Backup

```json
{
  "bizcredit.v1.profile": {},
  "bizcredit.v1.passport": {},
  "bizcredit.v1.tradelines": [],
  "bizcredit.v1.roadmap": {},
  "bizcredit.v1.alerts": [],
  "bizcredit.v1.importJobs": []
}
```
