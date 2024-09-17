# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.19.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Next.js"

# Next.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY --link package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY --link . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev

# Final stage for app image
FROM base

# Add runtime environment variables
ENV MONGODB_URI="mongodb+srv://administrator:pOEn8Qhv4CSKFUVh@cluster0.sjco7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
ENV NEXT_PUBLIC_BASE_URL="https://intocash-task-management-system.fly.dev"
ENV GOOGLE_CLIENT_ID="1055282867798-0t7ntbik25klfan8q8l34geh0i9hu2q6.apps.googleusercontent.com"
ENV GOOGLE_CLIENT_SECRET="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"
ENV NEXTAUTH_URL="https://intocash-task-management-system.fly.dev/"
ENV NEXTAUTH_SECRET="fXJkxypqF6LpZLvpObeE5XVDqxcfvrLQH2o2LrKj47g="

# Copy built application
COPY --from=build /app/.next/standalone /app
COPY --from=build /app/.next/static /app/.next/static
COPY --from=build /app/public /app/public

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "node", "server.js" ]
