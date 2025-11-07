module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'next/core-web-vitals',
		'airbnb'
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [
		'react'
	],
	rules: {
		semi: ['error', 'never'],
		indent: ['error', 'tab'],
		'no-tabs': 0,
		'comma-dangle': ['warn', 'never'],
		'react/function-component-definition': ['error', {
			namedComponents: ['arrow-function', 'function-declaration', 'function-expression', 'arrow-function'],
			unnamedComponents: ['function-expression', 'arrow-function']
		}],
		'arrow-body-style': ['error', 'always'],
		'react/jsx-indent': ['warn', 'tab'],
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'max-len': ['warn', 140],
		'react/jsx-one-expression-per-line': ['warn', { allow: 'single-child' }],
		'react/jsx-indent-props': ['warn', 'tab'],
		"react/jsx-props-no-spreading": ['warn', {
			"html": "ignore",
			"custom": "ignore",
			"explicitSpread": "ignore",

		}],
		// 'react/jsx-filename-extension': ['error', 'always']
	}
}
