pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies if needed
                bat 'npm install'
            }
        }
        stage('Build') {
            steps {
                // Build the React application
                bat 'npm run build'
                
            }
        }
    }
}
