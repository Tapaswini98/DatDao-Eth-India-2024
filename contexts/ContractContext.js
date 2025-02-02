import { providers, Contract } from 'ethers'
import { contractAddress, contractAbi } from 'contracts/contractDetails'
import { createContext, useContext, useEffect, useState } from 'react'

const ContractContext = createContext()

export const ContractContextProvider = ({ children }) => {
	const [data, setData] = useState({})
	// const [tokenAddress, setTokenAddress] = useState()

	useEffect(() => {
		// if (window) {
		const provider = new providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		const marketplace = new Contract(contractAddress, contractAbi, signer)
		setData({
			...data,
			marketplace: marketplace,
		})
	}, [])

	return (
		<>
			<ContractContext.Provider value={{ ...data }}>
				{children}
			</ContractContext.Provider>
		</>
	)
}

export const useContract = () => useContext(ContractContext)
