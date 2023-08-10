import {deployments, getNamedAccounts, ethers} from 'hardhat';
const {execute} = deployments;
// example script

// const args = process.argv.slice(2);
const candidateId = 1;
const numVotes = ethers.parseEther('0.5');

async function main() {
	const {voter} = await getNamedAccounts();

	const tx = await execute('VotingSystem', {from: voter, log: true}, 'vote', candidateId, numVotes);
	if (tx.status) {
		console.log(`Transaction submitted: ${tx.transactionHash}`);
		console.log(`Successfully voted for candidate ${candidateId} with number of votes: ${numVotes}`);
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
