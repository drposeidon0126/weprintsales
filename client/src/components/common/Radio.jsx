import { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, HomeIcon, BanknotesIcon } from '@heroicons/react/20/solid';
import { AiFillPropertySafety } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}
export default function Radio({ items, value, onChange }) {
	const { t } = useTranslation();
	return (
		<div>
			<label className='text-base font-medium text-gray-900'>{t('admin.countries.status')}</label>
			<fieldset className='mt-2'>
				<div className='space-y-4'>
					{items.map(item => (
						<div key={item.id} className='flex items-center'>
							<input
								id={item.id}
								name='notification-method'
								type='radio'
								value={item.name}
								onChange={onChange}
								checked={item.name === value}
								className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500'
							/>
							<label htmlFor={item.id} className='ml-3 block text-sm font-medium text-gray-700'>
								{t(`admin.status.${item.name.toLowerCase().replace(' ', '_')}`)}
							</label>
						</div>
					))}
				</div>
			</fieldset>
		</div>
	);
}

export function RadioHorizontal({ label, items, value, onChange, onClick, activeColor, error, loading }) {
	const { t } = useTranslation();
	return (
		<RadioGroup value={value} onChange={onChange}>
			<div className='mt-1 -space-y-px grid grid-cols-1 '>
				{items.map((item, index) => (
					<RadioGroup.Option
						key={item.id}
						value={item}
						// style={{
						//   borderColor: activeColor,
						// }}
						className={({ checked, active }) =>
							classNames(
								index === 0 ? 'rounded-tl-md rounded-tr-md' : '',
								index === items.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
								checked ? 'border-transparent z-10 ' : 'border-gray-300',
								active ? 'z-10 ' : '',
								'relative flex cursor-pointer border-[1px] bg-white p-2 shadow-sm focus:outline-none outline-none'
							)
						}
					>
						{({ checked, active }) => (
							<>
								<span className='flex flex-1 justify-between items-center' onClick={() => onClick(item.id)}>
									<span className='flex flex-col'>
										<RadioGroup.Label as='span' className='block text-sm font-medium text-gray-900'>
											{item.title}
										</RadioGroup.Label>
										<RadioGroup.Description as='span' className=' flex items-center text-sm text-gray-500'>
											{item.description}
										</RadioGroup.Description>
									</span>
									{item.is_verified === 0 ?
										<span className='flex flex-col mr-5'>
											<span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-blue ring-blue-600/20">
												{t('checkout.unverified')}
											</span>
										</span> :
										item.is_verified === 1 ?
											<span className='flex flex-col mr-5'>
												<span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
													{t('checkout.verified')}
												</span>
											</span> : null}
								</span>
								{item.id === 0 ? null : (
									<CheckCircleIcon
										style={{
											color: error && index === items.length - 1 ? 'rgb(248 113 113)' : activeColor,
										}}
										className={classNames(!checked ? 'invisible' : '', 'h-5 w-5')}
										aria-hidden='true'
									/>
								)}
								<span
									style={{
										borderColor: checked
											? error && index === items.length - 1
												? 'rgb(248 113 113)'
												: items.length === 1
													? 'rgb(248 0 0)'
													: activeColor
											: null,
									}}
									className={classNames(
										index === 0 ? 'rounded-tl-md rounded-tr-md' : '',
										index === items.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
										active ? 'z-10 border-[1px]' : 'border-[1px]',
										// checked ? 'border-blue-500' : 'border-transparent',
										'pointer-events-none absolute -inset-px '
									)}
									aria-hidden='true'
								/>
							</>
						)}
					</RadioGroup.Option>
				))}
			</div>
		</RadioGroup>
		// <div className='w-full flex justify-center'>
		//   <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
		//     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
		//     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
		//   </svg>
		// </div>
	);
}

export function RadioVertical({ items, value, setSelected, activeColor }) {
	useEffect(() => {
		console.log(value);
	}, []);
	return (
		<RadioGroup value={value} onChange={setSelected}>
			<RadioGroup.Label className='sr-only'> Pricing items </RadioGroup.Label>
			<div className='relative -space-y-px rounded-md bg-white'>
				{items &&
					items.map((item, itemIdx) => (
						<RadioGroup.Option
							key={item.name}
							value={item}
							style={{
								borderColor: item.id === value.id ? activeColor : '',
							}}
							className={({ checked }) =>
								classNames(
									itemIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
									itemIdx === items.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
									checked ? 'z-10 border-indigo-200 bg-indigo-50' : 'border-gray-200',
									'relative flex cursor-pointer border-[1px] bg-white p-2 shadow-sm focus:outline-none outline-none'
								)
							}
						>
							{({ active, checked }) => (
								<>
									<span className='flex items-center text-sm'>
										<span
											style={{
												background: item.id === value.id ? activeColor : '',
											}}
											className={classNames(
												item.id === value.id ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
												// active ? 'ring-2 ring-offset-2 ring-indigo-600' : '',
												'h-4 w-4 rounded-full border flex items-center justify-center'
											)}
											aria-hidden='true'
										>
											<span className='rounded-full bg-white w-1.5 h-1.5' />
										</span>
										<RadioGroup.Label
											as='span'
											// style={{
											//   color: item.id === value.id? activeColor:'',
											// }}
											className={classNames(
												item.id === value.id ? 'text-indigo-900' : 'text-gray-900',
												'ml-3 font-medium'
											)}
										>
											{item.name}
										</RadioGroup.Label>
									</span>
								</>
							)}
						</RadioGroup.Option>
					))}
			</div>
		</RadioGroup>
	);
}

export function RadioButton({ items, value, setSelected, activeColor, minDeliveryPrice, currencySymbol, allOutFlag }) {
	const { t } = useTranslation();

	return (
		<div>
			{/* <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium leading-6 text-gray-900">RAM</h2>
          <a href="#" className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500">
            See performance specs
          </a>
        </div> */}

			<RadioGroup value={value} onChange={setSelected} className='mt-2 cursor-pointer'>
				<RadioGroup.Label className='sr-only'> Choose a memory option </RadioGroup.Label>
				<div className='flex'>
					{items &&
						items.map((option, itemIdx) => (
							<RadioGroup.Option
								key={option.name}
								value={option}
								style={{
									background: option.id === value.id ? activeColor : '',
								}}
								className={({ active, checked }) =>
									classNames(
										//allOutFlag && itemIdx === 0 ? 'opacity-50' : '',
										//active ? 'ring-2 ring-indigo-600 ring-offset-2' : '',
										itemIdx === 0 ? 'rounded-tl-md rounded-bl-md' : '',
										itemIdx === items.length - 1 ? 'rounded-tr-md rounded-br-md' : '',
										option.id === value.id ? 'text-white ' : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 ',
										'flex items-center justify-center  py-2 px-3 text-sm font-semibold sm:flex-1'
									)
								}
							>
								<RadioGroup.Label as='span' className={'flex items-center'}>
									{option.name === t('checkout.delivery') ? (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className={`w-[18px] h-[18px] opacity-50 mr-1 ${option.id === value.id ? 'text-white' : 'text-gray-900'
												}`}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
											/>
										</svg>
									) : (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className={`w-[18px] h-[18px]  opacity-50 mr-1 ${option.id === value.id ? 'text-white' : 'text-gray-900'
												}`}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z'
											/>
										</svg>
									)}
									<span style={{ paddingLeft: '6px' }}>
										{option.name} {option.name === t('checkout.delivery') && minDeliveryPrice > 0 ? currencySymbol + minDeliveryPrice : ''}
									</span>
								</RadioGroup.Label>
							</RadioGroup.Option>
						))}
				</div>
			</RadioGroup>
		</div>
	);
}

export function CustomIconRadioButton({ items, value, setSelected, activeColor }) {
	const { t } = useTranslation();

	const getIconByName = iconStr => {
		switch (iconStr) {
			case '':
				return '';
			case 'banknotes':
				return (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z'
						/>
					</svg>
				);
			case 'document-check':
				return (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12'
						/>
					</svg>
				);

			default:
				return (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className={`w-[18px] h-[18px] opacity-50 mr-1 ${option.id === value.id ? 'text-white' : 'text-gray-900'}`}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
						/>
					</svg>
				);
		}
	};

	return (
		<div>
			<RadioGroup value={value} onChange={setSelected} className='mt-2 cursor-pointer'>
				<RadioGroup.Label className='sr-only'> Choose a memory option </RadioGroup.Label>
				<div className='flex'>
					{items &&
						items.map((option, itemIdx) => (
							<RadioGroup.Option
								key={option.name}
								value={option}
								style={{
									background: option.id === value.id ? activeColor : '',
								}}
								className={({ active, checked }) =>
									classNames(
										//active ? 'ring-2 ring-indigo-600 ring-offset-2' : '',
										itemIdx === 0 ? 'rounded-tl-md rounded-bl-md' : '',
										itemIdx === items.length - 1 ? 'rounded-tr-md rounded-br-md' : '',
										option.id === value.id ? 'text-white ' : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 ',
										'flex items-center justify-center py-2 px-2  md:py-2 md:px-3 text-sm font-semibold sm:flex-1'
									)
								}
							>
								<RadioGroup.Label as='span' className={'flex items-center'}>
									{getIconByName(option.icon)}
									<span style={{ paddingLeft: '2px' }}>{option.name}</span>
								</RadioGroup.Label>
							</RadioGroup.Option>
						))}
				</div>
			</RadioGroup>
		</div>
	);
}
