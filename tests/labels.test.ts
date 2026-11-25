import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeLabels,
  issueMatchesLabels,
  filterIssuesByLabels,
  withProjectLabels,
  labelRole,
} from '../src/shared/labels';

const issue = (n: number, ...labels: string[]) => ({ number: n, labels: labels.map(name => ({ name })) });

const ISSUES = [
  issue(1, 'project-a'),
  issue(2, 'project-b', 'bug'),
  issue(3, 'project-a', 'in-progress'),
  issue(4),                       // no labels at all
  issue(5, 'enhancement'),
  issue(6, 'Project-A'),          // different case
];
const nums = (arr: Array<{ number: number }>) => arr.map(i => i.number);

test('no project labels → every issue (old behaviour)', () => {
  assert.deepEqual(nums(filterIssuesByLabels(ISSUES, [])), [1, 2, 3, 4, 5, 6]);
});

test('one project label → only issues carrying it (case-insensitive)', () => {
  assert.deepEqual(nums(filterIssuesByLabels(ISSUES, ['project-a'])), [1, 3, 6]);
});

test('several project labels → issue needs at least one of them', () => {
  assert.deepEqual(nums(filterIssuesByLabels(ISSUES, ['project-a', 'project-b'])), [1, 2, 3, 6]);
});

test('issue without any label never matches an active filter', () => {
  assert.equal(issueMatchesLabels(issue(4), ['project-a']), false);
  assert.equal(issueMatchesLabels({ labels: null }, ['project-a']), false);
  assert.equal(issueMatchesLabels({}, ['project-a']), false);
  assert.equal(issueMatchesLabels(issue(4), []), true);
});

test('status label does not affect project membership', () => {
  assert.equal(issueMatchesLabels(issue(3, 'project-a', 'in-progress'), ['project-a']), true);
  assert.equal(issueMatchesLabels(issue(7, 'in-progress'), ['project-a']), false);
});

test('label filter accepts plain string labels too (gh CLI shape)', () => {
  assert.equal(issueMatchesLabels({ labels: ['project-a'] }, ['project-a']), true);
});

test('normalizeLabels: missing / wrong types mean "no filter"', () => {
  assert.deepEqual(normalizeLabels(undefined), []);
  assert.deepEqual(normalizeLabels(null), []);
  assert.deepEqual(normalizeLabels(42), []);
  assert.deepEqual(normalizeLabels({}), []);
});

test('normalizeLabels: trims, drops empties and case-duplicates, accepts CSV string', () => {
  assert.deepEqual(normalizeLabels([' project-a ', '', 'Project-A', 7, 'project-b']), ['project-a', 'project-b']);
  assert.deepEqual(normalizeLabels('project-a, project-b,,'), ['project-a', 'project-b']);
});

test('withProjectLabels adds the project label to a new issue, without duplicates', () => {
  assert.deepEqual(withProjectLabels(undefined, ['project-a']), ['project-a']);
  assert.deepEqual(withProjectLabels(['bug', 'Project-A'], ['project-a']), ['bug', 'Project-A']);
  assert.deepEqual(withProjectLabels(['bug'], []), ['bug']);
  assert.deepEqual(withProjectLabels(undefined, []), []);
});

test('labelRole keeps status / priority / default labels apart from project labels', () => {
  assert.equal(labelRole('in-progress'), 'status');
  assert.equal(labelRole('review'), 'status');
  assert.equal(labelRole('need-testing'), 'status');
  assert.equal(labelRole('priority:high'), 'priority');
  assert.equal(labelRole('P0'), 'priority');
  assert.equal(labelRole('enhancement'), 'priority');
  assert.equal(labelRole('bug'), 'priority');
  assert.equal(labelRole('question'), 'default');
  assert.equal(labelRole('good first issue'), 'default');
  assert.equal(labelRole('project-a'), 'other');
});
