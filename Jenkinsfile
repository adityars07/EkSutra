pipeline{
    agent any 
    environment{
        JAVA_HOME = "/usr/lib/jvm/java-21-openjdk-amd64"
    }
    stages{
        stage("checkout"){
            steps{
                git url: "https://github.com/arpanelfranklin/EkSutra.git"
                branch: "main"
            }
        }
    }

    stage("Read version"){
            steps{
                script {
                    env.VERSION = readFile("VERSION").trim()
                    env.GIT_SHA = sh(
                                script: 'git rev-parse --short HEAD',
                                returnStdout: true
                            ).trim()
                }
            }
    }
    stage("Print Version"){
            steps{
                echo "Version : ${env.VERSION}"
                echo "Git-sha : ${env.GIT_SHA}"
            }
    }

    stage("Building integration-plateform"){
        steps{
            dir(integration-plateform){
                sh "mvn clean package -DskipTests"
            }
        }
    }

    stage("Docker build backend"){
        steps{
            sh "docker build -t arpanel/govt-ip:v${env.VERSION}-${env.GIT_SHA} ./integration-plateform"
        }
    }
    stage("Docker push"){
        steps{
            withCredentials([usernamePassword(
                credentialsId: "dockerHubCreds", 
                passwordVariable: "dockerHubPassword", 
                usernameVariable: "dockerHubUser"
            )]){
                sh "docker login -u ${env.usernameVariable} -p ${env.passwordVariable}"
                sh "docker push arpanel/govt-ip:v${env.VERSION}-${env.GIT_SHA}"
            }
        }
    }
    stage("Update k8s menifest files"){
        steps{
            sh """
                    sed -i "s|image: arpanel/govt-ip:.*|image: arpanel/govt-ip:v${VERSION}-${GIT_SHA}|" k8s/integration-plateform/deployment.yml 
                   
                """
        }
    }

   stage ("Push updated k8s to github"){
            steps{
                withCredentials([
                usernamePassword(
                    credentialsId: "gitHubCreds",
                    usernameVariable: "GIT_USER",
                    passwordVariable: "GIT_PAT"
                )
            ]){
                sh """
                    git config user.name "Jenkins"
                    git config user.email "jenkins@local"

                    git status

                    git add k8s/

                    git commit -m " fix(k8s): automated jenkins update image version " || true

                    git push https://${GIT_USER}:${GIT_PAT}@github.com/arpanelfranklin/EkSutra.git HEAD:main
                """
                }
            }
        }


    post{
        success{
           script {
                emailext from: "arpanelgdgbu@gmail.com",
                subject: "Build succesfull",
                body: " build succesfull yayyyy",
            to: "arpanel07@gmail.com"
           }
        }
        failure{
            script {
                emailext from: "arpanelgdgbu@gmail.com",
                subject: "Build failed",
                body: "build failed oops",
            to: "arpanel07@gmail.com"
           }

        }
    }
}
 
