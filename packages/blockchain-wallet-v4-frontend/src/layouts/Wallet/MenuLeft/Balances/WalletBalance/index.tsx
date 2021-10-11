import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { prop } from 'ramda'
import { bindActionCreators } from 'redux'

import { getCoinsSortedByBalance } from 'components/Balances/selectors'
import { actions, selectors } from 'data'

import Template from './template'

class WalletBalanceContainer extends React.PureComponent<Props> {
  render() {
    const { coins, preferencesActions, totalBalancesDropdown } = this.props
    const isActive = prop('wallet', totalBalancesDropdown)
    return (
      <Template
        isActive={isActive}
        coins={coins}
        handleToggle={() =>
          preferencesActions.setTotalBalancesDropdown({
            key: 'wallet',
            val: !isActive
          })
        }
      />
    )
  }
}

const mapStateToProps = (state) => ({
  coins: getCoinsSortedByBalance(state).getOrElse([]),
  totalBalancesDropdown: selectors.preferences.getTotalBalancesDropdown(state)
})

const mapDispatchToProps = (dispatch) => ({
  preferencesActions: bindActionCreators(actions.preferences, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export default connector(WalletBalanceContainer)
