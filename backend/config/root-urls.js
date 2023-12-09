module.exports = {
	ROOT_URL:
		process.env.NODE_ENV === 'production'
			? {
					WEB: 'https://cs-9-outfit-creator-nedu.vercel.app',
					API: 'https://outfit-creator.onrender.com'
				}
			: {
					WEB: 'http://localhost:3000',
					API: 'http://localhost:5000'
				}
};
