
// fake data 
export const SampleData = () => {
    const sample = [];
    
    for (let i = 1; i <= 5; i += 1) {
      const data = {
        name: "email@gmail.com",
        created: "12/7",
        prospects: "23",
        replies: 5,
        steps: "3",
        due: "1/20",
      };
      sample.push(data);
    }
    return sample;
  }
  
  