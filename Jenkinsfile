pipeline {
  agent any

  environment {
    DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
  }

  stages {
    stage('Build') {
      steps {
        script {
          docker.build('your-dockerhub-username/api-gateway:latest', './path/to/api-gateway')
          docker.build('your-dockerhub-username/login-service:latest', './path/to/login-service')
          docker.build('your-dockerhub-username/signup-service:latest', './path/to/signup-service')
        }
      }
    }

    stage('Push') {
      steps {
        withDockerRegistry([credentialsId: DOCKER_CREDENTIALS_ID, url: 'https://index.docker.io/v1/']) {
          script {
            docker.image('your-dockerhub-username/api-gateway:latest').push('latest')
            docker.image('your-dockerhub-username/login-service:latest').push('latest')
            docker.image('your-dockerhub-username/signup-service:latest').push('latest')
          }
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          sh 'kubectl apply -f ./k8s/deployment.yaml'
          sh 'kubectl apply -f ./k8s/service.yaml'
        }
      }
    }
  }
}
