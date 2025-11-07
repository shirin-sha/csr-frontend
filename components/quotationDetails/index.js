
import Button from "../Button";
import styles from './quatation.module.css'
import { useRouter } from 'next/router'
import { axiosDoc, fetcher } from "../../hooks/useDataQuery";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/context";

function Quotation({added_applicant, details, userUrl }) {
	const [downloadfile, setDownloadFile] = useState()
	const router = useRouter()
	const { userData, setUserData } = useContext(AuthContext)
	console.log("downloadfileee", downloadfile);

	console.log({ details });
	function download(file) {
		console.log("fgjhjh")
		axiosDoc(file, userUrl)
			.then((response) => {
				console.log("download", { response });
				var urlCreator = window.URL || window.webkitURL;
				console.log("urlCreator", urlCreator);
				const Url = urlCreator.createObjectURL(response.data);
				setDownloadFile(Url)
				console.log("docUrl", Url);

			})

	}
	const openInNewTab = (file) => {
		console.log({ file });

		axiosDoc(file, userUrl)
			.then((response) => {
				console.log("fileResponse", { response });

				var urlCreator = window.URL || window.webkitURL;
				console.log("urlCreator", urlCreator);
				const docUrl = urlCreator.createObjectURL(response.data);
				console.log("docUrl", docUrl);
				window.open(docUrl, "_blank", "noopener,noreferrer");
			})
			.catch((err) => {
				console.log({ err });
			});
	};
	const toMessage = (value) => {
		// e.preventDefault()
		// console.log('chat...appl');
console.log({added_applicant});
		const data = {
			ownerId: details.organizer_id._id,
			userName: userData.userName,
			userId: userData.userId,
			isApplicant: added_applicant  ? true : false,
			isEvent: true

		}
	
		fetcher({
			key: `/${userUrl}/startChat`, data, header: {
				headers: { token: userData.token }
			}
		}).then(res => {
			console.log('chat data sent', { res });
			console.log('chat data', data);
			router.push(`/messages?id=${res.data.data}`)

		})

	}
	return (
		<div className={styles.quatationDiv}>


			<div>

				<div className={styles.box}>
					<div className={styles.priceShow}><p>Quotation Price  :<span>  {details?.amount}</span>  <span>KD</span></p></div>
					<div className={styles.qContent}>
						<div className={styles.price}>
							<div className={styles.lineFlex}>
								<label className={styles.content}>Name</label>
								<p>:</p>
								<p className={styles.rightSec}>{details?.organizer_id?.company_name || details?.organizer_id?.first_name}</p>
							</div>
							<div className={styles.lineFlex}>
								<label className={styles.content}>Email</label>
								<p>:</p>
								<p className={styles.rightSec}>{details?.organizer_id?.email}</p>
							</div>
						</div>

						<div className={styles.lineFlex}>
							<label className={styles.content}>Phone Number</label>
							<p>:</p>

							<p className={styles.rightSec}>{details?.organizer_id?.mobile}</p>

						</div>

						{details?.documents.length > 0 && <div className={styles.doclineFlex}>
							{<label className={styles.content}>Documents</label>}
							<p>:</p>
							<div className={styles.rightSecBtn}>


								{details?.documents && details.documents.map((item, idx) => {
									return (
										<  >
											
												<p className={styles.docList}>Document {idx + 1}</p>
												<Button onClick={() => openInNewTab(item.file_name)} sm text={"View"} />
												<a href={downloadfile} download >
													<Button onClick={() => download(item.file_name)} sm text={"Download"} />
												</a>
										
										</>
									)
								})}

							</div>

						</div>}</div>
					<div className={styles.btndiv}>

						<Button className={styles.buttons} onClick={toMessage} text={'Message'}></Button>
						
					</div>
					<div className={styles.btndivmobil}><button className={styles.mobilebtn} onClick={toMessage}>Message</button></div>
				</div>
			</div>
		</div >
	)
}

export default Quotation