const inquirer = require('inquirer');
const fs = require('fs');
const generateHTML = require('./generateHTML');
const Choices = require('inquirer/lib/objects/choices');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const company = {
	engineers: [],
	interns: [],
	lastIdCreated: 000,
	lastOfficeAssigned: 100,
	employeeType: 'employee',
};

const newManagerQuestion = [
	{
		type: 'input',
		name: 'officeNumber',
		message: "Enter the manager's office number",
		default: company.lastOfficeAssigned + 1,
	},
];

const newEngineerQuestion = [
	{
		type: 'input',
		name: 'github',
		message: 'What is their github username?',
		default: 'no-github-account',
	},
];

const newInternQuestion = [
	{
		type: 'input',
		name: 'school',
		message: 'What is the name of their school?',
		default: 'Local-University',
	},
];

const nextStepQuestion = [
	{
		type: 'list',
		name: 'nextStep',
		message: 'What would you like to do next?',
		choices: ['Add a new engineer to my team', 'Add a new intern to my team', new inquirer.Separator(), 'Nothing. I am finished building my team'],
	},
];

const makeNewEmployee = (type) => {
	const employeeQuestions = [
		{
			type: 'input',
			name: 'name',
			message: `Enter the ${company.employeeType}'s name`,
			validate: (name) => {
				if (name) {
					return true;
				} else {
					console.log(`${company.employeeType} name is required`);
					return false;
				}
			},
		},
		{
			type: 'input',
			name: 'id',
			message: (answers) => `Enter ${answers.name}'s id number`,
			default: company.lastIdCreated + 1,
		},
		{
			type: 'input',
			name: 'email',
			message: (answers) => `Enter ${answers.name}'s email address`,
			default: (answers) => `${answers.name}@our-company.com`,
			validate: (email) => {
				if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
					return true;
				} else {
					console.log('A valid email address is required');
					return false;
				}
			},
		},
	];

	inquirer.prompt(employeeQuestions).then(({ name, id, email }) => {
		if (!company.manager) {
			inquirer.prompt(newManagerQuestion).then(({ officeNumber }) => {
				makeNewManager(name, id, email, officeNumber);
				inquirer.prompt(nextStepQuestion).then((answer) => {
					nextStep(answer);
				});
			});
		} else {
			if (company.employeeType === 'engineer') {
				inquirer.prompt(newEngineerQuestion).then(({ github }) => {
					makeNewEngineer(name, id, email, github);
					inquirer.prompt(nextStepQuestion).then((answer) => {
						nextStep(answer);
					});
				});
			} else {
				inquirer.prompt(newInternQuestion).then(({ school }) => {
					makeNewIntern(name, id, email, school);
					inquirer.prompt(nextStepQuestion).then((answer) => {
						nextStep(answer);
					});
				});
			}
		}
	});
};

const nextStep = (answer) => {
	switch (answer.nextStep) {
		case 'Add a new engineer to my team':
			company.employeeType = 'engineer';
			makeNewEmployee();
			break;
		case 'Add a new intern to my team':
			company.employeeType = 'intern';
			makeNewEmployee();
			break;
		case 'Nothing. I am finished building my team':
			endTeamBuilding();
			break;
	}
};

const makeNewManager = (name, id, email, special) => {
	company.manager = new Manager(name, id, email, special);
	company.lastIdCreated = id++;
	company.lastOfficeAssigned = special++;
};

const makeNewEngineer = (name, id, email, special) => {
	company.engineers.push(new Engineer(name, id, email, special));
	company.lastIdCreated = id++;
};

const makeNewIntern = (name, id, email, special) => {
	company.interns.push(new Intern(name, id, email, special));
	company.lastIdCreated = id++;
};

const endTeamBuilding = () => {
	console.log('Finished building the team');
  generateHTML(company)
};

function init() {
  console.log('Begin by entering a manager for your team!');
  company.employeeType = 'manager';
  makeNewEmployee()
}

init();
