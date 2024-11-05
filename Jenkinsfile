 pipeline {
    agent any
    stages {
        stage('Pulling the latest code') {
            steps {
                sh """
                cd /home/ubuntu/mern/obaai-photo/ui/dev
                git stash
                git pull
                """
            }
        }

        stage('install dependency') {
            steps {
                sh """
                cd /home/ubuntu/mern/obaai-photo/ui/dev && npm install --legacy-peer-deps
		npm i react-data-table-component
                """
            }
        }

        stage('build and deploy') {
            steps {
                sh """
                cd /home/ubuntu/mern/obaai-photo/ui/dev && npm run build
                """
            }
        }

    }
}
