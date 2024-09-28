# Smart Contract Management - ETH + AVAX

This is my 4th project for Metacrafters.

## Description

The 4th project for Metacrafters consists of two main functionalities:
1. The smart contract has at least two functions.
2. The values of the functions from the smart contract are visible on the frontend of the application.

## Getting Started

### Installing

* You can clone the repository using the `git clone <link to repository>` command through your terminal.
* You can also clone it through GitHub Desktop by clicking the down arrow button beside the code button and selecting open with GitHub Desktop.

### Executing Program

* Inside the project directory, in the terminal type: `npm i`
* Open two additional terminals in your VS Code.
* In the second terminal type: `npx hardhat node`
* In the third terminal, type: `npx hardhat run --network localhost scripts/deploy.js`
* Back in the first terminal, type `npm run dev` to launch the front-end.
* Install the MetaMask extension in your web browser.
* Add a network manually in your MetaMask with these fields:
  - **Name:** (can be anything you would like)
  - **RPC URL:** http://127.0.0.1:8545/
  - **Chain ID:** 31337
  - **Currency Symbol:** ETH
* Click save and switch to your created network.
* Go back to the terminal where you entered `npx hardhat node` and copy the private key of Account 0.
* Import the account to MetaMask.

After executing these steps, you will now be able to use the program by using the link given after your `npm run dev` command.

## Help

Be sure to use Account 0 as it is the owner. If you encounter an error where your nonce is too high, go to your MetaMask, select settings -> advanced, and clear activity tab data. This error occurs when you use your account, close the application, and then use the account again.

## Authors

Gagan Chaudhary

## License

This project is licensed under the Gagan Chaudhary License - see the LICENSE.md file for details.
