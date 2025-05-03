# Step 1: Use Node.js base image
FROM node:18

# Install netcat for wait-for.sh
# RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app
COPY ./package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# # Make wait-for.sh executable
# RUN chmod +x wait-for.sh

# Expose port
EXPOSE 5002

# Start the app using nodemon for development
CMD ["npm", "start"]
# CMD ["./wait-for.sh"]