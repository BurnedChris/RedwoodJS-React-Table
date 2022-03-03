import { launches, launch } from './launch'
import type { StandardScenario } from './launch.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('launchs', () => {
  scenario('returns all launches', async (scenario: StandardScenario) => {
    const result = await launches()

    expect(result.length).toEqual(Object.keys(scenario.launch).length)
  })

  scenario('returns a single launch', async (scenario: StandardScenario) => {
    const result = await launch({ id: scenario.launch.one.id })

    expect(result).toEqual(scenario.launch.one)
  })
})
