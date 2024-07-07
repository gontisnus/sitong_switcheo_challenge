import React, { useState, useEffect } from 'react';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

async function fetchPrices() {
    try {
        const response = await axios.get('https://interview.switcheo.com/prices.json');
        const data = response.data;

        const formattedPrices = data.reduce((acc, item) => {
            acc[item.currency] = item.price;
            return acc;
        }, {});

        return formattedPrices;
    } catch (error) {
        console.error('Error fetching prices:', error);
        throw error;
    }
}

const CurrencySwapForm = () => {
    const [prices, setPrices] = useState({});
    const [currencies, setCurrencies] = useState(['BLUR', 'bNEO', 'BUSD', 'USD', 'ETH', 'GMX', 'STEVMOS', 'LUNA', 'RATOM', 'STRD', 'EVMOS', 'IBCX', 'IRIS', 'ampLUNA', 'KUJI', 'STOSMO', 'USDC', 'axlUSDC', 'ATOM', 'STATOM', 'OSMO', 'rSWTH', 'STLUNA', 'LSI', 'OKB', 'OKT', 'SWTH', 'USC', 'WBTC', 'wstETH', 'yieldUSD',, 'ZIL']);
    const [convertedAmount, setConvertedAmount] = useState(null); // State to store converted amount

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedPrices = await fetchPrices();
                setPrices(fetchedPrices);
            } catch (error) {
                console.error('Failed to fetch prices:', error);
            }
        };

        fetchData();
    }, []);

    const formik = useFormik({
        initialValues: {
            amount: '',
            fromCurrency: '',
            toCurrency: '',
        },
        validationSchema: Yup.object({
            amount: Yup.number().required('*Amount is required').positive('Amount must be positive'),
            fromCurrency: Yup.string().required('*Select a currency'),
            toCurrency: Yup.string().required('*Select a currency'),
        }),
        onSubmit: (values) => {
            const { amount, fromCurrency, toCurrency } = values;
            const rate = prices[fromCurrency] / prices[toCurrency];
            const convertedAmount = amount * rate;
            setConvertedAmount(convertedAmount); 
        },
    });

    return (
        <Formik
            initialValues={formik.initialValues}
            onSubmit={formik.onSubmit}
            validationSchema={formik.validationSchema}
        >
            {() => (
                <form onSubmit={formik.handleSubmit}>
                    <div class='form_item'>
                        <label htmlFor="amount">Amount</label>
                        <div>
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.amount}
                            />
                        </div>

                        {formik.touched.amount && formik.errors.amount ? (
                            <div class='error'>{formik.errors.amount}</div>
                        ) : null}
                    </div>
                    <div className='form_item'>
                        <label htmlFor="fromCurrency">From</label>
                        <div>
                            <select
                                id="fromCurrency"
                                name="fromCurrency"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.fromCurrency}
                            >
                                <option value="">Select currency</option>
                                {currencies.map(currency => (
                                    <option key={currency} value={currency}>{currency}</option>
                                ))}
                            </select>
                        </div>

                        {formik.touched.fromCurrency && formik.errors.fromCurrency ? (
                            <div class='error'>{formik.errors.fromCurrency}</div>
                        ) : null}
                    </div>

                    <div className='form_item'>
                        <label htmlFor="toCurrency">To</label>
                        <div>
                            <select
                                id="toCurrency"
                                name="toCurrency"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.toCurrency}
                            >
                                <option value="">Select currency</option>
                                {currencies.map(currency => (
                                    <option key={currency} value={currency}>{currency}</option>
                                ))}
                            </select>
                        </div>

                        {formik.touched.toCurrency && formik.errors.toCurrency ? (
                            <div class='error'>{formik.errors.toCurrency}</div>
                        ) : null}
                    </div>

                    <button class='form_item' type="submit">Convert</button>
                    {convertedAmount !== null && ( 
                        <div>
                            Converted amount: {convertedAmount.toFixed(2)} {formik.values.toCurrency}
                        </div>
                    )}
                </form>
            )}
        </Formik>
    );
};

export default CurrencySwapForm;
