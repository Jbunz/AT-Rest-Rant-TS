import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useHistory, useParams } from 'react-router';

interface Place {
	placeId: number;
	name: string;
	pic: string;
	city: string;
	state: string;
	cuisines: string;
	founded: number | string;
	// Add other properties as needed
}

function EditPlaceForm() {
	const history = useHistory();
	const { placeId } = useParams<{ placeId: string }>();

	const [place, setPlace] = useState<Place>({
		placeId: 0,
		name: '',
		pic: '',
		city: '',
		state: '',
		cuisines: '',
		founded: '',
	});

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`http://localhost:5000/places/${placeId}`);
			const resData: Place = await response.json();
			setPlace(resData);
		};
		fetchData();
	}, [placeId]);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		await fetch(`http://localhost:5000/places/${place.placeId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(place),
		});

		history.push(`/places/${place.placeId}`);
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setPlace((prevPlace) => ({
			...prevPlace,
			[name]: value,
		}));
	}

	return (
		<main>
			<h1>Edit Place</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Place Name</label>
					<input
						required
						value={place.name}
						onChange={handleChange}
						className="form-control"
						id="name"
						name="name"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="founded">Year Founded</label>
					<input
						required
						value={place.founded}
						onChange={handleChange}
						className="form-control"
						id="founded"
						name="founded"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="pic">Place Picture</label>
					<input
						value={place.pic}
						onChange={handleChange}
						className="form-control"
						id="pic"
						name="pic"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="city">City</label>
					<input
						value={place.city}
						onChange={handleChange}
						className="form-control"
						id="city"
						name="city"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="state">State</label>
					<input
						value={place.state}
						onChange={handleChange}
						className="form-control"
						id="state"
						name="state"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="cuisines">Cuisines</label>
					<input
						value={place.cuisines}
						onChange={handleChange}
						className="form-control"
						id="cuisines"
						name="cuisines"
						required
					/>
				</div>
				<input className="btn btn-primary" type="submit" value="Save" />
			</form>
		</main>
	);
}

export default EditPlaceForm;
