import * as React from 'react'

import { IRepo, IRepoListQuery } from 'interfaces/repo'
import {
  Theme,
  WithStyles,
  createStyles,
  withStyles
} from '@material-ui/core/styles'

import Downshift from 'downshift'
import { IProcessState } from 'interfaces/redux'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import { debounce } from 'lodash'
import { fade } from '@material-ui/core/styles/colorManipulator'

const styles = (theme: Theme) =>
  createStyles({
    container: {},
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit * 3,
        width: 'auto'
      }
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit',
      width: '100%'
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200
      }
    },

    popover: {
      zIndex: 1200
    },
    popoverInternal: {
      maxHeight: 200,
      overflow: 'auto'
    }
  })

export interface IBaseRepoSelectProps extends WithStyles<typeof styles> {
  value: string
  process?: IProcessState
  query?: IRepoListQuery
  items?: IRepo[]

  onChange?: (value: string) => void
  onInputChange: (value: string) => void
  debounceTimeout: number
}

export interface IBaseRepoSelectState {
  value: string
}

export class BaseRepoSelect extends React.Component<
  IBaseRepoSelectProps,
  IBaseRepoSelectState
> {
  static defaultProps = {
    debounceTimeout: 500
  }

  state = {
    value: this.props.value
  }

  popperNode

  handleOnInputDebouncedChange = debounce(value => {
    this.props.onInputChange(value)
  }, this.props.debounceTimeout)

  handleOnInputChange = value => {
    this.setState({ value })
    this.handleOnInputDebouncedChange(value)
  }

  handleOnChange = value => {
    this.setState({ value })
    this.props.onChange(value)
  }

  /*
   * Restore value onBlur
   */
  handleOnStateChange = (changes: any) => {
    if (
      changes.type === Downshift.stateChangeTypes.blurInput ||
      changes.type === Downshift.stateChangeTypes.mouseUp
    ) {
      this.setState({ value: this.props.value })
    }
  }

  renderInput = inputProps => {
    const { InputProps, classes, ref, ...other } = inputProps

    return (
      <TextField
        InputProps={{
          disableUnderline: true,
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput
          },
          ...InputProps
        }}
        {...other}
      />
    )
  }

  renderSuggestion = ({
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  }) => {
    const isHighlighted = highlightedIndex === index
    const isSelected = (selectedItem || '').indexOf(suggestion) > -1

    return (
      <MenuItem
        {...itemProps}
        key={suggestion}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        {suggestion}
      </MenuItem>
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value })
    }
  }

  render() {
    const { classes, items } = this.props
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>

        <Downshift
          id="downshift-popper"
          inputValue={this.state.value}
          onStateChange={this.handleOnStateChange}
          onInputValueChange={this.handleOnInputChange}
          onSelect={this.handleOnChange}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            highlightedIndex,
            isOpen,
            selectedItem
          }) => (
            <div className={classes.container}>
              {this.renderInput({
                fullWidth: true,
                classes,
                InputProps: getInputProps({
                  placeholder: 'Search repo'
                }),
                ref: node => {
                  this.popperNode = node
                }
              })}
              <Popper
                open={isOpen}
                anchorEl={this.popperNode}
                className={classes.popover}
              >
                <div
                  {...(isOpen
                    ? getMenuProps({}, { suppressRefError: true })
                    : {})}
                >
                  <Paper
                    square
                    style={{
                      marginTop: 8,
                      width: this.popperNode
                        ? this.popperNode.clientWidth
                        : null
                    }}
                  >
                    <div className={classes.popoverInternal}>
                      {items &&
                        items.map((item, index) => {
                          const suggestion = item.owner + '/' + item.repo
                          return this.renderSuggestion({
                            suggestion,
                            index,
                            itemProps: getItemProps({ item: suggestion }),
                            highlightedIndex,
                            selectedItem
                          })
                        })}
                    </div>
                  </Paper>
                </div>
              </Popper>
            </div>
          )}
        </Downshift>
      </div>
    )
  }
}

export const RepoSelect = withStyles(styles)(BaseRepoSelect)
