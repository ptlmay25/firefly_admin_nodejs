FROM node:10-alpine
RUN echo "Start of Dockerfile"
WORKDIR /usr/backend
COPY . .
CMD ["node", "app.js"]
EXPOSE 5000
RUN echo "End of Dockerfile"