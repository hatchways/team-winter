// const faker = require('faker');
// faker.locale = 'en_CA';

export const SampleData = () => {
  const sample = [];
  
  for (let i = 1; i <= 5; i += 1) {
    const data = {
      email: "email@gmail.com",
      status: "working",
      owner: "name of owner",
      campaigns: 5,
      lastContacted: "12/7",
      emails: 24,
    };
    sample.push(data);
  }
  return sample;
}

