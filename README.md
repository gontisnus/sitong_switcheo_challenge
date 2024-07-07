**Problem1**

The solution only considered the situation when input number is non-negative

**Problem2**

To run the project, navigate to **problem2** directory

run **npm install**

run **npm run dev**

and go to the addrress showing.

**Problem3**

To run the project, navigate to **problem3/my-vite-app** directory

run **npm install**

run **npm run dev**

and go to the addrress showing.

The following are anti-patterns and inefficiencies:

1. the sorting and filtering logic might be wrong 

**if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }**
    
  lhsPriority should not be used in the step of filtering, also is it unreasonable to return balance with amount < 0
  
2. **rows = sortedBalances.map()**

  To map balances to rows, we should use formattedBalances instead of sortedBalances


3.  **className={classes.row}**
   
   There should be a class called row predefined in css. **classes** is a object property passed to walletPage component and to walletRow component,
   this also requires proper define of Props and BoxProps.


4.  Lack of separation of conceren. All the components and other logic handlling code are in one file which disadvantage the readability

5.  There might be a need of adding "blockchain:string" to walletBalance and formattedWalletBalance interfaces, since the code provided is trying to get
   the Priority of each balance base on their blockchain which does not exist in the interfaces now.

6.  The need of self-define hook useWalletBalances() to fetch balances from database

7.  When sorting balances by comparing their priorities, the condition does not include the situation when the two priorities are equal to each other.
