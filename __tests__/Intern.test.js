const { default: test } = require('node:test')
const intern = require('../lib/Intern')

test('checks intern specific properties and methods', () => {
  const intern = new Intern('John', '007', 'john@email.com', 'University');

  expect(intern.school).toBe('University')
  expect(intern.getSchool()).toBe(intern.school)
  expect(intern.getRole()).toBe('Intern')
})