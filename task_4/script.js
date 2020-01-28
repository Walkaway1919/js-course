const phrases = string => {
  if (typeof(string) != 'string'){
    return 'is not a string';
  }
  string=string.trim();
  if(string.length > 30){
    string = string.slice(0,30);
    string += '...';
  }
  return string;
};

// console.log(phrases('Eiusmod tempor fugiat ipsum elit velit velit deserunt eu consequat magna dolor in amet. Dolor officia reprehenderit et irure. Tempor labore amet non Lorem excepteur esse est ad minim id non dolore.'));