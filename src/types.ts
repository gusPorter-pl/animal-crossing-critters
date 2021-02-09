interface Critter {
  type: string; //'Insect' | 'Fish' | 'Sea Creature'
  index: number;
  name: string;
  months: string;
  time: string;
  location?: string;
  status: string;
}

export default Critter;
