pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                bat '''
                echo Building the project...
                REM Add your build ste here
                '''
            }
        }
        stage('Test') {
            steps {
                bat '''
                echo Running twestin tests...
                reacyt projedct
                 REM Add your test steps here
                '''
            }
        }
        stage('Code Analysis') {
            steps {
                bat '''
                echo Performing code analysis...

                REM Add your code analysis steps here
                this is qa branch
                '''

            }
        }
    }
    post {
        success {
            bat '''
            echo Build and tests succeeded.
            '''
        }
        failure {
            bat '''
            echo Build or tests failed.

            REM Add actions for failure cases, e.g., notify users

            '''
        }
    }
}
