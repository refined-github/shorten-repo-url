/** @type {import('xo').FlatXoConfig} */
export default [
	{
		languageOptions: {
			globals: {
				document: 'readonly',
			},
		},
		rules: {
			'unicorn/better-regex': 'off',
			'unicorn/prefer-module': 'off',
			complexity: 'off',
		},
	},
];
