import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../App'
//hooks
import { handleCreateStore } from '../../../Hooks/Create/handleCreateStore'
import MultiPageForm from '../../../Hooks/MultiPageForm'
import LoadingScreen from '../../Loading/LoadingScreen'
//steps
import DeliveryAndBooking from './steps/DeliveryAndBooking'
import LogoAndBanner from './steps/LogoAndBanner'
import Name from './steps/Name'
import StoreID from './steps/StoreID'
import Theme from './steps/Theme'

function NewStorePage() {
	//
	const user = useContext(UserContext)
	const navigateTo = useNavigate()

	//loading
	const [isLoading, setLoading] = useState(false)

	//change when storeid is final ONLY (after available)
	const [finalStoreid, setFinalStoreid] = useState(null)

	//new store object
	const [newStore, setStoreConfig] = useState({
		ownerID: user?.uid,
		name: '',
		slogan: '',
		logoFile: null,
		bannerFile: null,
		acceptPickup: false,
		acceptDelivery: false,
		requireBooking: false,
		theme: null,
	})
	const storeConfigElements = [
		<Theme newStore={newStore} setStoreConfig={setStoreConfig} />,
		<Name newStore={newStore} setStoreConfig={setStoreConfig} />,
		<LogoAndBanner newStore={newStore} setStoreConfig={setStoreConfig} />,
		<DeliveryAndBooking newStore={newStore} setStoreConfig={setStoreConfig} />,
	]

	return (
		<>
			{isLoading && <LoadingScreen label={'Creating Store...'} />}
			<h1>Create New Store</h1>

			{finalStoreid ? (
				<MultiPageForm
					elements={storeConfigElements}
					submitFunction={() => {
						setLoading(true)
						handleCreateStore(finalStoreid, newStore).then(() => {
							setLoading(false)
							navigateTo('/console')
						})
					}}
				/>
			) : (
				<StoreID setFinalStoreid={setFinalStoreid} />
			)}
		</>
	)
}

export default NewStorePage
