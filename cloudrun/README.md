# Cloud Run deploy notes

## Required environment variables for `/admin`

The admin console depends on the LINE Login channel and a session signing secret.
Configure them on the Cloud Run service before deploying this branch.

| Env var | Source | Notes |
|---|---|---|
| `NUXT_LINE_CHANNEL_ID` | LINE Developers console | Plain env var |
| `NUXT_LINE_CHANNEL_SECRET` | Secret Manager | Mount as env var |
| `NUXT_LINE_CALLBACK_URL` | hard-coded per env | e.g. `https://<your-domain>/admin/auth/callback` |
| `NUXT_LINE_ADMIN_USER_IDS` | plain env (comma-separated) | LINE user IDs allowed into `/admin` |
| `NUXT_SESSION_SECRET` | Secret Manager | 32-byte random hex (`openssl rand -hex 32`) |

### Example (one-time setup)

```bash
SERVICE=main
REGION=asia-northeast1
PROJECT=shion-project-business-card

# Store secrets in Secret Manager
echo -n "<channel secret>" | gcloud secrets create line-channel-secret \
  --project "$PROJECT" --replication-policy=automatic --data-file=-
openssl rand -hex 32 | gcloud secrets create admin-session-secret \
  --project "$PROJECT" --replication-policy=automatic --data-file=-

# Grant the Cloud Run runtime SA access to those secrets
RUNTIME_SA=$(gcloud run services describe "$SERVICE" --region "$REGION" \
  --project "$PROJECT" --format='value(spec.template.spec.serviceAccountName)')
for SECRET in line-channel-secret admin-session-secret; do
  gcloud secrets add-iam-policy-binding "$SECRET" \
    --project "$PROJECT" \
    --member "serviceAccount:${RUNTIME_SA}" \
    --role roles/secretmanager.secretAccessor
done

# Wire env vars + secret mounts onto the Cloud Run service
gcloud run services update "$SERVICE" \
  --project "$PROJECT" --region "$REGION" \
  --update-env-vars "NUXT_LINE_CHANNEL_ID=2010167077,NUXT_LINE_CALLBACK_URL=https://<your-domain>/admin/auth/callback,NUXT_LINE_ADMIN_USER_IDS=U68c3c8e484974b3ca784315d1c2d23ec" \
  --update-secrets "NUXT_LINE_CHANNEL_SECRET=line-channel-secret:latest,NUXT_SESSION_SECRET=admin-session-secret:latest"
```

### Register callback URL on LINE Developers
Add `https://<your-domain>/admin/auth/callback` to the **Callback URL** list of the
LINE Login channel. Local development additionally needs
`http://localhost:3000/admin/auth/callback`.
