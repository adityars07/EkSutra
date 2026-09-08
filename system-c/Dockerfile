# ==============================
# Stage 1: Build
# ==============================
FROM maven:3.9-eclipse-temurin-21 AS builder

WORKDIR /app

# Copy Maven configuration
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests


# ==============================
# Stage 2: Runtime
# ==============================
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy only the generated JAR
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8083

ENTRYPOINT ["java", "-jar", "app.jar"]