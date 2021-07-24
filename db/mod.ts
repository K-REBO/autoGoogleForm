addEventListener("fetch", (event)=> {
	event.respondWith(handleRequest(event.request));
});


interface Person {
	name: string,
	max: number,
	min: number,
};
type getKey = "all" | "size" | number;


let db: Map<number, Person> = new Map();
let headers = {
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Credentials": "true",
	}
};


async function handleRequest(request: Request) {
	const { pathname } = new URL(request.url);

	/*
	GET
	https://endpoint.example.com/all
	https://endpoint.example.com/
	https://endpoint.example.com/
	---
	
	POST
	{
		hrno: number,
		name: string,
		max: number,
		min: number
	}
	*/


	if(request.method == "GET") {
		if(pathname.startsWith("/all")) {

			let key_index_array = Array.from(db.keys());

			return new Response(JSON.stringify({
				key_index_array: key_index_array,
			}),
			{
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": "true",
					'Content-Type': 'application/json'
				}
			}
			);
		}

		else if(pathname.startsWith("/size")) {
			return new Response(JSON.stringify({
				size: db.size,
			}),
			{
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": "true",
					'Content-Type': 'application/json'
				}
			}
			)
		}

		else {
			let hrno = parseInt(pathname.replace("/", ""));
			if(hrno === NaN) {
				return new Response(JSON.stringify(
					{
						"msg": "bad request method type",
					}
				),
				{
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Credentials": "true",
						'Content-Type': 'application/json'
					}
				}
				)		
			}
			if(db.has(hrno)) {
				return new Response(JSON.stringify({
					hrno: hrno,
					date: db.get(hrno),
				}),
				{
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Credentials": "true",
						'Content-Type': 'application/json'
					}
				}
				);	
			}
			else {
				return new Response(JSON.stringify({
					"msg": "requested data is not exsist",
				}),
				{
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Credentials": "true",
						'Content-Type': 'application/json'
					}
				}
				);
			}


		}
	}

	else if (request.method === "POST") {
		const json = await request.json();

		let delete_DB = parseInt(json["delete"]);
		if(typeof(delete_DB) === "number" && !isNaN(delete_DB)) {
			db.delete(delete_DB);
			console.log("Delete");
			return new Response(JSON.stringify({
				"msg": `delete db with ${delete_DB} as key`
			}),
			{
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": "true",
					'Content-Type': 'application/json'
				}
			}
			);
		}

		let hrno = parseInt(json["hrno"]);
		let person: Person = {
			name: json["name"],
			max: parseInt(json["max"]),
			min: parseInt(json["min"]),
		};
		db.set(hrno, person);

		return new Response(JSON.stringify({
			"msg": "Add to memory",
		}),
		{
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "true",
				'Content-Type': 'application/json'
			}
		}
		);
	}

	else {
		return new Response(JSON.stringify(
			{
				"msg": "Bad method"
			}
		),
		{
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "true",
				'Content-Type': 'application/json'
			}
		}
		)
	}	
}