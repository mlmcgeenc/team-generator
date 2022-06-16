const Manager = require('../lib/Manager')

test('checks Manager specific properties and methods', () => {
  const manager = new Manager('John', '007', 'john@email.com', '314');

  expect(manager.officeNumber).toBe('314')
  expect(manager.getRole).toBe('Manager')
})