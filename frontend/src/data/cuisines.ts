export interface Cuisine {
  id: string;
  label: string;
  emoji: string;
}

const cuisines: Cuisine[] = [
  { id: 'indian', label: 'Indian', emoji: '🍛' },
  { id: 'italian', label: 'Italian', emoji: '🍝' },
  { id: 'chinese', label: 'Chinese', emoji: '🥢' },
  { id: 'mexican', label: 'Mexican', emoji: '🌮' },
  { id: 'japanese', label: 'Japanese', emoji: '🍱' },
  { id: 'thai', label: 'Thai', emoji: '🍜' },
  { id: 'mediterranean', label: 'Mediterranean', emoji: '🫒' },
  { id: 'american', label: 'American', emoji: '🍔' },
];

export default cuisines;
