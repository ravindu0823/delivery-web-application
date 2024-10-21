FROM node:20

ENV VITE_BASEURL=https://checkmateapi20240716235602.azurewebsites.net/api/
ENV VITE_ACCESS_TOKEN=accessToken
ENV VITE_REFRESH_TOKEN=refreshToken
ENV VITE_ORGANIZATION=1e7071f0-dacb-4a98-f264-08dcb066d923
ENV VITE_ORGANIZATION_DATA_USERNAME=serendib@gmail.com
ENV VITE_ORGANIZATION_DATA_PASSWORD=Anubaba@123

# Set the working directory
WORKDIR /app

# Copy the application code to the container
COPY . .

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Build the application
RUN pnpm run build-dev

# Expose the port on which the application will run
EXPOSE 2000

# Start the application
CMD ["pnpm", "preview"]
