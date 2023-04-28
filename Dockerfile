# base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files into the working directory
COPY package*.json ./
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies
RUN npm install

# Other files copy
COPY . .

# Expose port 3000 to access
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
