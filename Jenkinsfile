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
    post {
        always {
            script {
                try {
                    def workspacePath = env.WORKSPACE
                    def buildFilesDir = "${workspacePath}\\build-files" // Example target directory

                    // Create directory if it doesn't exist
                    if (!new File(buildFilesDir).exists()) {
                        bat "mkdir \"${buildFilesDir}\""
                    }

                    // Move build artifacts to the designated directory
                    bat "copy /Y \"${workspacePath}\\dist\\*\" \"${buildFilesDir}\""
                       bat "xcopy /Y \"${workspacePath}\\dist\\*\" \"${buildFilesDir}\"/E"

                    // Display paths of saved files
                    echo "Build files saved in directory: ${buildFilesDir}"
                    echo "Files saved"
                    bat "dir \"${buildFilesDir}\""
                } catch (Exception e) {
                    echo "Error in post-build actions: ${e.message}"
                    currentBuild.result = 'FAILURE' // Mark build as failure
                    throw e // Throw the exception to terminate the script
                }
            }
        }
    }
}
