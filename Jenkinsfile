pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'node-jenkins', type: 'Tool'
        // Define any other environment variables needed for your project
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh "${NODEJS_HOME}/bin/npm install"
            }
        }

        stage('Run Tests') {
            steps {
                sh "${NODEJS_HOME}/bin/npm test"
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarserver') {
                    sh "${NODEJS_HOME}/bin/sonar-scanner"
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                // Add steps to build and deploy your Node.js application
                // For example: sh "${NODEJS_HOME}/bin/npm build"
                echo 'build complete'
            }
        }
    }
}
