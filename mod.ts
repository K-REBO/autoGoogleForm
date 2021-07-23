const db_url = "https://auto-google-form-db.deno.dev";
const post_url = "https://auto-google-form-sender.deno.dev";

const hrno_list:Array<number> = await fetch(db_url + "/all", {
	method: 'GET',
}).then(x => x.json()).then(json => json["key_index_array"]);
console.log(hrno_list);

hrno_list.map(async (hrno) =>  {
	const data = await fetch(db_url + "/" + hrno, {
		method:"GET"
	}).then(res => res.json()).then(json => {
		fetch(post_url, {
			method:"POST",
			body: JSON.stringify({
				hrno: hrno,
				max: json["max"],
				min: json["min"],
			})
		})	
	})

	console.log(data);
})