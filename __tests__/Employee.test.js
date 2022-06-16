const Employee = require('../lib/Employee')

test('checks the properties on a newly created employee', () => {
  const employee = new Employee('John', '007', 'john@email.com')

  expect(employee.name).toBe('John')
  expect(employee.id).toBe('007')
  expect(employee.email).toBe('john@email.com')
})

test('checks the methods of a newly created employee', () => {
	const employee = new Employee('John', '007', 'john@email.com');

	expect(employee.getName()).toEqual(expect.any(String));
	expect(employee.getId()).toEqual(expect.any(String));
	// email validation regex from https://www.w3resource.com/javascript/form/email-validation.php
	expect(employee.getEmail()).toMatch(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  expect(employee.getRole()).toBe('Employee')
})