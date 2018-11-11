import React from 'react'

export interface IBaseCounter {
  value: number
  next: () => number
  onIncrement: (value: number) => void
}

export class BaseCounter extends React.Component<IBaseCounter, {}> {
  onClick = () => {
    this.props.onIncrement(this.props.next())
  }

  render() {
    const { children, value } = this.props

    return (
      <span onClick={this.onClick}>
        {children} {value}
      </span>
    )
  }
}

export const Counter = BaseCounter
