const Contract = require('../models/Contract');

const checkBullet = async (currentUser) => {
  try {
    console.log(currentUser);
    let showBullet = false;
    if (currentUser) {
      console.log('estoy dentro');
      const contractParent = await Contract.find({ parent: currentUser._id }).lean();
      const contractBabysitter = await Contract.find({ babysitter: currentUser._id }).lean();
      if (contractBabysitter.length > 0) {
        contractBabysitter.forEach((babysitter) => {
          if (babysitter.state === 'Pending') {
            showBullet = true;
          }
        });
      }
      if (contractParent.length > 0) {
        contractParent.forEach((parent) => {
          if (parent.state !== 'Pending') {
            showBullet = true;
          }
        });
      }
    }
    console.log(showBullet);
    return showBullet;
  } catch (error) {

  }
};

module.exports = checkBullet;
