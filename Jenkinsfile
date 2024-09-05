pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                bat '''
                echo Building the project...
               
                '''
            }
        }
        stage('Test') {
            steps {
                bat '''
                echo Running tests...
        
                '''
            }
        }
        stage('Code Analysis') {
            steps {
                bat '''
                echo Performing code analysis...
              
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
           
            '''
        }
    }
}
