const fs = require('fs');

const createManagerCard = (managerInfo) => {
	console.log(managerInfo);
	return `
  <div class="card p-0 shadow m-3" style="width: 18rem;">
    <div class="card-header bg-primary text-light">
      <h3>${managerInfo.name}</h3>
      <h5><i class="fa-solid fa-mug-hot"></i> Manager</h5>
    </div>
    <div class="card-body bg-light">
      <ul class="list-group">
        <li class="list-group-item">ID: ${managerInfo.id}</li>
        <li class="list-group-item">Email: <a class="card-link text-nowrap" href="mailto:${managerInfo.email}">${managerInfo.email}</a></li>
        <li class="list-group-item">Office Number: ${managerInfo.officeNumber}</li>
      </ul>
    </div>
  </div>
  `;
};

const createEngineerCards = (engineerList) => {
	return engineerList
		.map((engineer) => {
			return `
    <div class="card p-0 shadow m-3" style="width: 18rem;">
    <div class="card-header bg-primary text-light">
      <h3>${engineer.name}</h3>
      <h5><i class="fa-solid fa-glasses"></i> Engineer</h5>
    </div>
    <div class="card-body bg-light">
      <ul class="list-group">
        <li class="list-group-item">ID: ${engineer.id}</li>
        <li class="list-group-item">Email: <a class="card-link text-nowrap" href="mailto:${engineer.email}">${engineer.email}</a></li>
        <li class="list-group-item">Github: <a class="card-link" href="https://github.com/${engineer.github}">${engineer.github}</a></li>
      </ul>
    </div>
  </div>
    `;
		})
		.join('');
};

const createInternCards = (internList) => {
	return internList
		.map((intern) => {
			return `
    <div class="card p-0 shadow m-3" style="width: 18rem;">
    <div class="card-header bg-primary text-light">
      <h3>${intern.name}</h3>
      <h5><i class="fa-solid fa-graduation-cap"></i> Intern</h5>
    </div>
    <div class="card-body bg-light">
      <ul class="list-group">
        <li class="list-group-item">ID: ${intern.id}</li>
        <li class="list-group-item">Email: <a class="card-link text-nowrap" href="mailto:${intern.email}">${intern.email}</a></li>
        <li class="list-group-item">School: ${intern.school}</li>
      </ul>
    </div>
  </div>
    `;
		})
		.join('');
};

function generateHTML(company) {
	let page = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
</head>
<body>
<div class="container">
  <div class="row justify-content-center">
  ${createManagerCard(company.manager)}
  ${createEngineerCards(company.engineers)}
  ${createInternCards(company.interns)}
  </div>
</div>
</body>
<script src="https://kit.fontawesome.com/c20b00daf3.js" crossorigin="anonymous"></script>
</html>
`;
	try {
		fs.writeFileSync('index.html', page);
	} catch (err) {
		console.error(err);
	}
}

module.exports = generateHTML;
