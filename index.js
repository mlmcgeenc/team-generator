const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
const Manager = require('./lib/Manager');

const company = {
	manager: {},
	engineers: [],
	interns: [],
	lastIdCreated: 000,
	lastOfficeAssigned: 100,
  employeeType: 'employee',
};

const employeeQuestions = [
	{
		type: 'input',
		name: 'name',
		message: `Enter the name of your ${company.employeeType}`,
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
		message: `Enter the ${company.employeeType}'s id number`,
		default: company.lastIdCreated + 1,
	},
	{
		type: 'input',
		name: 'email',
		message: `Enter the ${company.employeeType}'s email address`,
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

const newManagerQuestion = [
	{
		type: 'input',
		name: 'officeNumber',
		message: "Enter the team manager's office number",
		default: company.lastOfficeAssigned + 1,
		},
];
const nextStepQuestion = [
	{
		type: 'list',
		name: 'nextStep',
		message: 'What would you like to do next?',
		choices: ['Add a new engineer to my team.', 'Add a new intern to my team.', new inquirer.Separator(), 'Nothing. I am finished building my team.'],
	},
];

const setEmployeeType = (type) => {
  company.employeeType = type
  return type
}

const makeNewManager = (name, id, email, special) => {
	company.manager = new Manager(name, id, email, special);
	company.lastIdCreated = id++;
	company.lastOfficeAssigned = special++;
	//  TODO update local storage
};

const makeNewEngineer = (name, id, email, special) => {
  company.engineers.push(new Engineer(name, id, email, special))
}

const makeNewIntern = (name, id, email, special) => {
  company.interns.push(new Intern(name, id, email, special))
}

const endTeamBuilding = () => {
	//  TODO save company to local storage and create html doc
	console.log('endTeamBuilding');
  console.log(company);
};

function init() {
  company.employeeType = 'manager';
  inquirer.prompt(employeeQuestions)
    .then(({ name, id, email}) => {
      switch (company.employeeType) {
        case 'manager' :
          inquirer.prompt(newManagerQuestion)
            .then((officeNumber) => makeNewManager(name, id, email, officeNumber))
          break;
        case 'engineer' :
          inquirer
            .prompt(newEgnineerQuestion)
            .then((github) => makeNewManager(name, id, email, github))
          break;
        case 'intern' :
          inquirer
            .prompt(newInternQuestion)
            .then((school) => makeNewManager(name, id, email, school))
          break;
        default :
          console.log('an error occured')
      }
    })
    .then(() => {
      inquirer.prompt(nextStepQuestion).then(({ nextStep }) => {
        if (nextStep === 'Nothing. I am finished building my team.') {
          endTeamBuilding();
        } else {
          makeNewEmployee(nextStep);
        }
      });
    })
}

init();
