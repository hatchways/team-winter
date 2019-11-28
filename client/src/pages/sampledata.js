const faker = require('faker');
faker.locale = 'en_CA';

export const SampleData = () => {
  const sample = [];
  
  for (let i = 1; i <= 15; i += 1) {
    const data = {
      email: faker.internet.email(),
      status: faker.random.arrayElement(["working","open"]),
      owner: faker.fake("{{name.lastName}}, {{name.firstName}}"),
      campaigns: faker.random.number({min:1, max:10}),
      lastContacted: faker.date.weekday(),
      emails: faker.random.number({min:1, max:5}),
    };
    sample.push(data);
  }
  return sample;
}

