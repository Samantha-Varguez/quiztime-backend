const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.projectKey': 'quiztime-backend',
      'sonar.projectName': 'QuizTime Backend',
      'sonar.projectVersion': '1.0',
      'sonar.sources': '.', // o '.' si tu código está en la raíz
      'sonar.sourceEncoding': 'UTF-8',
      'sonar.exclusions': 'node_modules/**,test/**'
    }
  },
  () => {
    console.log("✅ Análisis de SonarQube completado.");
  }
);
