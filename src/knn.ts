export type RiskLevel = 'low' | 'medium' | 'high';

export type CreditExample = {
  monthly_income: number;
  existing_debts: number;
  debt_to_income_ratio: number;
  credit_score: number;
  risk_level: RiskLevel;
};

type FeatureVector = Pick<CreditExample, 'monthly_income' | 'existing_debts' | 'debt_to_income_ratio'>;

type Neighbor = CreditExample & { distance: number };

const incomeBands = [3500, 5000, 6500, 8000, 10000, 12500, 15000, 18500, 23000];
const debtRatios = [0.08, 0.16, 0.24, 0.32, 0.41, 0.5, 0.6, 0.72];

function createTrainingData(): CreditExample[] {
  return incomeBands.flatMap((income, incomeIndex) =>
    debtRatios.map((ratio, ratioIndex) => {
      const debts = Math.round(income * ratio);
      const incomeBonus = Math.min(36, incomeIndex * 4);
      const ratioPenalty = Math.round(ratio * 220);
      const patternAdjustment = ((incomeIndex * 7 + ratioIndex * 3) % 9) - 4;
      const creditScore = Math.max(300, Math.min(850, 820 + incomeBonus - ratioPenalty + patternAdjustment));
      const riskLevel: RiskLevel = creditScore >= 680 ? 'low' : creditScore >= 540 ? 'medium' : 'high';

      return {
        monthly_income: income,
        existing_debts: debts,
        debt_to_income_ratio: ratio,
        credit_score: creditScore,
        risk_level: riskLevel,
      };
    }),
  );
}

export const trainingData = createTrainingData();

function normalize(value: number, min: number, max: number): number {
  return max === min ? 0 : (value - min) / (max - min);
}

function getFeatureRanges(data: CreditExample[]): Record<keyof FeatureVector, { min: number; max: number }> {
  return {
    monthly_income: {
      min: Math.min(...data.map((example) => example.monthly_income)),
      max: Math.max(...data.map((example) => example.monthly_income)),
    },
    existing_debts: {
      min: Math.min(...data.map((example) => example.existing_debts)),
      max: Math.max(...data.map((example) => example.existing_debts)),
    },
    debt_to_income_ratio: {
      min: Math.min(...data.map((example) => example.debt_to_income_ratio)),
      max: Math.max(...data.map((example) => example.debt_to_income_ratio)),
    },
  };
}

function distance(a: FeatureVector, b: FeatureVector, ranges: ReturnType<typeof getFeatureRanges>): number {
  const incomeDistance = normalize(a.monthly_income, ranges.monthly_income.min, ranges.monthly_income.max) - normalize(b.monthly_income, ranges.monthly_income.min, ranges.monthly_income.max);
  const debtDistance = normalize(a.existing_debts, ranges.existing_debts.min, ranges.existing_debts.max) - normalize(b.existing_debts, ranges.existing_debts.min, ranges.existing_debts.max);
  const ratioDistance = normalize(a.debt_to_income_ratio, ranges.debt_to_income_ratio.min, ranges.debt_to_income_ratio.max) - normalize(b.debt_to_income_ratio, ranges.debt_to_income_ratio.min, ranges.debt_to_income_ratio.max);

  return Math.sqrt(incomeDistance ** 2 + debtDistance ** 2 + ratioDistance ** 2);
}

function majorityRisk(neighbors: Neighbor[]): RiskLevel {
  const votes = neighbors.reduce<Record<RiskLevel, number>>((counts, neighbor) => {
    counts[neighbor.risk_level] += 1;
    return counts;
  }, { low: 0, medium: 0, high: 0 });

  return (Object.keys(votes) as RiskLevel[]).sort((a, b) => votes[b] - votes[a])[0];
}

export function predictCredit(monthlyIncome: number, existingDebts: number, k = 5) {
  const debtToIncomeRatio = monthlyIncome > 0 ? existingDebts / monthlyIncome : 1;
  const input: FeatureVector = {
    monthly_income: monthlyIncome,
    existing_debts: existingDebts,
    debt_to_income_ratio: debtToIncomeRatio,
  };
  const ranges = getFeatureRanges(trainingData);
  const neighbors = trainingData
    .map((example) => ({ ...example, distance: distance(input, example, ranges) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, k);
  const totalWeight = neighbors.reduce((sum, neighbor) => sum + 1 / (neighbor.distance + 0.0001), 0);
  const weightedScore = neighbors.reduce((sum, neighbor) => sum + neighbor.credit_score / (neighbor.distance + 0.0001), 0) / totalWeight;

  return {
    score: Math.round(Math.max(300, Math.min(850, weightedScore))),
    risk: majorityRisk(neighbors),
    dti: Math.round(debtToIncomeRatio * 100),
    neighbors,
  };
}
