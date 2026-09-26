import { ApplicantProfile, SchemeRule, EligibilityResult } from '../types';

export function evaluateRule(profile: Partial<ApplicantProfile>, rule: SchemeRule): { passed: boolean; actualValue: any; message: string } {
  const fieldKey = rule.field as keyof ApplicantProfile;
  const actualValue = profile[fieldKey];

  if (actualValue === undefined || actualValue === null) {
    return {
      passed: false,
      actualValue: 'Not provided',
      message: `Profile field '${rule.fieldLabel}' is missing.`
    };
  }

  let passed = false;

  switch (rule.operator) {
    case 'EQUALS':
      passed = String(actualValue).trim().toLowerCase() === String(rule.value).trim().toLowerCase();
      break;

    case 'NOT_EQUALS':
      passed = String(actualValue).trim().toLowerCase() !== String(rule.value).trim().toLowerCase();
      break;

    case 'GREATER_THAN':
      passed = Number(actualValue) > Number(rule.value);
      break;

    case 'GREATER_THAN_EQUAL':
      passed = Number(actualValue) >= Number(rule.value);
      break;

    case 'LESS_THAN':
      passed = Number(actualValue) < Number(rule.value);
      break;

    case 'LESS_THAN_EQUAL':
      passed = Number(actualValue) <= Number(rule.value);
      break;

    case 'IN':
      if (Array.isArray(rule.value)) {
        passed = rule.value.some(v => String(v).toLowerCase() === String(actualValue).toLowerCase());
      } else {
        const allowedList = String(rule.value).split(',').map(s => s.trim().toLowerCase());
        passed = allowedList.includes(String(actualValue).trim().toLowerCase());
      }
      break;

    case 'CONTAINS':
      passed = String(actualValue).toLowerCase().includes(String(rule.value).toLowerCase());
      break;

    default:
      passed = false;
  }

  return {
    passed,
    actualValue,
    message: passed ? 'Condition satisfied' : rule.errorMessage
  };
}

export function evaluateEligibility(profile: Partial<ApplicantProfile>, rules: SchemeRule[]): EligibilityResult {
  const activeRules = rules.filter(r => r.active);
  if (activeRules.length === 0) {
    return { eligible: true, conditions: [] };
  }

  const conditions = activeRules.map(rule => {
    const res = evaluateRule(profile, rule);
    return {
      rule: rule.fieldLabel,
      field: rule.field,
      requiredValue: rule.value,
      actualValue: res.actualValue,
      passed: res.passed,
      message: res.message
    };
  });

  const allPassed = conditions.every(c => c.passed);

  return {
    eligible: allPassed,
    conditions
  };
}
