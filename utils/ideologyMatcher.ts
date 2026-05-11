export interface IdeologyScore {
  id: string;
  name: string;
  score: number;
}

export interface CombinedIdeology {
  name: string;
  description: string;
  color: string;
  components: string[];
  primaryComponent: IdeologyScore;
  secondaryComponent: IdeologyScore | null;
  tertiaryComponent: IdeologyScore | null;
}

export const IDEOLOGY_COMBINATIONS: Record<string, CombinedIdeology> = {
  'anarchoTranshumanism': {
    name: 'Anarcho-Transhumanism',
    description: 'Combines anarchism with transhumanism, seeking technological advancement without hierarchical control.',
    color: '#00AA00',
    components: ['anarchism', 'transhumanism'],
    primaryComponent: { id: 'anarchism', name: 'Anarchism', score: 0 },
    secondaryComponent: { id: 'transhumanism', name: 'Transhumanism', score: 0 },
    tertiaryComponent: null,
  },
  'anarchoCommunism': {
    name: 'Anarcho-Communism',
    description: 'Combines anarchism with communism, seeking a stateless, classless society with collective ownership.',
    color: '#FF0000',
    components: ['anarchism', 'communism'],
    primaryComponent: { id: 'anarchism', name: 'Anarchism', score: 0 },
    secondaryComponent: { id: 'communism', name: 'Communism', score: 0 },
    tertiaryComponent: null,
  },
  'anarchoCapitalism': {
    name: 'Anarcho-Capitalism',
    description: 'Advocates for the elimination of the state and the free market as the only legitimate form.',
    color: '#FFD700',
    components: ['anarchism', 'capitalism'],
    primaryComponent: { id: 'anarchism', name: 'Anarchism', score: 0 },
    secondaryComponent: { id: 'capitalism', name: 'Capitalism', score: 0 },
    tertiaryComponent: null,
  },
  'technoAnarchism': {
    name: 'Techno-Anarchism',
    description: 'Uses technology to advance anarchist principles and decentralized decision-making.',
    color: '#00AA44',
    components: ['anarchism', 'transhumanism'],
    primaryComponent: { id: 'anarchism', name: 'Anarchism', score: 0 },
    secondaryComponent: { id: 'transhumanism', name: 'Transhumanism', score: 0 },
    tertiaryComponent: null,
  },
  'ecoSocialism': {
    name: 'Eco-Socialism',
    description: 'Combines ecological concerns with socialist principles for sustainable and equitable society.',
    color: '#006622',
    components: ['environmentalism', 'socialism'],
    primaryComponent: { id: 'environmentalism', name: 'Environmentalism', score: 0 },
    secondaryComponent: { id: 'socialism', name: 'Socialism', score: 0 },
    tertiaryComponent: null,
  },
  'anarchoNihilism': {
    name: 'Anarcho-Nihilism',
    description: 'Combines anarchism with nihilistic rejection of all values and moral frameworks.',
    color: '#333333',
    components: ['anarchism'],
    primaryComponent: { id: 'anarchism', name: 'Anarchism', score: 0 },
    secondaryComponent: null,
    tertiaryComponent: null,
  },
};

export function findCombinedIdeology(topScores: IdeologyScore[]): CombinedIdeology | null {
  // Get top 3 scores
  const [first, second, third] = topScores.slice(0, 3);

  if (!first) return null;

  // Check for exact three-component matches
  if (first && second && third && third.score > first.score * 0.5) {
    const combination = checkThreeComponentCombination(first, second, third);
    if (combination) return combination;
  }

  // Check for two-component matches
  if (first && second && second.score > first.score * 0.6) {
    const combination = checkTwoComponentCombination(first, second);
    if (combination) return combination;
  }

  // Return primary ideology
  return getPrimaryIdeology(first);
}

function checkTwoComponentCombination(
  first: IdeologyScore,
  second: IdeologyScore
): CombinedIdeology | null {
  const pairs = [
    [first.id, second.id],
    [second.id, first.id],
  ];

  for (const pair of pairs) {
    const key = `${pair[0]}${pair[1].charAt(0).toUpperCase()}${pair[1].slice(1)}`;
    if (IDEOLOGY_COMBINATIONS[key]) {
      const combo = { ...IDEOLOGY_COMBINATIONS[key] };
      combo.primaryComponent = first;
      combo.secondaryComponent = second;
      return combo;
    }
  }

  return null;
}

function checkThreeComponentCombination(
  first: IdeologyScore,
  second: IdeologyScore,
  third: IdeologyScore
): CombinedIdeology | null {
  // This could be extended for three-component ideologies
  // For now, prioritize two-component combinations
  return null;
}

function getPrimaryIdeology(ideology: IdeologyScore): CombinedIdeology {
  return {
    name: ideology.name,
    description: `Primary alignment with ${ideology.name.toLowerCase()}.`,
    color: getIdeologyColor(ideology.id),
    components: [ideology.id],
    primaryComponent: ideology,
    secondaryComponent: null,
    tertiaryComponent: null,
  };
}

function getIdeologyColor(ideologyId: string): string {
  const colors: Record<string, string> = {
    anarchism: '#000000',
    anarchoCommunism: '#FF0000',
    anarchoCapitalism: '#FFD700',
    communism: '#FF0000',
    socialism: '#E80000',
    socialDemocracy: '#CC0000',
    liberalism: '#0099FF',
    libertarianism: '#FFCC00',
    conservatism: '#0033AA',
    fascism: '#1A1A1A',
    monarchism: '#800080',
    transhumanism: '#00FF00',
    technocracy: '#00CCFF',
    authoritarianism: '#330000',
    progressivism: '#FF6600',
    feminism: '#FF1493',
    environmentalism: '#228B22',
    nationalism: '#CC3300',
    internationalism: '#FF3300',
    mutualism: '#663300',
    marxism: '#990000',
    capitalism: '#FFAA00',
    democracy: '#0066CC',
    traditionalism: '#663333',
  };

  return colors[ideologyId] || '#666666';
}
