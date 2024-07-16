import React, { useState, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';

interface Comment {
	commentId: number;
}

interface Place {
	placeId: number;
	comments: Comment[];
}

interface PlaceDetailsProps {
	place: Place | null;
}

function PlaceDetails({ place: initialPlace }: PlaceDetailsProps) {
	// const history = useHistory(); // Comment out 'history' to resolve the warning

	const [place, setPlace] = useState<Place | null>(initialPlace);

	useEffect(() => {
		const fetchPlaceDetails = async () => {
			try {
				const response = await fetch(`http://localhost:5000/places/${initialPlace?.placeId}`);
				if (!response.ok) {
					throw new Error('Failed to fetch place details');
				}
				const placeData: Place = await response.json();
				setPlace(placeData);
			} catch (error) {
				console.error('Error fetching place details:', error);
			}
		};

		if (!place) {
			fetchPlaceDetails();
		}
	}, [initialPlace, place]);

	return (
		<div>
			{/* Place details UI */}
		</div>
	);
}

export default PlaceDetails;
