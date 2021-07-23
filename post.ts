const baseURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdXgpMXAYTvzQDSH0TlPUojb_a-mV4paqi9brQALgrtLwOL8Q/formResponse"

/*入力時の検証
HRNOの桁数
体温の桁数
体温のmin, maxの大小
 */

addEventListener("fetch", (event)=> {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request) {
	const json = await request.json();
	const hrno =parseInt(json["hrno"]);
	const max = parseInt(json["max"]);
	const min = parseInt(json["min"]);

	if(hrno !== undefined && max !== undefined && min !== undefined) {
		post(hrno,max,min);
		return new Response(JSON.stringify({
			"msg":"maybe success",
		}))
	}

	return new Response(JSON.stringify({
		"msg": "Error Occuerd",
		hrno: hrno,
		max: max,
		min: min,
	}))

}



function calc_temperature(max: number, min: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function post(hrno: number, max: number, min: number) {
	const calc_tmp = calc_temperature(max, min);	
	const date = new Date();

	const request = `?entry.241330187=${hrno}&entry.1082102554=${calc_tmp}&entry.863884693=&entry.320320823=&entry.168080936_month=${date.getMonth()}&entry.168080936_day=${date.getDay()}&entry.273966609_sentinel=&fvv=1&draftResponse=%5Bnull%2Cnull%2C%22-4110088555736658884%22%5D&pageHistory=0&fbzx=-4110088555736658884`;

	await fetch(baseURL + request, {
		method: "POST",
	});
}