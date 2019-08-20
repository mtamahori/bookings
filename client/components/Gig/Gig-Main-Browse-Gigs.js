import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { FilterGigs } from '../index'
import dateFns from 'date-fns'
require('../../../public/stylesheets/sidebar.css')

// FOR DEEJAYS
// BROWSE OPEN GIGS
// RENDERED IN DeejayMain

class BrowseGigList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      view: false
    }
  }

  render() {
    return (
      <div>
        <Button
          onClick={() => this.setState(state => ({
            view: !state.view
          }))}
          size="massive"
        >Browse Gigs
        </Button>
        {
          this.state.view && this.renderBrowseGigs()
        }
      </div>
    )
  }

  renderBrowseGigs() {
    const { gigs, currentDeejay } = this.props;

    let openGigs = gigs.filter(gig => {
      return (
        gig.deejayId === null &&
        gig.deejayInvites.indexOf(currentDeejay.id) === -1 &&
        gig.deejayApplicants.indexOf(currentDeejay.id) === -1 &&
        gig.declinedApps.indexOf(currentDeejay.id) === -1 &&
        gig.declinedInvs.indexOf(currentDeejay.id) === -1 &&
        this.futureDateCheck(gig)
      )
    })

    return (
      <FilterGigs gigs={openGigs} currentDeejay={currentDeejay} />
    )
  }

  futureDateCheck(gig) {
    let gigDateArr = gig.date.split('/')
    let gigYear = gigDateArr[0]
    let gigMonth = gigDateArr[1]
    let gigDate = gigDateArr[2]
    return dateFns.isAfter(new Date(gigYear, gigMonth, gigDate), Date.now())
  }
}

export default BrowseGigList
