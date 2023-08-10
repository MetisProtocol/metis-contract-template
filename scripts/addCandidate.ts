import {deployments, getNamedAccounts} from 'hardhat';
const {execute} = deployments;
// example script

// const args = process.argv.slice(2);
const candidateName = 'Rami';

async function main() {
	const {owner} = await getNamedAccounts();
	const tx = await execute('VotingSystem', {from: owner, log: true}, 'addCandidate', candidateName);
	if (tx.status) {
		console.log(`Transaction submitted: ${tx.transactionHash}`);
		console.log(`Successfully added candidate ${candidateName} with ID: ${tx.logs?.[0]?.topics[1]}`);
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
