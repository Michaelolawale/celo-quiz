async function main() {
  const Factory = await ethers.getContractFactory('QuizScore');
  const contract = await Factory.deploy();
  await contract.waitForDeployment();

  console.log('QuizScore deployed to:', await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
