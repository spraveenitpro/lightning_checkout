import React from 'react'
import axios from 'axios'

const tiers = [
    {
        title: 'Starter',
        price: '10',
        description: [
            '10 users included',
            '2 GB of storage',
            'Help center access',
            'Email support',
        ],
        buttonText: 'Get Invoice',
        buttonVariant: 'outlined',
        key: 0,
    },
    {
        title: 'Pro',
        subheader: 'Most popular',
        price: '100',
        description: [
            '20 users included',
            '10 GB of storage',
            'Help center access',
            'Priority email support',
        ],
        buttonText: 'Get Invoice',
        buttonVariant: 'contained',
        key: 1,
    },
    {
        title: 'Enterprise',
        price: '1000',
        description: [
            '50 users included',
            '30 GB of storage',
            'Help center access',
            'Phone & email support',
        ],
        buttonText: 'Get Invoice',
        buttonVariant: 'outlined',
        key: 2,
    },
]
const config = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Api-Key ${process.env.API_KEY}`,
    },
}

const handleClick = async (invoice_amount) => {
    const body = JSON.stringify({
        amount: invoice_amount,
        ttl: 10,
        callback_url:
            'https://webhook.site/de3e7e4a-9767-46ab-beaf-e1412b3f3e8d',
        success_url: window.location.href,
        description: 'demo description',
        order_id: '1337',
        customer_note: 'demo customer note',
        customer_email: 'demo_customer_email@email.com',
    })
    axios
        .post('https://api.minatopay.com/v1/invoices/', body, config)
        .then((result) => {
            console.log(result.data.results)
            const { hosted_checkout_url } = result.data.results
            window.location.href = hosted_checkout_url
        })
        .catch((err) => console.log(err))
}

const TieredPricing = () => {
    return (
        <div className="bg-gray-100 my-5">
            <div className="max-w-7xl m-24">
                <section id="pricing" className="my-24">
                    <header className="text-center">
                        <h3 className="text-2xl font-bold mb-5 text-gray-900 pt-10">
                            Click one of the bottons below to generate a Bitcoin
                            Lightning checkout.
                        </h3>
                    </header>
                    <div className="flex flex-col mt-10 mx-5 space-y-5 md:space-y-0 md:flex-row md:space-x-5 md:mx-0 justify-between pb-20 ">
                        {tiers.map((tier) => (
                            <div className="flex-1" key={tier.title}>
                                <div className="bg-white p-10 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="text-2xl font-bold text-gray-900">
                                                {tier.title}
                                            </h4>
                                            <div className="text-xs text-gray-500">
                                                {tier.subheader && (
                                                    <h3> {tier.subheader}</h3>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="bg-gray-100 p-2 rounded-lg text-center">
                                                <h4 className="text-2xl font-bold text-gray-900">
                                                    {tier.price} sats
                                                </h4>
                                                <p className="text-xs text-gray-500">
                                                    Per month
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="text-gray-100 mt-5" />
                                    <div className="mt-10">
                                        <ul className="space-y-4">
                                            {tier.description.map((line) => (
                                                <li
                                                    className="flex items-center"
                                                    key={line}
                                                >
                                                    <div className="bg-indigo-900 rounded-full p-1">
                                                        <svg
                                                            className="flex-shrink-0 h-4 w-4 text-white"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <span
                                                        className="ml-3 text-base text-indigo-900"
                                                        key={line}
                                                    >
                                                        {line}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button
                                        variant={tier.buttonVariant}
                                        onClick={() => handleClick(tier.price)}
                                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 mt-10 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                    >
                                        {tier.buttonText}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default TieredPricing
