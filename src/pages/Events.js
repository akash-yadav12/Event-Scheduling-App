import {useState,useEffect} from 'react'

const Events = () => {
	const [events,setEvents] = useState()

	useEffect(() => {
		fetch('https://ik-react-task.herokuapp.com/events', {
			method:'GET',
			headers:{
				'Authorization': `Bearer ${localStorage.getItem('auth')}`,
				'Content-Type': 'application/json'
			}			
		}).then(res => res.json()).then(resData => {
			console.log(resData)
			setEvents(resData)
		})
		.catch(err => console.log(err))
	},[])



	return <div>
		{events.map(event => (
			<p>{event.name}</p>
		))}
	</div>
}

export default Events