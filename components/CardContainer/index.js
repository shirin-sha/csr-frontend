import React from 'react'
import Card from '../card'
import styles from './style.module.css'
import Image from 'next/image'
import oops from '../../images/oops.png'



const CardContainer = ({ isEvent, data, isApplicant,user ,mutate,hits,findNotifiedProjects}) => {
	//console.log({hits});
	return (
	

		
	<div className={styles.container}>

		{data?.map((doc, idx) => {
			
			const isLastElement = data.length === idx + 1;

		//	!isEvent && !isApplicant && console.log('individual project is updated',findNotifiedProjects(doc.objectID));
			// console.log({isLastElement});
			return(
			isLastElement ?(<Card isNewUpdate={findNotifiedProjects && findNotifiedProjects(doc.objectID)} key={doc.objectID} isEvent={isEvent} user={user} mutate={mutate} isApplicant={isApplicant} detailsprop={doc}></Card>):
			(<Card isNewUpdate={findNotifiedProjects &&findNotifiedProjects(doc.objectID)} key={doc.objectID} isEvent={isEvent} user={user} mutate={mutate} isApplicant={isApplicant} detailsprop={doc}></Card>)
		)})}
	</div>
	)


}
// const CustomHits = connectHits(CardContainer);
export default CardContainer
