const delete_pass = "asdfjkl;123";
let memory:Array<any> = new Array();

addEventListener("fetch", (event)=> {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request) {
	if(request.method == "GET") {
		return new Response(JSON.stringify(
			{
				"result": memory,
			}
		))
	}
	else if (request.method === "POST") {
		let json = await request.json()
		let deleteKey:number = json["delete"];

		if(!isNaN(deleteKey)) {
			if(String(json["delete_pass"]) === delete_pass) {

				console.log(memory);
				console.log(deleteKey);
				memory.splice(deleteKey, deleteKey + 1);
				console.log(memory);
				return new Response(JSON.stringify({
					"msg":`delete memory with ${deleteKey} as key`
				}));	
			}
			return new Response(JSON.stringify({
				"msg":`Invalid ${json["delete_pass"]}`
			}));	

		}

		memory.push({
			hrno:json["hrno"],
			msg:json["data"]
		});
		return new Response(JSON.stringify (
			{
				"msg": "Hello",
			}
		));
	}
	else {
		return new Response(JSON.stringify(
			{
				"msg": "Bad method"
			}
		))
	}	
}