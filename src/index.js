import execa from 'execa'
import { pipe, curry } from 'ramda'
import { trace } from 'xtrace'

export const run = curry(function _run(
  config,
  cmd,
  args,
  onError,
  onSuccess
) {
  return execa(cmd, args, config).catch(onError).then(onSuccess)
})

export const expectToBe = curry((expect, b, a) =>
  expect(a).toEqual(b)
)

export const runTest = curry(function _runTest(
  {
    cmd,
    select,
    expectation = expectToBe,
    expect,
    config = {},
    args
  },
  onError,
  specify,
  expected
) {
  return run(
    config,
    cmd,
    args,
    onError,
    pipe(select, specify, expectation(expect, expected))
  )
})
