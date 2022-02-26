import { capitalize } from './capitalize';

test('capitalizes a string', () => {
  expect(capitalize('hello')).toEqual('Hello');
});

test('only capitalizes the first word', () => {
  expect(capitalize('hello world')).toEqual('Hello world');
});

test('does not change numbers', () => {
  expect(capitalize('123')).toEqual('123');
});
