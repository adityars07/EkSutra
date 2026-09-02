FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /govtIP

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre

WORKDIR  /govtIP

COPY --from=builder /govtIP/target/*.jar govtIP.jar

EXPOSE 8080

RUN groupadd -r appgroup && \
    useradd -r -g appgroup appuser

USER appuser


ENTRYPOINT ["java","-jar","backend.jar"]

