import * as React from 'react'

import { IRepo, IRepoSelectQuery } from 'interfaces/repo'
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Downshift from 'downshift'
import Grid from '@material-ui/core/Grid'
import { IProcessState } from 'interfaces/redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Loader } from 'common/components/Loader'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import { debounce } from 'lodash'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { json2router } from 'common/utils/json2router'

const styles = (theme: Theme) =>
  createStyles({
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

export interface IBaseRepoSelectProps {
  value: string
  process?: IProcessState
  query?: IRepoSelectQuery
  items?: IRepo[]

  onLoad: (query) => void
  onChange: (value: string) => void
  debounceTimeout: number
}

export class BaseRepoSelect extends React.Component<IBaseRepoSelectProps & WithStyles<typeof styles>, {}> {
  static defaultProps = {
    debounceTimeout: 500
  }

  popperNode

  handleOnLoad = debounce(search => {
    if (search.length > 2) {
      this.props.onLoad({ search })
    }
  }, this.props.debounceTimeout)

  /*
   * Use onStateChange because
   * onInputValueChange fires before onStateChange (!)
   * and it gives us one unnecessary search request
   */
  handleOnStateChange = (changes: any) => {
    if (changes.hasOwnProperty('selectedItem')) {
      this.props.onChange(changes.selectedItem)
    } else if (changes.hasOwnProperty('inputValue')) {
      this.handleOnLoad(changes.inputValue)
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

  renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
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

  render() {
    const { classes, items, process, query } = this.props

    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>

        <Downshift
          id="downshift-popper"
          initialSelectedItem={this.props.value}
          onStateChange={this.handleOnStateChange}
        >
          {({ getInputProps, getItemProps, getMenuProps, highlightedIndex, inputValue, isOpen, selectedItem }) => (
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
              <Popper open={isOpen} anchorEl={this.popperNode} className={classes.popover}>
                <div {...(isOpen ? getMenuProps({}, { suppressRefError: true }) : {})}>
                  <Paper square style={{ marginTop: 8, width: this.popperNode ? this.popperNode.clientWidth : null }}>
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
