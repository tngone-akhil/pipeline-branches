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
                if (env.CHANGE_ID) {
                        // Use bat step to print the environment variable
                       bat"hello"
                    }
                bat 'npm run build'
                
            }
        }
    }
}
