# renovate: datasource=docker depName=node versioning=node
FROM node:24-slim

LABEL maintainer="shion1305"
LABEL org.opencontainers.image.source="https://github.com/Shion1305/shion-project-business-card-frontend"
LABEL org.opencontainers.image.description="Business Card Frontend Application"

WORKDIR /app

# Copy pre-built application output
COPY ./.output ./.output

# Set environment variables
ENV HOST=0.0.0.0 \
    PORT=8080 \
    NODE_ENV=production

# Create non-root user and switch to it for security
RUN groupadd -r nodejs && useradd -r -g nodejs nodejs && \
    chown -R nodejs:nodejs /app

USER nodejs

# Healthcheck to ensure the application is running
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8080/', (res) => process.exit(res.statusCode === 200 ? 0 : 1))"

CMD ["node", "./.output/server/index.mjs"]
