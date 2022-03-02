const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			boxShadow: {
				'raised': '1px 1px 2px 0 rgb(17,19,30), -1px -1px 2px 0 rgb(63,63,70)',
				'sunk': '-1px -1px 2px 0 rgb(3,3,6), 1px 1px 2px 0 rgb(63,63,70)'
			}
		}
	},

	plugins: []
};

module.exports = config;
