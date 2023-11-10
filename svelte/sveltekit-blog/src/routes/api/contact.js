export const post = async ({ request }) => {
	const body = await request.json();
	const email = body.name;
	const name = body.email;

	return {
		body: {
			email,
			name
		},
		status: 200,
	};
};
