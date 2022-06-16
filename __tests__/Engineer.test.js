const Engineer = require('../lib/Engineer');

test('checks engineer specific properties', () => {
	const engineer = new Engineer('John', '007', 'john@email.com', 'github-username');

	expect(engineer.github).toBe('github-username');
	expect(engineer.getGithub).toBe('github-username');
	expect(engineer.getRole).toBe('Engineer');
});
