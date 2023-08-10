import {deployments, getNamedAccounts, ethers} from 'hardhat';
const {execute} = deployments;
// example script

// const args = process.argv.slice(2);
const recipient = '0x5fA661431Ed008fA4D83b68082c6ce419aCcd62c';
const amount = ethers.parseEther('1');

async function main() {
	const {deployer} = await getNamedAccounts();
	const tx = await execute('VotingToken', {from: deployer, log: true}, 'mint', recipient, amount);

	if (tx.status) {
		console.log(`Transaction submitted: ${tx.transactionHash}`);
		console.log(`Successfully sent ${amount} SK3WL tokens to ${tx.logs?.[0]?.topics[2]}`);
	} else {
		throw 'Something went wrong';
	}
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
