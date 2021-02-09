interface Critter {
  type: string; //'Insect' | 'Fish' | 'Sea Creature'
  index: number;
  name: string;
  months: string;
  time: string;
  location?: string;
  status: string; //'Caught' | 'Not Caught'
}

export default Critter;
