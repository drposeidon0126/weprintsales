import { useState, useEffect } from 'react';
import { CheckIcon, ChevronUpDownIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const priorityList = [
	{ id: 1, name: '1' },
	{ id: 2, name: '2' },
	{ id: 3, name: '3' },
	{ id: 4, name: '4' },
	{ id: 5, name: '5' },
	{ id: 6, name: '6' },
	{ id: 7, name: '7' },
	{ id: 8, name: '8' },
	{ id: 9, name: '9' },
	{ id: 10, name: '10' },
];

export function SelectWithSearch({ children, items, labelName, onChange, value, error, isStatus, disabled, ...rest }) {
	const [query, setQuery] = useState('');
	// const [selectedItem, setSelectedItem] = useState(items[0]);
	const [selectedItem, setSelectedItem] = useState({});
	const filteredItem =
		query === ''
			? items
			: items.filter(person => {
				return person.name.toLowerCase().includes(query.toLowerCase());
			});
	const onChangeMethod = item => {
		setSelectedItem(item);
		onChange(item);
	};

	useEffect(() => {
		items.map(item => {
			if (isStatus) {
				if (item.name === value) setSelectedItem(item);
			} else if (item.id === value) setSelectedItem(item);
		});
	}, [value]);

	return (
		<Combobox as='div' value={selectedItem} onChange={onChangeMethod} disabled={disabled}>
			<Combobox.Label className='block pt-1 text-sm font-medium text-gray-700'>{labelName}</Combobox.Label>
			<div className='relative mt-1'>
				<Combobox.Input
					className={classNames(
						'w-full disabled rounded-md border cursor-pointer bg-white py-2 pl-3 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm',
						error ? 'border-red-400' : 'border-gray-300'
					)}
					// readOnly
					disabled={disabled}
					// onChange={(event) => setQuery(event.target.value)}
					displayValue={person => person?.name}
				/>
				<Combobox.Button className='absolute z-50 inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none'>
					<ChevronUpDownIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
				</Combobox.Button>
				{filteredItem.length > 0 && (
					<Combobox.Options className='absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
						{filteredItem.map(item => (
							<Combobox.Option
								key={item.id}
								value={item}
								className={({ active }) =>
									classNames(
										'relative cursor-default select-none py-2 pl-3 pr-9',
										active ? 'bg-blue-600 text-white' : 'text-gray-900'
									)
								}
							>
								{({ active, selected }) => (
									<>
										<span className={classNames('block truncate', selected && 'font-semibold')}>{item.name}</span>

										{selected && (
											<span
												className={classNames(
													'absolute inset-y-0 right-0 flex items-center pr-4',
													active ? 'text-white' : 'text-blue-600'
												)}
											>
												<CheckIcon className='w-5 h-5' aria-hidden='true' />
											</span>
										)}
									</>
								)}
							</Combobox.Option>
						))}
					</Combobox.Options>
				)}
			</div>
			{error ? <span className='text-sm text-red-400'>required</span> : null}
		</Combobox>
	);
}

export function SelectCategory({ children, items, labelName, onChange, value, error, isStatus, disabled, ...rest }) {
	const [query, setQuery] = useState('');
	// const [selectedItem, setSelectedItem] = useState(items[0]);
	const [selectedItem, setSelectedItem] = useState({});

	const filteredItem =
		query === ''
			? items
			: items.filter(person => {
				return person.name.toLowerCase().includes(query.toLowerCase());
			});

	const onChangeMethod = item => {
		setSelectedItem(item);
		onChange(item);
	};

	useEffect(() => {
		if (value === 0) setSelectedItem({});
		items.map(item => {
			if (isStatus) {
				if (item.name === value) setSelectedItem(item);
			} else {
				if (item.id === value) setSelectedItem(item);
			}
		});
	}, [value]);

	return (
		<Combobox
			as='div'
			value={selectedItem}
			onChange={onChangeMethod}
		// disabled={disabled}
		>
			<Combobox.Label className='block text-sm font-medium text-gray-700'>{labelName}</Combobox.Label>
			<div className='relative mt-1'>
				<Combobox.Input
					className={classNames(
						'w-full rounded-md border bg-white py-2 pl-3 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm',
						error ? 'border-red-400' : 'border-gray-300'
					)}
					disabled={disabled}
					onChange={event => setQuery(event.target.value)}
					displayValue={person => person?.name}
				/>
				<Combobox.Button className='absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none'>
					<ChevronUpDownIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
				</Combobox.Button>

				{filteredItem.length > 0 && (
					<Combobox.Options className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
						{filteredItem.map(item => (
							<Combobox.Option
								key={item.id}
								value={item}
								className={({ active }) =>
									classNames(
										'relative cursor-default select-none py-2 pl-3 pr-9',
										active ? 'bg-blue-600 text-white' : 'text-gray-900'
									)
								}
							>
								{({ active, selected }) => (
									<>
										<span className={classNames('block truncate', selected && 'font-semibold')}>{item.name}</span>

										{selected && (
											<span
												className={classNames(
													'absolute inset-y-0 right-0 flex items-center pr-4',
													active ? 'text-white' : 'text-blue-600'
												)}
											>
												<CheckIcon className='w-5 h-5' aria-hidden='true' />
											</span>
										)}
									</>
								)}
							</Combobox.Option>
						))}
					</Combobox.Options>
				)}
			</div>
			{error ? <span className='text-sm text-red-400'>error</span> : null}
		</Combobox>
	);
}

export function SelectForPriority({ items, labelName, onChange, value, error, ...rest }) {

	return (
		<Combobox as='div' value={value.toString()} onChange={e => onChange(e)}>
			<div className='relative mt-1'>
				<Combobox.Label
					className={classNames(
						'w-full rounded-md border bg-white py-2 pl-3 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm',
						error ? 'border-red-400' : 'border-gray-300'
					)}
				>
					{value.toString()}{' '}
				</Combobox.Label>
				<Combobox.Button className='absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none'>
					<ChevronUpDownIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
				</Combobox.Button>

				{priorityList.length > 0 && (
					<Combobox.Options className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
						{priorityList.map(item => (
							<Combobox.Option
								key={item.id}
								value={item.name}
								className={({ active }) =>
									classNames(
										'relative cursor-default select-none py-2 pl-3 pr-9',
										active ? 'bg-blue-600 text-white' : 'text-gray-900'
									)
								}
							>
								{({ active, selected }) => (
									<>
										<span className={classNames('block ', selected && 'font-semibold')}>{item.name}</span>
										{selected && (
											<span
												className={classNames(
													'absolute inset-y-0 right-0 flex items-center pr-4',
													active ? 'text-white' : 'text-blue-600'
												)}
											>
												{/* <CheckIcon className="w-5 h-5" aria-hidden="true" /> */}
											</span>
										)}
									</>
								)}
							</Combobox.Option>
						))}
					</Combobox.Options>
				)}
			</div>
			{error ? <span className='text-sm text-red-400'> required</span> : null}
		</Combobox>
	);
}

export function SelectNoSearch({
	children,
	items,
	labelName,
	onChange,
	value,
	error,
	isStatus,
	disabled,
	isOrderStatus,
	...rest
}) {
	const [query, setQuery] = useState('');
	const [selectedItem, setSelectedItem] = useState(value);

	const onChangeMethod = item => {
		setSelectedItem(item);
		onChange(item);
	};

	useEffect(() => {
		items.map(item => {
			if (isStatus) {
				if (item.name === value) {
					setSelectedItem(item);
				}
			} else {
				if (item.id === value) {
					setSelectedItem(item);
				}
			}
		});
	}, [value]);
	return (
		<Combobox as='div' value={selectedItem} onChange={onChangeMethod} disabled={disabled}>
			<Combobox.Label className='block text-sm font-medium text-gray-700'>{labelName}</Combobox.Label>
			<div className='relative mt-1'>
				<Combobox.Input
					className={classNames(
						'w-full rounded-md border bg-white py-2 pl-3 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm',
						error ? 'border-red-400' : 'border-gray-300'
					)}
					readOnly={true}
					disabled={true}
					onChange={event => setQuery(event.target.value)}
					displayValue={person => person?.name}
				/>
				<Combobox.Button className='absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none'>
					<ChevronUpDownIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
				</Combobox.Button>

				{items && items.length > 0 && (
					<Combobox.Options className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
						{items.map(
							item =>
								item.name !== '' && (
									<Combobox.Option
										key={item.id}
										value={item}
										className={({ active }) =>
											classNames(
												'relative cursor-default select-none py-2 pl-3 pr-9',
												active ? 'bg-blue-600 text-white' : 'text-gray-900'
											)
										}
									>
										{item.name !== '' &&
											(({ active, selected }) => (
												<div className='flex items-center'>
													{isOrderStatus ? (
														<span
															className={`inline-block h-2 w-2 flex-shrink-0 rounded-full  mr-2 ${item.id === 0
																? 'bg-gray-400'
																: item.id < 3
																	? 'bg-red-400'
																	: item.id === 3
																		? 'bg-orange-400'
																		: item.id === 4 || item.id === 5
																			? 'bg-green-400'
																			: item.id === 6
																				? 'bg-green-400'
																				: 'bg-red-400'
																}`}
															aria-hidden='true'
														></span>
													) : null}
													<span className={classNames('block truncate', selected && 'font-semibold')}>{item.name}</span>
													{selected && (
														<span
															className={classNames(
																'absolute inset-y-0 right-0 flex items-center pr-4',
																active ? 'text-white' : 'text-blue-600'
															)}
														>
															<CheckIcon className='w-5 h-5' aria-hidden='true' />
														</span>
													)}
												</div>
											))}
									</Combobox.Option>
								)
						)}
					</Combobox.Options>
				)}
			</div>
			{error ? <span className='text-sm text-red-400'>required</span> : null}
		</Combobox>
	);
}

export function SelectPrimary({ items, onChange, value }) {
	return (
		<select
			value={value}
			onChange={onChange}
			className='block w-[50px] rounded-md border  py-[5px] pl-1 pr-2 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm bg-white'
		>
			{items.map(item => (
				<option key={item.id}>{item.name}</option>
			))}
		</select>
		//   <select
		//   id="location"
		//   name="location"
		//   className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
		//   defaultValue="Canada"
		// >
		//   <option>United States</option>
		//   <option>Canada</option>
		//   <option>Mexico</option>
		// </select>
	);
}

export function SelectQuantity({ onChange, value, color }) {
	const [activeColor, setActiveColor] = useState('');
	const onFocus = () => {
		setActiveColor(color);
	};

	const onBlur = () => {
		setActiveColor('#000000');
	};
	let menuItems = [];
	for (var i = 1; i < 10; i++) {
		menuItems.push(
			<option key={i} value={i}>
				{i}
			</option>
		);
	}
	menuItems.push(
		<option key={10} value={10}>
			10+
		</option>
	);
	return (
		<select
			value={value}
			onChange={onChange}
			onFocus={() => onFocus()}
			onBlur={() => onBlur()}
			style={{
				outlineColor: color,
				outlineOffset: '0px',
			}}
			className='block w-[70px] rounded-md border border-gray-300 py-[2px] pl-1 pr-2 text-base focus:outline-none sm:text-sm bg-white'
		>
			{menuItems}
		</select>
	);
}

export function SelectRole({ children, items, labelName, onChange, value, error, ...rest }) {
	const [query, setQuery] = useState('');
	const [selectedItem, setSelectedItem] = useState(value);

	const filteredItem =
		query === ''
			? items
			: items.filter(person => {
				return person.name.toLowerCase().includes(query.toLowerCase());
			});

	const onChangeMethod = item => {
		setSelectedItem(item);
		onChange(item);
	};

	useEffect(() => {
		items.map(item => {
			if (item.name === value) {
				setSelectedItem(item);
			}
		});
	}, [items]);

	return (
		<Combobox as='div' value={selectedItem} onChange={onChangeMethod}>
			<Combobox.Label className='block text-sm font-medium text-gray-700'>{labelName}</Combobox.Label>
			<div className='relative mt-1'>
				<Combobox.Input
					className={classNames(
						'w-full rounded-md border bg-white py-2 pl-3 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm',
						error ? 'border-red-400' : 'border-gray-300'
					)}
					onChange={event => setQuery(event.target.value)}
					displayValue={person => person?.name}
				/>
				<Combobox.Button className='absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none'>
					<ChevronUpDownIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
				</Combobox.Button>

				{filteredItem.length > 0 && (
					<Combobox.Options className='absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-40 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
						{filteredItem.map(item => (
							<Combobox.Option
								key={item.id}
								value={item}
								className={({ active }) =>
									classNames(
										'relative cursor-default select-none py-2 pl-3 pr-9',
										active ? 'bg-blue-600 text-white' : 'text-gray-900'
									)
								}
							>
								{({ active, selected }) => (
									<>
										<span className={classNames('block truncate', selected && 'font-semibold')}>{item.name}</span>

										{selected && (
											<span
												className={classNames(
													'absolute inset-y-0 right-0 flex items-center pr-4',
													active ? 'text-white' : 'text-blue-600'
												)}
											>
												<CheckIcon className='w-5 h-5' aria-hidden='true' />
											</span>
										)}
									</>
								)}
							</Combobox.Option>
						))}
					</Combobox.Options>
				)}
			</div>
			{error ? <span className='text-sm text-red-400'>required</span> : null}
		</Combobox>
	);
}

export function SelectNormal({ items, onChange, value }) {
	const [selected, setSelected] = useState(value);
	useEffect(() => {
		console.log(items);
	}, []);
	return (
		<Listbox value={selected} onChange={onChange}>
			{({ open }) => (
				<>
					<div className='relative mt-2'>
						<Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'>
							<span className='block truncate'>{value}</span>
							<span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
								<ChevronUpDownIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave='transition ease-in duration-100'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<Listbox.Options className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
								{items.length > 0 &&
									items.map((person, index) => (
										<Listbox.Option
											key={index}
											className={({ active }) =>
												classNames(
													active ? 'bg-indigo-600 text-white' : 'text-gray-900',
													'relative cursor-default select-none py-2 pl-3 pr-9'
												)
											}
											value={person}
										>
											{({ value, active }) => (
												<>
													<span className={classNames(value ? 'font-semibold' : 'font-normal', 'block truncate')}>
														{person.name}
													</span>

													{value ? (
														<span
															className={classNames(
																active ? 'text-white' : 'text-indigo-600',
																'absolute inset-y-0 right-0 flex items-center pr-4'
															)}
														>
															<CheckIcon className='w-5 h-5' aria-hidden='true' />
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
}

const people = [
	{ id: 1, name: 'Wade Cooper' },
	{ id: 2, name: 'Arlene Mccoy' },
	{ id: 3, name: 'Devon Webb' },
	{ id: 4, name: 'Tom Cook' },
	{ id: 5, name: 'Tanya Fox' },
	{ id: 6, name: 'Hellen Schmidt' },
	{ id: 7, name: 'Caroline Schultz' },
	{ id: 8, name: 'Mason Heaney' },
	{ id: 9, name: 'Claudie Smitham' },
	{ id: 10, name: 'Emil Schaefer' },
];

export function FilterSelect({ items, onChange, value, ...rest }) {
	return (
		<Combobox as='div' value={value.toString()} onChange={e => onChange(e)} className='h-full'>
			<div className='relative h-full'>
				<Combobox.Input
					className={classNames(
						'relative -ml-px  w-[112px] inline-flex items-center rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 h-full'
					)}
					placeholder='Filter'
				/>
				<Combobox.Button className='absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none'>
					<ChevronDownIcon className='ml-2.5 -mr-1.5 h-5 w-5 text-gray-400' aria-hidden='true' />
				</Combobox.Button>

				{/* {items.length > 0 && ( */}
				<Combobox.Options className='absolute z-10 mt-1 max-h-60 w-[112px] overflow-auto rounded-r-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
					{items.map(item => (
						<Combobox.Option
							key={item.id}
							value={item.name}
							className={({ active }) =>
								classNames(
									'relative cursor-default select-none py-2 pl-3 pr-9',
									active ? 'bg-blue-600 text-white' : 'text-gray-900'
								)
							}
						>
							{({ active, selected }) => (
								<>
									<span className={classNames('block truncate', selected && 'font-semibold')}>{item.name}</span>

									{selected && (
										<span
											className={classNames(
												'absolute inset-y-0 right-0 flex items-center pr-4',
												active ? 'text-white' : 'text-blue-600'
											)}
										>
											<CheckIcon className='w-5 h-5' aria-hidden='true' />
										</span>
									)}
								</>
							)}
						</Combobox.Option>
					))}
				</Combobox.Options>
				{/* )} */}
			</div>
		</Combobox>
	);
}

export function SelectMenu({ items, onChange, value, ...rest }) {
	let selectedItem = items.filter(i => i.name === value)[0];
	if (!selectedItem) selectedItem = {};

	return (
		<Listbox value={selectedItem} onChange={e => onChange(e.name)} className='h-full' as='div'>
			{({ open }) => (
				<div className='relative h-full'>
					<Listbox.Button className='relative -ml-px w-[120px] inline-flex items-center rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 h-full'>
						<span className='block truncate'>{selectedItem.name}</span>
						<span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
							<ChevronUpDownIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
						</span>
					</Listbox.Button>

					<Transition
						show={open}
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Listbox.Options className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-60 rounded-r-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
							{items.map(item => (
								<Listbox.Option
									key={item.id}
									className={({ active }) =>
										classNames(
											active ? 'bg-blue-500 text-white' : 'text-gray-900',
											'relative cursor-default select-none py-2 pl-3 pr-9'
										)
									}
									value={item}
								>
									{({ selected, active }) => (
										<>
											<span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
												{item.name}
											</span>

											{selected ? (
												<span
													className={classNames(
														active ? 'text-white' : 'text-blue-500',
														'absolute inset-y-0 right-0 flex items-center pr-4'
													)}
												>
													<CheckIcon className='w-5 h-5' aria-hidden='true' />
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			)}
		</Listbox>
	);
}

export function SelectSearchMenu({ children, items, labelName, onChange, value, error, isStatus, disabled, ...rest }) {
	const { t } = useTranslation();
	let selectedItem = isStatus ? items.filter(i => i.name === value)[0] : items.filter(i => i.id === value)[0];
	if (!selectedItem) selectedItem = {};

	return (
		<>
			<div className=''>
				<span className='text-sm font-medium text-gray-700'>{labelName}</span>
			</div>
			<Listbox value={selectedItem} onChange={onChange} className='pt-1' as='div'>
				{({ open }) => (
					<div className='relative h-full'>
						<Listbox.Button className='relative -ml-px w-full inline-flex items-center rounded-md border h-[42px] border-gray-300 px-2 py-2 text-gray-900 hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'>
							<span className='block truncate'>{selectedItem.name}</span>
							<span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
								<ChevronUpDownIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave='transition ease-in duration-100'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<Listbox.Options className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
								{items.map(item => (
									<Listbox.Option
										key={item.id}
										className={({ active }) =>
											classNames(
												active ? 'bg-blue-500 text-white' : 'text-gray-900',
												'relative cursor-default select-none py-2 pl-3 pr-9'
											)
										}
										value={item}
									>
										{({ selected, active }) => (
											<>
												<span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
													{item.name}
												</span>

												{selected ? (
													<span
														className={classNames(
															active ? 'text-white' : 'text-blue-500',
															'absolute inset-y-0 right-0 flex items-center pr-4'
														)}
													>
														<CheckIcon className='w-5 h-5' aria-hidden='true' />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				)}
			</Listbox>
			{error && <span className='text-sm text-red-400'>required</span>}
		</>
	);
}
