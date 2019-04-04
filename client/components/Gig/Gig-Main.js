import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import dateFns from 'date-fns'
import GigList from './Gig-List'
import NewGigForm from './New-Gig-Form'
import DeejayList from '../Deejay/Deejay-List'

class GigMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewNewGigForm: false,
      viewOpenGigList: false,
      viewPastGigList: false,
      viewUpcomingGigList: false,
      viewBrowseGigs: false,
      viewBrowseDeejays: false,
    }
  }

  render() {
    const { currentBooker, currentDeejay } = this.props;

    return (
      <Grid>
        <Grid.Row columns={2} textAlign="center">
          <Grid.Column>
            <Button
              onClick={() => {
                this.state.viewNewGigForm === false ?
                this.setState({ viewNewGigForm: true }) :
                this.setState({ viewNewGigForm: false })
              }}
              size="massive">
              New Booking
            </Button>
            {
              this.state.viewNewGigForm && (
                this.renderNewGigForm()
              )
            }
          </Grid.Column>
          <Grid.Column>
            <Button
              onClick={() => {
                this.state.viewOpenGigList === false ?
                this.setState({ viewOpenGigList: true }) :
                this.setState({ viewOpenGigList: false })
              }}
              size="massive">
              Open Bookings
            </Button>
            {
              this.state.viewOpenGigList && (
                this.renderOpenGigList()
              )
            }
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2} textAlign="center">
          <Grid.Column>
            <Button
              onClick={() => {
                this.state.viewPastGigList === false ?
                this.setState({ viewPastGigList: true }) :
                this.setState({ viewPastGigList: false })
              }}
              size="massive">
              Past Bookings
            </Button>
            {
              this.state.viewPastGigList && (
                this.renderPastGigList()
              )
            }
          </Grid.Column>
          <Grid.Column>
            <Button
              onClick={() => {
                this.state.viewUpcomingGigList === false ?
                this.setState({ viewUpcomingGigList: true }) :
                this.setState({ viewUpcomingGigList: false })
              }}
              size="massive">
              Upcoming Bookings
            </Button>
            {
              this.state.viewUpcomingGigList && (
                this.renderUpcomingGigList()
              )
            }
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={1} textAlign="center">
          <Grid.Column>
            {
              currentDeejay &&
            <Button
              onClick={() => {
                this.state.viewBrowseGigs === false ?
                this.setState({ viewBrowseGigs: true }) :
                this.setState({ viewBrowseGigs: false })
              }}
              size="massive">
              Browse Open Bookings
            </Button>
            }
            {
              this.state.viewBrowseGigs && (
                this.renderBrowseGigs()
              )
            }
            {
              currentBooker &&
            <Button
              onClick={() => {
                this.state.viewBrowseDeejays === false ?
                this.setState({ viewBrowseDeejays: true }) :
                this.setState({ viewBrowseDeejays: false })
              }}
              size="massive">
              Browse Deejays
            </Button>
            }
            {
              this.state.viewBrowseDeejays && (
                this.renderBrowseDeejays()
              )
            }
          </Grid.Column>
        </Grid.Row>

      </Grid>
    )
  }

  renderNewGigForm() {
    const { currentBooker, currentDeejay } = this.props;

    if (currentBooker) {
      return (
        <NewGigForm currentBooker={currentBooker} key={currentBooker.id} />
      )
    }

    else if (currentDeejay) {
      return (
        <NewGigForm currentDeejay={currentDeejay} key={currentDeejay.id} />
      )
    }
  }

  renderOpenGigList() {
    const { currentBooker, currentDeejay, gigs } = this.props;
    let openGigs;

    if (currentBooker) {
      openGigs = gigs.filter(gig => {
        return (
          gig.bookerId === currentBooker.id &&
          gig.deejayId === null &&
          this.futureDateCheck(gig)
        )
      })
      return (
        openGigs.length
        ?
        <div>
          <GigList currentBooker={currentBooker} gigs={openGigs} />
        </div>
        :
        <h3>You Have No Open Bookings Right Now</h3>
      )
    }

    else if (currentDeejay) {
      openGigs = gigs.filter(gig => {
        return (
          gig.deejayId === currentDeejay.id &&
          gig.bookerId === null &&
          this.futureDateCheck(gig)
        )
      })
      return (
        openGigs.length
        ?
        <div>
          <GigList currentDeejay={currentDeejay} gigs={openGigs} />
        </div>
        :
        <h3>You Have No Open Bookings Right Now</h3>
      )
    }
  }

  renderPastGigList() {
    const { currentBooker, currentDeejay, gigs } = this.props;
    let pastGigs;

    if (currentBooker) {
      pastGigs = gigs.filter(gig => {
        return (
          gig.bookerId === currentBooker.id &&
          this.pastDateCheck(gig)
        )
      })
      return (
        pastGigs.length
        ?
        <div>
          <GigList currentBooker={currentBooker} gigs={pastGigs} />
        </div>
        :
        <h3>You Have No Past Gigs Yet</h3>
      )
    }

    else if (currentDeejay) {
      pastGigs = gigs.filter(gig => {
        return (
          gig.deejayId === currentDeejay.id &&
          this.pastDateCheck(gig)
        )
      })
      return (
        pastGigs.length
        ?
        <div>
          <GigList currentDeejay={currentDeejay } gigs={pastGigs} />
        </div>
        :
        <h3>You Have No Past Gigs Yet</h3>
      )
    }
  }

  renderUpcomingGigList() {
    const { currentBooker, currentDeejay, gigs } = this.props;
    let upcomingGigs;

    if (currentBooker) {
      upcomingGigs = gigs.filter(gig => {
        return (
          gig.bookerId === currentBooker.id &&
          gig.deejayId !== null &&
          this.futureDateCheck(gig)
        )
      })
      return (
        upcomingGigs.length
        ?
        <div>
         <GigList currentBooker={currentBooker} gigs={upcomingGigs} />
        </div>
        :
        <h3>You Have No Upcoming Bookings Right Now</h3>
      )
    }

    else if (currentDeejay) {
      upcomingGigs = gigs.filter(gig => {
        return (
          gig.deejayId === currentDeejay.id &&
          gig.bookerId !== null &&
          this.futureDateCheck(gig)
        )
      })
      return (
        upcomingGigs.length
        ?
        <div>
         <GigList currentDeejay={currentDeejay} gigs={upcomingGigs} />
        </div>
        :
        <h3>You Have No Upcoming Bookings Right Now</h3>
      )
    }
  }

  renderBrowseDeejays() {
    const { deejays, currentBooker } = this.props;
    return (
      <DeejayList deejays={deejays} currentBooker={currentBooker} />
    )
  }

  renderBrowseGigs() {
    const { currentDeejay, gigs } = this.props;

    if (currentDeejay) {
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
        <div>
          <GigList currentDeejay={currentDeejay} gigs={openGigs} />
        </div>
      )
    }
  }

  pastDateCheck(gig) {
    let gigDateArr = gig.date.split('/')
    let gigYear = gigDateArr[0]
    let gigMonth = gigDateArr[1]
    let gigDate = gigDateArr[2]
    return dateFns.isBefore(new Date(gigYear, gigMonth, gigDate), Date.now())
  }

  futureDateCheck(gig) {
    let gigDateArr = gig.date.split('/')
    let gigYear = gigDateArr[0]
    let gigMonth = gigDateArr[1]
    let gigDate = gigDateArr[2]
    return dateFns.isAfter(new Date(gigYear, gigMonth, gigDate), Date.now())
  }

}

const mapState = ({ gigs, deejays }) => ({ gigs, deejays });
const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(GigMain))
