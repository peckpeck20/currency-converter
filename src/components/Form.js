import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class inputFormUI extends React.Component {
  state = {
    initialInput : '',
    selectedCurrency : '',
    pickedCurrencyIndex : 0,
    total : ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

    //generate picker items
  renderPickItems = () => {
    let storeData = [];
    //in word is used object
    for (var currencyType in this.props.rates) {
      var pickerItem = (
        <MenuItem
          value={currencyType}
          key={currencyType}
        >
        {currencyType}
        </MenuItem>
      );
      storeData.push(pickerItem);
    }
    return storeData;
  };

  calculateValue = () => {
    let originalAmount = this.state.initialInput
    let selectedCurrency = this.state.selectedCurrency
    let exchangeRates = this.props.rates
    let selectedRate =exchangeRates[selectedCurrency]
    let total = (originalAmount/selectedRate).toFixed(2)
    this.setState({
      total
    })
}

  clearFields = () => {
    this.setState({    
    initialInput : '',
    selectedCurrency : '',
    pickedCurrencyIndex : 0,
    total : ''})
  }

  render() {
    const { classes } = this.props;
    const test = this.state.total ? (<h1>You have {this.state.total} in {this.state.selectedCurrency} </h1>) : (<p></p>)
    
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="select-currency"
          select
          label="Select"
          className={classes.textField}
          value={this.state.selectedCurrency}
          onChange={this.handleChange('selectedCurrency')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your currency"
          margin="normal"
        >
        {this.renderPickItems()}
        </TextField>

        <TextField
          id="search"
          label="€"
          type="search"
          className={classes.textField}
          value={this.state.initialInput}
          margin="normal"
          onChange={this.handleChange('initialInput')}
        />

      <Button variant="contained" color="primary" className={classes.button} onClick={this.calculateValue}>
        Send
      </Button>
      <Button variant="contained" color="secondary" className={classes.button} onClick={this.clearFields}>
        Clear
      </Button>
      {test}
      
      
      </form>
    );
  }
}

inputFormUI.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(inputFormUI);