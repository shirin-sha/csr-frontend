import React, { useEffect,useState,useContext } from 'react'
import styles from './style.module.css'
import Button from '../Button'
import { BiSearch } from 'react-icons/bi'
import { AuthContext } from '../../store/context'

import debounce from '../../helperFuctions/debounce'

import useDataQuery from '../../hooks/useDataQuery';


const TopBar = ({changefilter, setSearch, filterValue, isEvent, isSponsor, button_value, title, isOrganizer, onClick, onClick2, onClickActiveBtn, onClickQueueBtn, setSearchQuery, searchQuery }) => {
	// category
	const [selectedCat, setSelectedCat] = useState([]);

    useEffect(() => {

        console.log({ selectedCat });
		if((isEvent && isOrganizer) || (!isEvent && isSponsor)){
			changefilter(selectedCat)

		}
    }, [selectedCat]);

    const [categorydata, errors] = useDataQuery({
        key: "/public/get-categories",
        data: {},
    });
    console.log("categorydata ", categorydata);
    const categories = categorydata?.data?.categories
    console.log({ categories });

	// 
	
	const [sortDiv,setSortDiv]=useState(false)
	const [categoryPanel,setcategoryPanel]=useState(false)
	 
	const showCategory=()=>{
		setcategoryPanel(true)
		setSortDiv(false)
	}
	const sortClicked=()=>{
		setSortDiv(true)
		setcategoryPanel(false)
	}
	console.log("sss");
	console.log("filterValue", filterValue?.filterValue);
	if (filterValue == 'status:ACTIVE') {
		console.log("equal")
	}
	else {
		console.log("notequal");
	}
	const { userData, setUserData } = useContext(AuthContext)
	// const [active, setActive] = useState("");


	return (
		<>
			<div className={styles.webview}>
				<div className={styles.largeView}><h3 className={styles.title}>{title}</h3>
				</div>


				{!isSponsor && !isOrganizer &&<div className={styles.smallView}><h3 className={styles.title}>{title}</h3>
					<Button onClick={onClick} text={button_value} /></div>}
					{isOrganizer && <div className={styles.smallView}><div className={styles.orgTitle}><h3 className={styles.title}>{title}</h3>
				<div className={styles.orgButtons}>	<Button onClick={onClick} text={button_value} /><button className={filterValue == 'status:ACTIVE' ? styles.activebtn : styles.allButtons} onClick={onClick2} >All Events</button></div> </div></div>}
				


				{isSponsor ? (
					<div className={styles.topBar
					}>
						<div className={styles.leftDiv}>

							<div className={styles.respleftDiv}>
								<button className={filterValue == `(status:ACTIVE OR status :QUEUE)` ? styles.activebtn : styles.allButtons}
									onClick={onClick2} >All</button>
								<button className={filterValue == 'status:ACTIVE' ? styles.activebtn : styles.allButtons}
									onClick={onClickActiveBtn}>Active</button>
								<button className={filterValue == 'status:QUEUE' ? styles.activebtn : styles.allButtons}
									onClick={onClickQueueBtn}>Queue</button>
							</div>
							{/* new */}
							<div className={styles.responsBtnDiv}>
							<button className={styles.allButtons}
									onClick={onClick2} >All</button>
									<button className={styles.allButtons}
									onClick={sortClicked} >Sort</button>
									<button className={styles.allButtons}
									onClick={showCategory} >Filter</button>
							</div>
{sortDiv &&(<div className={styles.sortDiv}>
	<button className={filterValue == 'status:ACTIVE' ? styles.activeQueClicked : styles.activeQueBtn}
									onClick={onClickActiveBtn}>Active</button>
								<button className={filterValue == 'status:QUEUE' ? styles.activeQueClicked : styles.activeQueBtn}
									onClick={onClickQueueBtn}>Queue</button>
</div>)
}
{ categoryPanel && (
					<div>
                    <div className={styles.categoryContainer}>
					<div className={styles.categories}>
					{/* <ul className={styles.inputList}> */}
					{categories && categories.map((cat) => (
						// <div style={{display:"flex"}}>
					<span 
					key={cat._id} 
					className={styles.list}>
					<label className={styles.container}>
						{cat.name}
					<input type="checkbox"
                                        name='category'
                                        value={cat._id}

                                        onChange={(e) => {
                                            const { value, checked } = e.target
                                            if (checked) {
                                                console.log('category value', { value });
                                                //setFilterValue(`category._id:${value}`)
                                                setSelectedCat(dat => [...dat, `category._id:${value}`])
                                            }
                                            if (!checked) {
                                                const dat = selectedCat.filter((dat) => {
                                                    return dat !== `category._id:${value}`
                                                })
                                                console.log('select', { dat });
                                                setSelectedCat(dat)
                                            }

                                        }} />
<span className={styles.checkmark} />
					</label>
					</span>
					
					))}
					
					</div>
					</div>
					</div>
				)}





							{/*  */}
							<div style={{ position: 'relative' }}><input
								className={styles.search} style={{ paddingLeft: '2rem' }} placeholder="Search Project"

								type="text"
								value={searchQuery}
								onChange={event => {
									let value = event.currentTarget.value
									console.log(event.currentTarget.value);
									console.log('debounce value',{value});
									debounce(() => {
										console.log('debounce');
										setSearch(value)
									}, 50)


								}}

							/><div className={styles.searchIcon} style={{ position: 'absolute', top: '4px', padding: '10px', color: ' rgba(67, 67, 67, 0.66)' }}><BiSearch /></div></div>

						</div>

						<div className={styles.myProjectSponsor}>
							<button className={filterValue == `(sponsorships.sponsor_id:${userData.userId} )` ? styles.activebtn : styles.allButtons} onClick={onClick}>My Projects</button>

						</div>
					</div>
				) :
					(
						<div className={styles.topBar}>
							<div className={styles.leftDiv}>


								<div className={styles.searchiconWidth} style={{ position: 'relative' }}>

									<input
										className={styles.search} style={{ paddingLeft: '2rem' }} placeholder={isEvent ? "Search Event" : "Search Project"}
										type="text"
										value={searchQuery}
										onChange={event => {
											let value = event.currentTarget.value
											console.log('debounce value',{value});
											debounce(() => {
												console.log('debounce');
												setSearch(value)
											}, 50)
										}}

									/>
									<div className={styles.searchIcon} style={{ position: 'absolute', top: '4px', padding: '10px', color: ' rgba(67, 67, 67, 0.66)' }}><BiSearch /></div>
								</div>
								{/* <input className={styles.search} type="text" placeholder="Search..." /> */}
							</div>
							<div className={styles.myProject}>



								{isOrganizer ?
									<button className={filterValue == `organizers.organizer_id : ${userData.userId}` ? styles.activebtn : styles.allButtons} onClick={onClick}>My Event</button> :
									<Button filterValue={filterValue} onClick={onClick} text={button_value} />
								}
								{isOrganizer && <button className={filterValue == 'status:ACTIVE' ? styles.activebtn : styles.allButtons} onClick={onClick2} >All Events</button>}

							</div>
						</div>
					)


					
				}
				
			</div>

		</>
	)
}
export default TopBar
