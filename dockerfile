# Use an official Nginx image as the base
FROM nginx:alpine

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy the 'todo' folder into the container (from the 'front_end_project' folder)
COPY todo/ .

# Expose port 80 (default HTTP port)
EXPOSE 80

# Command to run Nginx (this is the default entrypoint for the nginx:alpine image)
CMD ["nginx", "-g", "daemon off;"]

