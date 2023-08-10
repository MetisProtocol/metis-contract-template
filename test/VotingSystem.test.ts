import {expect} from 'chai';
import {ethers, deployments, getUnnamedAccounts, getNamedAccounts} from 'hardhat';
import {VotingSystem, VotingToken as VT} from '../typechain-types';
import {setupUsers, setupUser} from './utils';

const setup = deployments.createFixture(async () => {
	await deployments.fixture('VotingToken');
	await deployments.fixture('VotingSystem');
	const contracts = {
		VotingToken: await ethers.getContract<VT>('VotingToken'),
		VotingSystem: await ethers.getContract<VotingSystem>('VotingSystem'),
	};
	const {owner} = await getNamedAccounts();
	const users = await setupUsers(await getUnnamedAccounts(), contracts);
	return {
		...contracts,
		users,
		owner: await setupUser(owner, contracts),
	};
});
describe('VotingSystem', function () {
	it('addCandidate works', async function () {
		const {owner, VotingSystem} = await setup();
		const testName = 'something';
		await expect(owner.VotingSystem.addCandidate(testName)).to.emit(VotingSystem, 'NewCandidate');
	});
});
