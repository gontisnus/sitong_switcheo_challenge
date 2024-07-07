import React, { useEffect, useState, useMemo } from 'react'
import useWalletBalances from '../hooks/useWalletBalances'
import { Datasource } from '../utils/datasource'
import { Props } from '../interfaces/boxProps'
import { WalletBalance } from '../interfaces/walletBalance'
import {FormattedWalletBalance} from '../interfaces/formatedWalletBalance'
import WalletRow from './walletRow';

const WalletPage: React.FC<Props> = (props: Props) => {
    const { classes, ...rest } = props;
    const balances = useWalletBalances();
    const [prices, setPrices] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const datasource = new Datasource("https://interview.switcheo.com/prices.json");
        datasource.getPrices().then(prices => {
            setPrices(prices);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    const getPriority = (blockchain: any): number => {
        switch (blockchain) {
            case 'Osmosis':
                return 100
            case 'Ethereum':
                return 50
            case 'Arbitrum':
                return 30
            case 'Zilliqa':
                return 20
            case 'Neo':
                return 20
            default:
                return -99
        }
    }

    const sortedBalances = useMemo(() => {
        return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            console.log(balancePriority)
            if (balancePriority > -99) {
                if (balance.amount >= 0) {
                    return true;
                }
            }
            return false
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
                return -1;
            //change the else condition to avoid undefined situation
            } else {
                return 1;
            }
        });
    }, [balances, prices]);


    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
        return {
            ...balance,
            formatted: balance.amount.toFixed()
        }
    })


//change sortedBalances to formatted balances
    const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow
                className={classes}
                key={index}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
            />
        )
    })

    return (
        <div {...rest}>
            {rows}
        </div>
    )
}

export default WalletPage;