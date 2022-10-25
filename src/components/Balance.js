import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Balance = () => {
    const [accountBalance, setAccountBalance] = useState()

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Api-Key ${process.env.API_KEY}`,
        },
    }

    useEffect(() => {
        axios
            .get('https://api.minatopay.com/v1/account/balance/', config)
            .then((result) => {
                setAccountBalance(result.data.results.account_balance_sats)
            })
            .catch((err) => console.log(err))
    })
    return (
        <>
            <div className="flex items-center justify-center h-full pt-20">
                <div className="bg-white shadow-2xl p-6 rounded-2xl border-2 border-gray-50">
                    <div className="flex flex-col">
                        <div className="my-6">
                            <div className="flex flex-row space-x-4 items-center">
                                <div id="icon">
                                    <span>
                                        <svg
                                            className="w-20 h-20 fill-stroke text-yellow-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                                <div id="temp">
                                    <h4 className="text-4xl">
                                        {accountBalance} sats
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                        to spend
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Balance
