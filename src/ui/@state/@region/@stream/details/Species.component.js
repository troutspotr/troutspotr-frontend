import React, { PropTypes } from 'react'
import classes from './Details.scss'
import { isEmpty } from 'lodash'
/* eslint-disable camelcase */

const SpeciesComponent = React.createClass({
  propTypes: {
    selectedStream: PropTypes.object
  },

  createSpeciesViewModels (stream) {
    let { has_brook_trout,
      has_brown_trout,
      has_rainbow_trout,
      is_brook_trout_stocked,
      is_brown_trout_stocked,
      is_rainbow_trout_stocked } = stream.properties

    return [
      {
        name: 'Brook Trout',
        present: has_brook_trout,
        stocked: is_brook_trout_stocked,
        className: 'brookTrout'
      },
      {
        name: 'Brown Trout',
        present: has_brown_trout,
        stocked: is_brown_trout_stocked,
        className: 'brownTrout'
      },
      {
        name: 'Rainbow Trout',
        present: has_rainbow_trout,
        stocked: is_rainbow_trout_stocked,
        className: 'rainbowTrout'
      }]
  },

  renderSpeciesElement (viewModel, isFirstThingInSentence = false) {
    let { name, stocked, className } = viewModel
    let stockedPrefix = isFirstThingInSentence ? 'Stocked' : 'stocked'
    let text = stocked ? `${stockedPrefix} ${name}` : name
    let cssClass = classes[className]
    return (<mark className={cssClass}>{text}</mark>)
  },

  renderSpeciesBody (viewModels) {
    if (isEmpty(viewModels)) {
      return (<span>Unknown.</span>)
    }
    let count = viewModels.length
    if (count === 1) {
      return (<span>{this.renderSpeciesElement(viewModels[0], true)}.</span>)
    }

    if (count === 2) {
      let first = this.renderSpeciesElement(viewModels[0], true)
      let second = this.renderSpeciesElement(viewModels[1])
      return (<span>{first} and {second}.</span>)
    }

    // mom would be so proud
    let oxfordCommaList = viewModels.map((viewModel, index) => {
      let isFirstItem = index === 0
      let isLastItem = index === count - 1
      let speciesElement = this.renderSpeciesElement(viewModel, isFirstItem)
      if (isFirstItem) {
        return <span key={index}>{speciesElement}</span>
      }

      if (isLastItem === false) {
        return <span key={index}>, {speciesElement}</span>
      }

      return <span key={index}>, and {speciesElement}.</span>
    })

    return oxfordCommaList
  },

  renderSpecies () {
    let { selectedStream } = this.props
    let speciesViewModels = this.createSpeciesViewModels(selectedStream.stream)

    let viewModels = speciesViewModels.filter(x => x.present)
    let body = this.renderSpeciesBody(viewModels)
    return (<div>
      <div className={classes.title}>Species</div>
      <div className={classes.species}>
        {body}
      </div>
    </div>)
  },

  render () {
    return this.renderSpecies()
  }
})
export default SpeciesComponent
