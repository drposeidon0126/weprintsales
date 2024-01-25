import React from 'react';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Input({
	id,
	labelName,
	type,
	onChange,
	onBlur,
	onKeyPress,
	value,
	error,
	errorMessage,
	maxLength,
	disabled,
	placeholder,
	autocomplete,
	name,
	...rest
}) {
	return (
		<div>
			<label htmlFor={id} className='block text-sm font-medium text-gray-700'>
				{labelName}
			</label>
			<div className='mt-1'>
				<input
					onChange={onChange}
					onBlur={onBlur}
					onKeyPress={onKeyPress}
					defaultValue={value}
					error={error ? 'this field is required' : ''}
					maxLength={maxLength}
					type={type ? type : 'text'}
					id={id}
					name={name}
					autoComplete={autocomplete}
					className={classNames(
						'rounded-md shadow-sm sm:text-sm focus:bg-transparent border-[1px] border-gray-300 text-black focus-visible:border-[2px] focus-visible:border-blue-500 focus-visible:ring-blue-500 focus-visible:outline-none block p-2 pl-[7px] h-[38px] w-full',
						error ? 'border-red-400' : 'border-gray-300'
					)}
					placeholder={placeholder}
					disabled={disabled && true}
				/>
				{error ? (
					<span className='text-sm text-red-400'>{errorMessage ? errorMessage : 'This field is required.'}</span>
				) : null}
			</div>
		</div>
	);
}

export function InputWithoutLabel({ placeholder, type, onChange, value, error, maxLength, disabled, ...rest }) {
	return (
		<div>
			<div className=''>
				<input
					onChange={onChange}
					value={value}
					error={error ? 'this field is required' : ''}
					maxLength={maxLength}
					type={type ? type : 'text'}
					autoComplete='street-address'
					placeholder={placeholder}
					className={classNames(
						'rounded-md shadow-sm sm:text-sm focus:bg-transparent border-[1px] border-gray-300 text-black focus-visible:border-[2px] focus-visible:border-blue-500 focus-visible:ring-blue-500 focus-visible:outline-none block p-2 pl-[7px] h-[38px] w-full',
						error ? 'border-red-400' : 'border-gray-300'
					)}
					disabled={disabled && true}
				/>
				{error ? <span className='text-sm text-red-400'>This field is required.</span> : null}
			</div>
		</div>
	);
}

export function TextArea({
	id,
	labelName,
	onChange,
	onBlur,
	onKeyPress,
	value,
	error,
	errorMessage,
	maxLength,
	disabled,
	placeholder,
	autocomplete,
	name,
	rows,
	...rest
}) {
	return (
		<div>
			<label htmlFor={id} className='block text-sm font-medium text-gray-700'>
				{labelName}
			</label>
			<div className='mt-2'>
				<textarea
					onChange={onChange}
					onBlur={onBlur}
					onKeyPress={onKeyPress}
					defaultValue={value}
					error={error ? 'this field is required' : ''}
					maxLength={maxLength}
					id={id}
					name={name}
					rows={rows || 3}
					autoComplete={autocomplete}
					className={classNames(
						'rounded-md shadow-sm sm:text-sm focus:bg-transparent border-[1px] border-gray-300 text-black focus-visible:border-[2px] focus-visible:border-blue-500 focus-visible:ring-blue-500 focus-visible:outline-none block p-2 pl-[7px] min-h-[42px] w-full',
						error ? 'border-red-400' : 'border-gray-300'
					)}
					placeholder={placeholder}
					disabled={disabled && true}
				/>
				{error ? (
					<span className='text-sm text-red-400'>{errorMessage ? errorMessage : 'This field is required.'}</span>
				) : null}
			</div>
		</div>
	);
}
