import { RecoilRoot } from 'recoil'
import GlobalPopup from '../components/globalPopup'
import '../styles/globals.css'
import AuthContext from '../store/context'

// import 'bootstrap/dist/css/bootstrap.css'


function MyApp({ Component, pageProps }) {
	return (
		<AuthContext>
		<RecoilRoot>
			<>
				<Component {...pageProps} />
				<GlobalPopup/>
			</>
		</RecoilRoot>
		</AuthContext>)
}

export default MyApp
