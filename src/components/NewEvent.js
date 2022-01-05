import Modal from '../UI/Modal'
const NewEvent = (props) => {
	return <Modal onClose={props.hideAddEventHandler}><h1>NewEvent</h1></Modal>
}

export default NewEvent