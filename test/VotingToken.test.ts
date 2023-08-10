import {expect} from 'chai';
import {ethers, deployments, getUnnamedAccounts, getNamedAccounts} from 'hardhat';
import {VotingToken as VT} from '../typechain-types';
import {setupUser, setupUsers} from './utils';

const setup = deployments.createFixture(async () => {
	await deployments.fixture('VotingToken');
	const {voter, owner} = await getNamedAccounts();
	const contracts = {
		VotingToken: await ethers.getContract<VT>('VotingToken'),
	};
	const users = await setupUsers(await getUnnamedAccounts(), contracts);
	return {
		...contracts,
		users,
		voter: await setupUser(voter, contracts),
		owner: await setupUser(owner, contracts),
	};
});

describe('VotingToken', function () {
	it('transfer fails', async function () {
		const {users, owner} = await setup();
		await expect(owner.VotingToken.transfer(users[1].address, 1)).to.be.reverted;
	});

	it('transfer succeed', async function () {
		const {users, voter, owner, VotingToken} = await setup();
		await owner.VotingToken.mint(voter.address, 100);
		await voter.VotingToken.transfer(users[1].address, 1);

		await expect(voter.VotingToken.transfer(users[1].address, 1))
			.to.emit(VotingToken, 'Transfer')
			.withArgs(voter.address, users[1].address, 1);
	});
});
