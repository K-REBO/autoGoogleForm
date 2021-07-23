const db_url = "http://0.0.0.0:8080";
const post_url = "http://0.0.0.0:8080";

const hrno_list:Array<number> = await fetch(db_url + "/all", {
	method: 'GET',
}).then(x => x.json()).then(json => json["key_index_array"]);
console.log(hrno_list);

hrno_list.map(async (hrno) =>  {
	const data = await fetch(db_url + "/" + hrno, {
		method:"GET"
	}).then(res => res.json()).then(json => {
		fetch(post_url, {
			body: JSON.stringify({
				hrno: hrno,
				max: json["max"],
				min: json["min"],
			})
		})	
	})

	console.log(data);
})