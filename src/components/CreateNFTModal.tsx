import axios from 'axios'
import blockies from 'ethereum-blockies'
import { ethers } from 'ethers'
import FormData from 'form-data'
import React, { useState } from 'react'
import '../styles/CreateNFTModal.css'
import { peerToPeerAbi, peerToPeerContractAddress, electoTokenAbi, electoTokenAddress } from '../config.js'

interface CreateNFTModalProps {
	userAddress: string | null
	onHide: () => void
}

interface FormErrors {
	title?: string
	description?: string
	price?: string
	quantity?: string
	imageFile?: string
	biddingDeadline?: string
}

const CreateNFTModal: React.FC<CreateNFTModalProps> = ({
	userAddress,
	onHide,
}) => {
	const [title, setTitle] = useState('')
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [quantity, setQuantity] = useState('1')
	const [biddingDeadline, setBiddingDeadline] = useState(() => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return tomorrow.toISOString().split('T')[0];
	})
	const [contract, setContract] = useState<ethers.Contract | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState<FormErrors>({})

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			
			// Validate file type
			if (!file.type.startsWith('image/')) {
				setErrors({ ...errors, imageFile: 'Please select a valid image file' });
				return;
			}
			
			// Validate file size (max 5MB)
			if (file.size > 5 * 1024 * 1024) {
				setErrors({ ...errors, imageFile: 'Image size must be less than 5MB' });
				return;
			}
			
			setImageFile(file);
			
			// Create preview
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
			
			setErrors({ ...errors, imageFile: undefined });
		}
	}

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		if (!title.trim()) {
			newErrors.title = 'Title is required';
		} else if (title.length < 3) {
			newErrors.title = 'Title must be at least 3 characters';
		} else if (title.length > 100) {
			newErrors.title = 'Title must be less than 100 characters';
		}

		if (!description.trim()) {
			newErrors.description = 'Description is required';
		} else if (description.length < 10) {
			newErrors.description = 'Description must be at least 10 characters';
		} else if (description.length > 500) {
			newErrors.description = 'Description must be less than 500 characters';
		}

		if (!price) {
			newErrors.price = 'Price is required';
		} else {
			const priceNum = parseFloat(price);
			if (isNaN(priceNum) || priceNum <= 0) {
				newErrors.price = 'Price must be a positive number';
			} else if (priceNum > 1000000) {
				newErrors.price = 'Price is too high (max: 1,000,000)';
			}
		}

		if (!quantity) {
			newErrors.quantity = 'Quantity is required';
		} else {
			const quantityNum = parseInt(quantity);
			if (isNaN(quantityNum) || quantityNum <= 0) {
				newErrors.quantity = 'Quantity must be a positive number';
			} else if (quantityNum > 1000000) {
				newErrors.quantity = 'Quantity is too high';
			}
		}

		if (!imageFile) {
			newErrors.imageFile = 'Please select an offer banner image';
		}

		const deadlineDate = new Date(biddingDeadline);
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		if (deadlineDate <= today) {
			newErrors.biddingDeadline = 'Deadline must be in the future';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('UserAddress: ', userAddress);

		if (!userAddress) {
			setErrors({ ...errors, title: 'Please connect your wallet first' });
			return;
		}

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);

		try {
			const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

			if (!user._id) {
				throw new Error('User not logged in. Please login first.');
			}

			const metaData = {
				userId: user._id,
				title: title.trim(),
				description: description.trim(),
				price: parseFloat(price),
				quantity: parseInt(quantity),
				biddingDeadline: new Date(biddingDeadline).getTime(),
				image: imagePreview || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv67UsH9iB1Bj63sP_Otq2T2fM7EkOquHyaw&s"
			};

			console.log('Meta Data:', metaData);

			const response = await axios.post('http://localhost:5173/api/v1/trade/post', metaData, {
				headers: {
					'Content-Type': 'application/json',
					'withCredentials': true
				},
			});
			console.log('Response:', response);

			// On blockchain
			console.log('Now deploying in blockchain:');
			if (peerToPeerAbi && peerToPeerContractAddress && typeof window.ethereum !== 'undefined') {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner();
				const thisContract = new ethers.Contract(peerToPeerContractAddress, peerToPeerAbi, signer);
				console.log('Contract:', thisContract);
				
				const quantityInt = parseInt(quantity);
				const priceInt = parseInt(price);
				
				const tx = await thisContract.createTrade(quantityInt, priceInt, 25);
				const receipt = await tx.wait();
				
				console.log('Transaction receipt:', receipt);
				alert('Offer created and uploaded successfully!');
				
				onHide();
				// Reset form
				setTitle('');
				setDescription('');
				setPrice('');
				setQuantity('1');
				setImageFile(null);
				setImagePreview(null);
				setBiddingDeadline(() => {
					const tomorrow = new Date();
					tomorrow.setDate(tomorrow.getDate() + 1);
					return tomorrow.toISOString().split('T')[0];
				});
				setErrors({});
			} else {
				throw new Error('Ethereum not available. Please install MetaMask.');
			}
		} catch (error) {
			console.error('Error while creating offer:', error);
			const errorMessage = error instanceof Error ? error.message : 'Error during offer creation. Check the console for more information.';
			setErrors({ ...errors, title: errorMessage });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='create-nft-modal'>
			<div className='modal-overlay' onClick={onHide} />
			<div className='modal-content'>
				<button 
					className='close-modal' 
					onClick={onHide}
					disabled={isLoading}
				>
					&times;
				</button>
				<h2>Create New Energy Offer</h2>
				
				<form onSubmit={handleSubmit}>
					{/* User Address */}
					<div className='form-group'>
						<label htmlFor='userAddress'>Your Wallet Address:</label>
						<input
							type='text'
							id='userAddress'
							value={userAddress || ''}
							readOnly
							placeholder='Connect your wallet'
						/>
					</div>

					{/* Title */}
					<div className='form-group'>
						<label htmlFor='nftTitle'>
							Offer Title
							<span className='char-count'>{title.length}/100</span>
						</label>
						<input
							type='text'
							id='nftTitle'
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);
								setErrors({ ...errors, title: undefined });
							}}
							placeholder='e.g., Solar Energy - 500 kWh'
							maxLength={100}
							disabled={isLoading}
						/>
						{errors.title && <span className='error-message'>{errors.title}</span>}
					</div>

					{/* Description */}
					<div className='form-group'>
						<label htmlFor='nftDescription'>
							Description
							<span className='char-count'>{description.length}/500</span>
						</label>
						<textarea
							id='nftDescription'
							value={description}
							onChange={(e) => {
								setDescription(e.target.value);
								setErrors({ ...errors, description: undefined });
							}}
							placeholder='Describe your energy offer, source, and any special features...'
							maxLength={500}
							disabled={isLoading}
							rows={4}
						/>
						{errors.description && <span className='error-message'>{errors.description}</span>}
					</div>

					{/* Price and Quantity Row */}
					<div className='form-row'>
						<div className='form-group flex-1'>
							<label htmlFor='nftPrice'>Energy Price per Unit (USD):</label>
							<input
								type='number'
								id='nftPrice'
								value={price}
								onChange={(e) => {
									setPrice(e.target.value);
									setErrors({ ...errors, price: undefined });
								}}
								placeholder='0.00'
								step='0.01'
								min='0'
								disabled={isLoading}
							/>
							{errors.price && <span className='error-message'>{errors.price}</span>}
						</div>

						<div className='form-group flex-1'>
							<label htmlFor='nftQuantity'>Quantity (Units):</label>
							<input
								type='number'
								id='nftQuantity'
								value={quantity}
								onChange={(e) => {
									setQuantity(e.target.value);
									setErrors({ ...errors, quantity: undefined });
								}}
								placeholder='1'
								min='1'
								step='1'
								disabled={isLoading}
							/>
							{errors.quantity && <span className='error-message'>{errors.quantity}</span>}
						</div>
					</div>

					{/* Image Upload with Preview */}
					<div className='form-group'>
						<label htmlFor='nftImage'>Offer Banner Image:</label>
						<div className='image-upload-wrapper'>
							<input
								type='file'
								id='nftImage'
								onChange={handleImageChange}
								accept='image/*'
								disabled={isLoading}
							/>
							{imagePreview && (
								<div className='image-preview'>
									<img src={imagePreview} alt='Offer preview' />
									<span className='image-preview-label'>Preview</span>
								</div>
							)}
						</div>
						{errors.imageFile && <span className='error-message'>{errors.imageFile}</span>}
					</div>

					{/* Bidding Deadline */}
					<div className='form-group'>
						<label htmlFor='nftBiddingDeadline'>Bidding Deadline:</label>
						<input
							type='date'
							id='nftBiddingDeadline'
							value={biddingDeadline}
							onChange={(e) => {
								setBiddingDeadline(e.target.value);
								setErrors({ ...errors, biddingDeadline: undefined });
							}}
							disabled={isLoading}
						/>
						{errors.biddingDeadline && <span className='error-message'>{errors.biddingDeadline}</span>}
					</div>

					{/* General Error Display */}
					{errors.title && !title && (
						<div className='form-alert alert-error'>
							{errors.title}
						</div>
					)}

					{/* Form Actions */}
					<div className='form-actions'>
						<button 
							type='submit' 
							className='submit-btn'
							disabled={isLoading}
						>
							{isLoading ? 'Creating Offer...' : 'Create Offer'}
						</button>
						<button 
							type='button' 
							className='cancel-btn'
							onClick={onHide}
							disabled={isLoading}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreateNFTModal
