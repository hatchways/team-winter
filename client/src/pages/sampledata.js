<<<<<<< HEAD
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
=======
const SampleData = [ 
  { 
    'id': 1,
    email: 'Kian.Mayer83@gmail.com',
    'status': 'open',
    'name': 'Rath, Jasper',
    'campaigns': 1,
    'lastContacted': 'Sunday',
    'emails': 4 
  },
  { 
    'id': 2,
    email: 'Gillian_Kemmer@yahoo.ca',
    'status': 'working',
    'name': 'Robel, Reanna',
    'campaigns': 5,
    'lastContacted': 'Saturday',
    'emails': 2 
  },
  { 
    'id': 3,
    'email': 'Meagan_Wilkinson90@hotmail.com',
    'status': 'open',
    'name': 'Sawayn, Tillman',
    'campaigns': 8,
    'lastContacted': 'Sunday',
    'emails': 5 
  },
  { 
    'id': 4,
    'email': 'Garett7@hotmail.com',
    'status': 'open',
    'name': 'Zboncak, Liana',
    'campaigns': 8,
    'lastContacted': 'Wednesday',
    'emails': 3 
  },
  { 
    'id': 5,
    'email': 'Darron_Auer@hotmail.com',
    'status': 'open',
    'name': 'Schuster, Lesly',
    'campaigns': 3,
    'lastContacted': 'Sunday',
    'emails': 5 
  },
  { 
    'id': 6,
    'email': 'Trycia95@yahoo.ca',
    'status': 'open',
    'name': 'Botsford, Emilio',
    'campaigns': 2,
    'lastContacted': 'Tuesday',
    'emails': 3 
  },
  { 
    'id': 7,
    'email': 'Carmen_Bogisich83@yahoo.ca',
    'status': 'open',
    'name': 'Reichel, Jo',
    'campaigns': 3,
    'lastContacted': 'Tuesday',
    'emails': 3 
  },
  { 
    'id': 8,
    'email': 'Lane_Feeney3@hotmail.com',
    'status': 'working',
    'name': 'Prohaska, Katheryn',
    'campaigns': 9,
    'lastContacted': 'Thursday',
    'emails': 3 
  },
  { 
    'id': 9,
    'email': 'Karolann12@yahoo.ca',
    'status': 'open',
    'name': 'Bednar, Emmanuel',
    'campaigns': 2,
    'lastContacted': 'Sunday',
    'emails': 5 
  },
  {
    'id': 10,
    'email': 'Santino_Rice29@hotmail.com',
    'status': 'working',
    'name': 'Spinka, Casimer',
    'campaigns': 2,
    'lastContacted': 'Sunday',
    'emails': 3 
  },
  { 
    'id': 11,
    'email': 'Willy61@hotmail.com',
    'status': 'open',
    'name': 'Davis, Taylor',
    'campaigns': 5,
    'lastContacted': 'Monday',
    'emails': 2 
  },
  { 
    'id': 12,
    'email': 'Hadley_Corwin@gmail.com',
    'status': 'working',
    'name': 'Walsh, Albin',
    'campaigns': 9,
    'lastContacted': 'Sunday',
    'emails': 4 }
    ,
  { 
    'id': 13,
    'email': 'Jason_Gusikowski@gmail.com',
    'status': 'open',
    'name': 'Jacobson, Aylin',
    'campaigns': 7,
    'lastContacted': 'Friday',
    'emails': 1 
  },
  { 
    'id': 14,
    'email': 'Michael44@gmail.com',
    'status': 'open',
    'name': 'Crooks, Ethel',
    'campaigns': 5,
    'lastContacted': 'Sunday',
    'emails': 5 },
  { 
    'id': 15,
    'email': 'Kaden89@gmail.com',
    'status': 'open',
    'name': 'Koepp, Edwina',
    'campaigns': 10,
    'lastContacted': 'Tuesday',
    'emails': 4 
  }
]

export default SampleData;
>>>>>>> 75aa9da6c3bebe0626f82d8a5650f2013b6b0cbf
