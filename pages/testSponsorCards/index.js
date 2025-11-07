import React from 'react'
import Container from '../../components/sponserCards/container'

const testCardData1 = [
	{
		name: 'David John',
		amount: 'Rs 20000',
		confirmBySponsor: true,
		confirmByYou: true
	},
	{
		name: 'Binoy Williams',
		amount: 'Rs 20000',
		confirmBySponsor: false,
		confirmByYou: false
	}
]
const testCardData2 = [
	{
		name: 'David John',
		amount: 'Rs 20000'
	},
	{
		name: 'Binoy Williams',
		amount: 'Rs 20000'
	}
]
const noButtonClicked = (e) => {
	e.preventDefault()
	console.log('no Button Clicked')
}
const acceptButton = () => {
	console.log('accept clicked')
}
const removeButton = () => {
	console.log('remove clicked')
}
const messageButton = () => {
	console.log('message clicked')
}
const apiCall = () => {
	console.log("api called")
}

// handlers
const confirmHandler = () => {
	console.log('confirm button clicked')
}
const editHandler = () => {
	console.log('edit button clicked')
}
const messageHandler = () => {
	console.log('message button clicked')
}
const deleteHandler = () => {
	console.log('delete button clicked')
}
const testSponserCards = () => {
	return (
		<div>
			<Container type="applicant-sponsor" data={testCardData1} noButtonClicked={noButtonClicked} removeButton={removeButton} messageButton={messageButton} apiCall={apiCall} />
			<Container type="applicant-queue-sponsor" data={testCardData1} acceptButton={acceptButton} messageButton={messageButton} />
			<Container type="sponsor-sponsorship" data={testCardData1} confirmHandler={confirmHandler} editHandler={editHandler} messageHandler={messageHandler} deleteHandler={deleteHandler} />
			<Container type="sponsor-sponsor-list" data={testCardData2} />
		</div>

	)
}
export default testSponserCards
