import React, { useState } from "react"
import { VoteSecurity } from "../types"
import moment from "moment"

type Form = {
	title: string,
	options: string[],
	multiple_choice: boolean,
	allow_comment: boolean,
	end_date?: string | null,
	vote_security: VoteSecurity,
	require_voter_name: boolean,
}

function PollingCard() {
	const [multipleOptionToggle, setMultipleOptionToggle] = useState(false)
	const [allowCommentToggle, setAllowCommentToggle] = useState(false)
	const [scheduleToggle, setScheduleToggle] = useState(false)

	const [title, setTitle] = useState('');
	const [scheduleDate, setScheduleDate] = useState("")
	const [requireName, setRequireName] = useState(false)
	const [voteSecurity, setVoteSecurity] = useState<VoteSecurity>()
	const [options, setOptions] = useState([""])


	// ====================================================== //

	const submitForm =  async () => {
		const data: Form = {
			title: title,
			options: options,
			multiple_choice: multipleOptionToggle,
			allow_comment: allowCommentToggle,
			end_date: scheduleDate ? moment(scheduleDate).format('YYYY-MM-DD') : null,
			vote_security: voteSecurity as VoteSecurity,
			require_voter_name: requireName
		}

		const res = await fetch('/api/poll/create', {
			method: 'POST',
			body: JSON.stringify(data)
		})

		const result = await res.json()

		if(result.errors) {
		}

	}

	const handleAddOption = () => {
		setOptions([...options, ``])
	}

	const handleRemoveOption = (index: number) => {
		setOptions(options.filter((_, i) => i !== index))
	}

	const handleOptionChange = (index: number, newValue: string) => {
		const newOptions = [...options]
		newOptions[index] = newValue
		setOptions(newOptions)
	}

	const toggleMultipleOptionSwitch = () =>
		setMultipleOptionToggle(!multipleOptionToggle)
	const toggleAllowCommentSwitch = () =>
		setAllowCommentToggle(!allowCommentToggle)
	const toggleScheduleSwitch = () => setScheduleToggle(!scheduleToggle)
	const onChangeScheduleDate = (e: any) => setScheduleDate(e.target.value)
	const toggleRequireNameSwitch = () => setRequireName(!requireName)
	const handleTitleOnChange = (e: any) => setTitle(e.target.value) 
	const handleVoteSecurityOnChange = (e: any) => setVoteSecurity(e.target.value)

	return (
		<div className="flex w-full lg:w-[50%] rounded overflow-hidden shadow-lg bg-[#393E46] px-8 py-8">
			<div className="flex w-full flex-col gap-6">
				<div className="flex flex-col w-full">
					<label className="tracking-wider text-sm mb-1 block font-bold text-white">
						Title
					</label>
					<input
						value={title}
						type="text"
						placeholder="Type here..."
						className="w-full p-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						onChange={handleTitleOnChange}
					/>
				</div>
				<div className="flex flex-col w-full gap-2">
					<label className="tracking-wider text-sm mb-1 block font-bold text-white">
						Options
					</label>
					{options.map((option, index) => (
						<div key={index} className="relative">
							<input
								type="text"
								value={option}
								placeholder={"Option " + (index + 1)}
								onChange={(e) => handleOptionChange(index, e.target.value)}
								className="w-full p-2 pr-10 bg-gray-800 text-gray-300 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							{options.length > 1 ? (
								<button
									onClick={() => handleRemoveOption(index)}
									className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 transition"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="size-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18 18 6M6 6l12 12"
										/>
									</svg>
								</button>
							) : (
								<></>
							)}
						</div>
					))}
				</div>
				<div className="flex items-center space-x-2">
					<button
						onClick={() => handleAddOption()}
						className="flex items-center px-3 py-2 bg-blue-500 text-gray-200 rounded-md hover:bg-gray-600 transition font-semibold text-base"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="3"
							stroke="currentColor"
							className="size-4 mr-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
						Add option
					</button>
				</div>
				<div className="flex flex-col pt-3 pb-8 w-full">
					<div className="pb-10">
						<span className="relative flex justify-center">
							<div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

							<span className="relative z-10 bg-[#393E46] px-6">Settings</span>
						</span>
					</div>
					<div className="flex flex-col md:flex-row gap-4 md:gap-0">
						<div className="flex flex-col gap-4 w-full md:w-1/2 md:pr-8">
							<div className="flex items-center justify-between">
								<span className="text-gray-200">
									Allow select multiple options
								</span>
								<div
									onClick={toggleMultipleOptionSwitch}
									className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${multipleOptionToggle ? "bg-blue-500" : "bg-gray-500"
										}`}
								>
									<div
										className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${multipleOptionToggle ? "translate-x-6" : "translate-x-0"
											}`}
									></div>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-200 text-base font-medium">
									Allow comment
								</span>
								<div
									onClick={toggleAllowCommentSwitch}
									className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${allowCommentToggle ? "bg-blue-500" : "bg-gray-500"
										}`}
								>
									<div
										className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${allowCommentToggle ? "translate-x-6" : "translate-x-0"
											}`}
									></div>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-200 text-base font-medium">
									Close poll with schedule date
								</span>
								<div
									onClick={toggleScheduleSwitch}
									className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${scheduleToggle ? "bg-blue-500" : "bg-gray-500"
										}`}
								>
									<div
										className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${scheduleToggle ? "translate-x-6" : "translate-x-0"
											}`}
									></div>
								</div>
							</div>
							{scheduleToggle ? (
								<div className="w-full flex">
									<input
										type="datetime-local"
										name="date"
										value={scheduleDate}
										onChange={onChangeScheduleDate}
										id="close_date"
										className='w-full px-2 py-[0.35rem] bg-gray-800 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"'
									/>
								</div>
							) : (
								<></>
							)}
						</div>

						<div className="w-[0.1px] h-full bg-gray-300"></div>
						
						<div className="flex flex-col gap-4 w-full md:w-1/2 md:pl-8">
							<div className="flex items-center justify-between">
								<span className="text-gray-200">
									Require participant name
								</span>
								<div
									onClick={toggleRequireNameSwitch}
									className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${requireName ? "bg-blue-500" : "bg-gray-500"
										}`}
								>
									<div
										className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${requireName ? "translate-x-6" : "translate-x-0"
											}`}
									></div>
								</div>
							</div>
							<div className="flex flex-col">
								<label
									htmlFor="securityType"
									className="text-gray-200"
								>
									{" "}
									Voting Security{" "}
								</label>

								<select
									name="voting_security"
									id="securityType"
									className="mt-1.5 w-full p-2 pr-10 bg-gray-800 text-gray-300 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
									onChange={handleVoteSecurityOnChange}
								>
									<option value="">Please select</option>
									<option value="ip">One vote per IP Address</option>
									<option value="browser">One vote per browser section</option>
								</select>
							</div>
						</div>
					</div>

					<div className="pt-10">
						<span className="relative flex justify-center">
							<div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
						</span>
					</div>

					<div className="flex w-full items-center space-x-2 pt-6">
						<button onClick={submitForm} className="flex w-full justify-center py-3 bg-blue-500 text-gray-200 rounded-md hover:bg-gray-600 transition font-semibold text-base">
							Create Poll
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PollingCard
