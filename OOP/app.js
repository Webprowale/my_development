const url = 'https://robomatic-ai.p.rapidapi.com/api';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '8c8c1bc24cmshe17faec4ca7ad92p1f45ebjsn890a4f0df456',
		'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com'
	},
	body: new URLSearchParams({
		in: 'What\'s 2 plus 5?',
		op: 'in',
		cbot: '1',
		SessionID: 'RapidAPI1',
		cbid: '1',
		key: 'RHMN5hnQ4wTYZBGCF3dfxzypt68rVP',
		ChatSource: 'RapidAPI',
		duration: '1'
	})
};

try {
	const response =  fetch(url, options);
	const result =  response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}