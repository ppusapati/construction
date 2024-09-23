# Step 1: Use a minimal Node.js base image
FROM node:current-alpine3.19

RUN npm install -g pnpm

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app


# Step 3: Copy only the necessary files
COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,target=/root/.pnpm \
    pnpm install
USER node 
# Step 5: Copy the dist folder containing the built app
COPY dist ./dist
COPY server ./server

# Step 6: Expose the port your Express app will run on (e.g., 3000)
EXPOSE 5000

# Step 7: Command to run the Express app from the dist folder
CMD pnpm serve
