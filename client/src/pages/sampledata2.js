const faker = require('faker');
faker.locale = 'en_CA';

export const SampleData = () => {
    const sample = [];

    for (let i = 1; i <= 5; i += 1) {
      const data = {
        name: faker.name.title(),
        created: faker.date.weekday(),
        prospects: faker.random.number({min:1, max:100}),
        replies: faker.random.number({min:1, max:100}),
        steps: faker.random.number({min:1, max:100}),
        due: faker.date.weekday()
      };
      sample.push(data);
    }
    return sample;
  }
  
  