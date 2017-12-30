import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './Details.scss'
import {isEmpty} from 'lodash'
/* eslint-disable camelcase */

class SpeciesComponent extends Component {
  createSpeciesViewModels (stream) {
    const {
      has_brook_trout,
      has_brown_trout,
      has_rainbow_trout,
      is_brook_trout_stocked,
      is_brown_trout_stocked,
      is_rainbow_trout_stocked,
    } = stream.properties

    return [
      {
        'name': 'Brook Trout',
        'present': has_brook_trout,
        'stocked': is_brook_trout_stocked,
        'className': 'brookTrout',
      },
      {
        'name': 'Brown Trout',
        'present': has_brown_trout,
        'stocked': is_brown_trout_stocked,
        'className': 'brownTrout',
      },
      {
        'name': 'Rainbow Trout',
        'present': has_rainbow_trout,
        'stocked': is_rainbow_trout_stocked,
        'className': 'rainbowTrout',
      },
    ]
  }

  renderSpeciesElement (viewModel, isFirstThingInSentence = false) {
    const {name, stocked, className} = viewModel
    const stockedPrefix = isFirstThingInSentence ? 'Stocked' : 'stocked'
    const text = stocked ? `${stockedPrefix} ${name}` : name
    const cssClass = classes[className]
    return (<mark className={cssClass}>{text}</mark>)
  }

  renderSpeciesBody (viewModels) {
    if (isEmpty(viewModels)) {
      return (<span>Unknown.</span>)
    }
    const count = viewModels.length
    if (count === 1) {
      return (<span>{this.renderSpeciesElement(viewModels[0], true)}.</span>)
    }

    if (count === 2) {
      const first = this.renderSpeciesElement(viewModels[0], true)
      const second = this.renderSpeciesElement(viewModels[1])
      return (<span>{first} and {second}.</span>)
    }

    // Mom would be so proud
    const oxfordCommaList = viewModels.map((viewModel, index) => {
      const isFirstItem = index === 0
      const isLastItem = index === count - 1
      const speciesElement = this.renderSpeciesElement(viewModel, isFirstItem)
      if (isFirstItem) {
        return <span key={viewModel.name}>{speciesElement}</span>
      }

      if (isLastItem === false) {
        return <span key={viewModel.name}>, {speciesElement}</span>
      }

      return <span key={viewModel.name}>, and {speciesElement}.</span>
    })

    return oxfordCommaList
  }

  renderSpecies () {
    const {selectedStream} = this.props
    const speciesViewModels = this.createSpeciesViewModels(selectedStream.stream)

    const viewModels = speciesViewModels.filter((x) => x.present)
    const body = this.renderSpeciesBody(viewModels)
    return (<div>
      <div className={classes.title}>Species</div>
      <div className={classes.species}>
        {body}
      </div>
    </div>)
  }

  render () {
    return this.renderSpecies()
  }
}

SpeciesComponent.propTypes = {'selectedStream': PropTypes.object}

export default SpeciesComponent
