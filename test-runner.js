// Headless Node.js runner for CourseAdvisor evaluation suite
import { EVAL_TEST_CASES } from './src/utils/evalSuite.js';

console.log('====================================================');
console.log('🚀 RUNNING CourseAdvisor AUTOMATED TEST SUITE');
console.log('====================================================');

let passed = 0;
let failed = 0;

for (const test of EVAL_TEST_CASES) {
  try {
    const result = test.run(test.input);
    if (result.passed) {
      console.log(`✅ [PASS] ${test.id}: ${test.name}`);
      passed++;
    } else {
      console.log(`❌ [FAIL] ${test.id}: ${test.name}`);
      console.log(`   Expected: ${result.expected}`);
      console.log(`   Actual:   ${result.actual}`);
      failed++;
    }
  } catch (err) {
    console.log(`💥 [ERROR] ${test.id}: ${test.name} -> ${err.message}`);
    failed++;
  }
}

console.log('====================================================');
console.log(`SUMMARY: ${passed}/${EVAL_TEST_CASES.length} PASSED (${failed} failed)`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
