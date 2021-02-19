# Ethereum-React-Todo-List
A Todo-List application powered by Ethereum Blockchain &amp; built using ```React JS```. The application uses ```Web3js``` library to interact with the Ethereum Blockchain.

## Installation & Setup
 The following steps will walk you through the installation of packages & setup of the project.
 
### Clone the repository
First, clone this repository and navigate into it.

```bash
git clone https://github.com/atherkhalil/Ethereum-React-Todo-List.git
cd Ethereum-React-Todo-List
```

### Install Project Dependencies

```bash
npm install 
```
This will install all the necessary dependencies of the project.

### Compile the smart contract & build artifacts

First we will launch the truffle environment.

```bash
truffle develop
```
This will launch a ```truffle``` interactive console, which will look like this ```truffle(develop)>```.<br><br>
Once inside the console, run the following commands for compiling & deploying the smart contract to the Blockchain.

```bash
compile
```

```bash
migrate
```
The ```migrate``` command takes the compiled smart contract and deploys it to the Blockchain.

### Inject smart contract ABI & Address in the Rest API

Navigate to ```build/contracts``` and open ```TodoList.json```

copy the ```ABI``` object.

Navigate to ```src/config.js``` file and store the copied ```ABI``` in the ```TODO_LIST_ABI``` variable.

This ```ABI``` contains the function input parameters and outputs of the fucntions defined in the smart contract. <br>
Web3 uses this ```ABI``` as an interface to invoke the smart contract functions.

Now copy the smart contract ```address``` from the ```truffle console``` which is outputted after the ```migrate``` command is run.
It will be something like this:

```bash
> contract address:    0x0BbD28754fA840e4AA253E6E530Bb8DAcfC0BF75
```

Paste the address in the ```TODO_LIST_ADDRESS``` variable in ```src/config.js``` file.

Now we're ready to use the Rest API to interact with the smart contract.

### Run the React App

Let's go ahead and lauch the React Application.

```bash
npm start
```

This will open the App in the browser automatically.
