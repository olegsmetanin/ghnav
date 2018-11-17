import React from 'react'
import renderer from 'react-test-renderer'
import { withProps } from '../withProps'

describe('withProps', () => {
  it('withProps', () => {
    class Comp extends React.Component<any, {}> {
      render() {
        return <div>{JSON.stringify(this.props)}</div>
      }
    }

    const CompWithProps = withProps(() => ({
      newprop: 1
    }))(Comp)

    const component = renderer.create(<CompWithProps />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
