import { Counter } from '../components/Counter'
import { connect } from 'react-redux'
import { counterValueSelector } from '../redux/selectors'
import { increment } from '../redux/actions'

const mapStateToProps = state => ({
  value: counterValueSelector(state)
})

const mapDispatchToProps = dispatch => ({
  onIncrement: value => dispatch(increment(value))
})

export const CounterConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
