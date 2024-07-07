import React from 'react';

interface WalletRowProps {
  className: string;
  key: number;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({ className, key, amount, usdValue, formattedAmount }) => {
  return (
    <div className={className} key={key}>
      <div>Amount: {amount}</div>
      <div>USD Value: {usdValue}</div>
      <div>Formatted Amount: {formattedAmount}</div>
    </div>
  );
}

export default WalletRow;
