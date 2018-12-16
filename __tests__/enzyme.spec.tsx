import * as React from 'react'

import { mount } from 'enzyme'

describe('enzyme', () => {

  it('mount calls componentDidUpdate on setProp', async () => {

    const props = {
      value: 'value'
    }

    interface ICmpPropState {
      value: string
    }

    class Cmp extends React.Component<ICmpPropState, ICmpPropState> {
      state = {
        value: this.props.value
      }

      componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
          this.setState({ value: this.props.value })
        }
      }

      render() {
        return (
          <div>
            {this.state.value}
          </div>
        )
      }
    }

    const tree = mount(
        <Cmp {...props}/>
    )

    expect(tree.state()).toEqual({value: 'value'})

    const newProps = {
      value: 'newValue',
    }

    await tree.setProps(newProps)

    expect(tree.state()).toEqual({value: 'newValue'})

  })

})