import React from 'react'
import classes from './List.scss'
// import BubbleComponent from './Bubble.component'
import StreamItemComponent from './streamItem/StreamItem.component'
const FAKE_STREAMS = [
  'asdfasdf',
  'Trout_Run_Creek',
  'Lost_Creek',
  'Root_River_South_Branch',
  'Root_River_Middle_Branch',
  'Cold_Spring_Brook',
  'Beaver_Creek_West',
  'Trib_5_to_Crooked_Creek',
  'Tributary_10_to_Whitewater_River',
  'Gernander_Creek',
  'Rollingstone_Creek_Middle_Branch',
  'asdfasdf',
  'Trout_Run_Creek',
  'Lost_Creek',
  'Root_River_South_Branch',
  'Root_River_Middle_Branch',
  'Cold_Spring_Brook',
  'Beaver_Creek_West',
  'Trib_5_to_Crooked_Creek',
  'Tributary_10_to_Whitewater_River',
  'Gernander_Creek',
  'Rollingstone_Creek_Middle_Branch',
  'asdfasdf',
  'Trout_Run_Creek',
  'Lost_Creek',
  'Root_River_South_Branch',
  'Root_River_Middle_Branch',
  'Cold_Spring_Brook',
  'Beaver_Creek_West',
  'Trib_5_to_Crooked_Creek',
  'Tributary_10_to_Whitewater_River',
  'Gernander_Creek',
  'Rollingstone_Creek_Middle_Branch',
  'asdfasdf',
  'Trout_Run_Creek',
  'Lost_Creek',
  'Root_River_South_Branch',
  'Root_River_Middle_Branch',
  'Cold_Spring_Brook',
  'Beaver_Creek_West',
  'Trib_5_to_Crooked_Creek',
  'Tributary_10_to_Whitewater_River',
  'Gernander_Creek',
  'Rollingstone_Creek_Middle_Branch',
  'asdfasdf',
  'Trout_Run_Creek',
  'Lost_Creek',
  'Root_River_South_Branch',
  'Root_River_Middle_Branch',
  'Cold_Spring_Brook',
  'Beaver_Creek_West',
  'Trib_5_to_Crooked_Creek',
  'Tributary_10_to_Whitewater_River',
  'Gernander_Creek',
  'Rollingstone_Creek_Middle_Branch',
  'asdfasdf',
  'Trout_Run_Creek',
  'Lost_Creek',
  'Root_River_South_Branch',
  'Root_River_Middle_Branch',
  'Cold_Spring_Brook',
  'Beaver_Creek_West',
  'Trib_5_to_Crooked_Creek',
  'Tributary_10_to_Whitewater_River',
  'Gernander_Creek',
  'Rollingstone_Creek_Middle_Branch',
  'asdfasdf',
  'Trout_Run_Creek',
  'Lost_Creek',
  'Root_River_South_Branch',
  'Root_River_Middle_Branch',
  'Cold_Spring_Brook',
  'Beaver_Creek_West',
  'Trib_5_to_Crooked_Creek',
  'Tributary_10_to_Whitewater_River',
  'Gernander_Creek',
  'Rollingstone_Creek_Middle_Branch',
  'Unnamed_Creek'
]
const StreamListComponent = React.createClass({
  propTypes: {
    // children: React.PropTypes.element
    // streams: PropTypes.array.isRequired,
    // getSouthEasternStreams: PropTypes.func.isRequired
  },

  renderNonsenseContent () {
    return (
      <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at mi nec sem euismod tincidunt. Donec consequat quis leo eu viverra. Morbi sagittis iaculis magna, nec semper velit viverra a. Morbi ut hendrerit mauris. Phasellus vel est metus. Sed feugiat vehicula augue, non commodo ligula finibus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi volutpat velit nec placerat tristique. Phasellus elementum, eros convallis tincidunt convallis, felis eros imperdiet tortor, non molestie lorem tortor scelerisque est.
      </p>

      <p>
        Praesent varius augue ac velit bibendum, a bibendum justo congue. Sed luctus laoreet quam, et viverra augue. Vivamus at interdum purus. Etiam pulvinar convallis convallis. Cras quis lectus et arcu rutrum tristique quis sit amet sem. Nam sapien nunc, scelerisque vitae ullamcorper eget, hendrerit nec massa. Cras cursus est ligula, mattis tempus purus cursus vel. Proin ac faucibus diam. Aliquam a nisi tempor, laoreet arcu in, semper mauris. Sed laoreet sem erat. Sed a finibus augue. Nam dictum sollicitudin quam, sit amet accumsan nulla facilisis nec. Vestibulum dignissim, diam sed malesuada volutpat, orci metus pellentesque nunc, quis tristique dolor tortor eu risus. Sed vulputate ante vitae pretium condimentum.
      </p>)

      <p>
        Vestibulum tincidunt sapien sed tortor tempor, vel finibus eros eleifend. Cras mauris ante, aliquet at erat at, lacinia ultricies ante. Curabitur odio massa, imperdiet nec urna eu, venenatis varius ante. Sed auctor ipsum id odio dapibus posuere. Integer fringilla quam massa, at molestie mi congue ut. In magna augue, condimentum et placerat vel, pharetra et dui. In libero lorem, sagittis vitae ipsum accumsan, tincidunt vestibulum sem. Sed elementum accumsan quam, quis commodo ipsum lobortis at. Nam consectetur posuere est a porta. In fringilla ipsum ac nisi consectetur commodo. Ut maximus lorem elit, quis blandit est congue sit amet. Pellentesque eget auctor nunc. Mauris efficitur justo metus, et facilisis augue porta condimentum. Suspendisse ornare purus sit amet nisl vehicula, et placerat nibh porta. Nam mattis molestie orci ut iaculis. Proin quis erat sit amet mi efficitur sollicitudin a rutrum ante.
      </p>

      <p>
        Sed bibendum vehicula lacus sed pulvinar. Fusce vestibulum purus vitae dignissim volutpat. Vestibulum porttitor malesuada neque, ac eleifend nisi. Ut egestas elit eu varius condimentum. Aliquam sollicitudin diam quis elementum ultrices. Morbi convallis lobortis turpis at venenatis. Proin sit amet faucibus sem. Aliquam nisi ligula, accumsan quis augue ut, lobortis feugiat ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum eget turpis facilisis, laoreet turpis ut, vulputate est. Praesent tempus venenatis tellus eget malesuada. Sed molestie maximus turpis, ac ultricies turpis feugiat condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus.
      </p>

      <p>
        Nulla eros mauris, placerat quis turpis vitae, porttitor sagittis ligula. Pellentesque at arcu purus. Ut nibh quam, faucibus nec felis ornare, gravida sollicitudin enim. In tristique elit vel dui ultrices, non scelerisque massa fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet ultricies ligula. Integer congue vel felis eget porttitor. Sed a ligula eget dolor volutpat venenatis. Vestibulum volutpat diam in orci pharetra, vitae venenatis massa dignissim.
      </p>

      <p>
        In in erat at dolor iaculis venenatis. Integer interdum est vitae blandit accumsan. Proin non laoreet est. Phasellus commodo ipsum ac nisi tincidunt feugiat. Donec sit amet tortor dictum, ornare metus vitae, hendrerit orci. Nulla ac ullamcorper neque, ac condimentum nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean aliquam ex at interdum pulvinar. Quisque volutpat, orci lacinia dignissim venenatis, nibh felis facilisis elit, at venenatis enim justo ut enim. Cras maximus elit nec lacus suscipit, ac rutrum dolor viverra. Curabitur enim purus, mattis at luctus quis, gravida vel mauris. Integer ac mi id felis sollicitudin dapibus.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at mi nec sem euismod tincidunt. Donec consequat quis leo eu viverra. Morbi sagittis iaculis magna, nec semper velit viverra a. Morbi ut hendrerit mauris. Phasellus vel est metus. Sed feugiat vehicula augue, non commodo ligula finibus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi volutpat velit nec placerat tristique. Phasellus elementum, eros convallis tincidunt convallis, felis eros imperdiet tortor, non molestie lorem tortor scelerisque est.
      </p>

      <p>
        Praesent varius augue ac velit bibendum, a bibendum justo congue. Sed luctus laoreet quam, et viverra augue. Vivamus at interdum purus. Etiam pulvinar convallis convallis. Cras quis lectus et arcu rutrum tristique quis sit amet sem. Nam sapien nunc, scelerisque vitae ullamcorper eget, hendrerit nec massa. Cras cursus est ligula, mattis tempus purus cursus vel. Proin ac faucibus diam. Aliquam a nisi tempor, laoreet arcu in, semper mauris. Sed laoreet sem erat. Sed a finibus augue. Nam dictum sollicitudin quam, sit amet accumsan nulla facilisis nec. Vestibulum dignissim, diam sed malesuada volutpat, orci metus pellentesque nunc, quis tristique dolor tortor eu risus. Sed vulputate ante vitae pretium condimentum.
      </p>)

      <p>
        Vestibulum tincidunt sapien sed tortor tempor, vel finibus eros eleifend. Cras mauris ante, aliquet at erat at, lacinia ultricies ante. Curabitur odio massa, imperdiet nec urna eu, venenatis varius ante. Sed auctor ipsum id odio dapibus posuere. Integer fringilla quam massa, at molestie mi congue ut. In magna augue, condimentum et placerat vel, pharetra et dui. In libero lorem, sagittis vitae ipsum accumsan, tincidunt vestibulum sem. Sed elementum accumsan quam, quis commodo ipsum lobortis at. Nam consectetur posuere est a porta. In fringilla ipsum ac nisi consectetur commodo. Ut maximus lorem elit, quis blandit est congue sit amet. Pellentesque eget auctor nunc. Mauris efficitur justo metus, et facilisis augue porta condimentum. Suspendisse ornare purus sit amet nisl vehicula, et placerat nibh porta. Nam mattis molestie orci ut iaculis. Proin quis erat sit amet mi efficitur sollicitudin a rutrum ante.
      </p>

      <p>
        Sed bibendum vehicula lacus sed pulvinar. Fusce vestibulum purus vitae dignissim volutpat. Vestibulum porttitor malesuada neque, ac eleifend nisi. Ut egestas elit eu varius condimentum. Aliquam sollicitudin diam quis elementum ultrices. Morbi convallis lobortis turpis at venenatis. Proin sit amet faucibus sem. Aliquam nisi ligula, accumsan quis augue ut, lobortis feugiat ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum eget turpis facilisis, laoreet turpis ut, vulputate est. Praesent tempus venenatis tellus eget malesuada. Sed molestie maximus turpis, ac ultricies turpis feugiat condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus.
      </p>

      <p>
        Nulla eros mauris, placerat quis turpis vitae, porttitor sagittis ligula. Pellentesque at arcu purus. Ut nibh quam, faucibus nec felis ornare, gravida sollicitudin enim. In tristique elit vel dui ultrices, non scelerisque massa fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet ultricies ligula. Integer congue vel felis eget porttitor. Sed a ligula eget dolor volutpat venenatis. Vestibulum volutpat diam in orci pharetra, vitae venenatis massa dignissim.
      </p>

      <p>
        In in erat at dolor iaculis venenatis. Integer interdum est vitae blandit accumsan. Proin non laoreet est. Phasellus commodo ipsum ac nisi tincidunt feugiat. Donec sit amet tortor dictum, ornare metus vitae, hendrerit orci. Nulla ac ullamcorper neque, ac condimentum nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean aliquam ex at interdum pulvinar. Quisque volutpat, orci lacinia dignissim venenatis, nibh felis facilisis elit, at venenatis enim justo ut enim. Cras maximus elit nec lacus suscipit, ac rutrum dolor viverra. Curabitur enim purus, mattis at luctus quis, gravida vel mauris. Integer ac mi id felis sollicitudin dapibus.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at mi nec sem euismod tincidunt. Donec consequat quis leo eu viverra. Morbi sagittis iaculis magna, nec semper velit viverra a. Morbi ut hendrerit mauris. Phasellus vel est metus. Sed feugiat vehicula augue, non commodo ligula finibus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi volutpat velit nec placerat tristique. Phasellus elementum, eros convallis tincidunt convallis, felis eros imperdiet tortor, non molestie lorem tortor scelerisque est.
      </p>

      <p>
        Praesent varius augue ac velit bibendum, a bibendum justo congue. Sed luctus laoreet quam, et viverra augue. Vivamus at interdum purus. Etiam pulvinar convallis convallis. Cras quis lectus et arcu rutrum tristique quis sit amet sem. Nam sapien nunc, scelerisque vitae ullamcorper eget, hendrerit nec massa. Cras cursus est ligula, mattis tempus purus cursus vel. Proin ac faucibus diam. Aliquam a nisi tempor, laoreet arcu in, semper mauris. Sed laoreet sem erat. Sed a finibus augue. Nam dictum sollicitudin quam, sit amet accumsan nulla facilisis nec. Vestibulum dignissim, diam sed malesuada volutpat, orci metus pellentesque nunc, quis tristique dolor tortor eu risus. Sed vulputate ante vitae pretium condimentum.
      </p>)

      <p>
        Vestibulum tincidunt sapien sed tortor tempor, vel finibus eros eleifend. Cras mauris ante, aliquet at erat at, lacinia ultricies ante. Curabitur odio massa, imperdiet nec urna eu, venenatis varius ante. Sed auctor ipsum id odio dapibus posuere. Integer fringilla quam massa, at molestie mi congue ut. In magna augue, condimentum et placerat vel, pharetra et dui. In libero lorem, sagittis vitae ipsum accumsan, tincidunt vestibulum sem. Sed elementum accumsan quam, quis commodo ipsum lobortis at. Nam consectetur posuere est a porta. In fringilla ipsum ac nisi consectetur commodo. Ut maximus lorem elit, quis blandit est congue sit amet. Pellentesque eget auctor nunc. Mauris efficitur justo metus, et facilisis augue porta condimentum. Suspendisse ornare purus sit amet nisl vehicula, et placerat nibh porta. Nam mattis molestie orci ut iaculis. Proin quis erat sit amet mi efficitur sollicitudin a rutrum ante.
      </p>

      <p>
        Sed bibendum vehicula lacus sed pulvinar. Fusce vestibulum purus vitae dignissim volutpat. Vestibulum porttitor malesuada neque, ac eleifend nisi. Ut egestas elit eu varius condimentum. Aliquam sollicitudin diam quis elementum ultrices. Morbi convallis lobortis turpis at venenatis. Proin sit amet faucibus sem. Aliquam nisi ligula, accumsan quis augue ut, lobortis feugiat ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum eget turpis facilisis, laoreet turpis ut, vulputate est. Praesent tempus venenatis tellus eget malesuada. Sed molestie maximus turpis, ac ultricies turpis feugiat condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus.
      </p>

      <p>
        Nulla eros mauris, placerat quis turpis vitae, porttitor sagittis ligula. Pellentesque at arcu purus. Ut nibh quam, faucibus nec felis ornare, gravida sollicitudin enim. In tristique elit vel dui ultrices, non scelerisque massa fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet ultricies ligula. Integer congue vel felis eget porttitor. Sed a ligula eget dolor volutpat venenatis. Vestibulum volutpat diam in orci pharetra, vitae venenatis massa dignissim.
      </p>

      <p>
        In in erat at dolor iaculis venenatis. Integer interdum est vitae blandit accumsan. Proin non laoreet est. Phasellus commodo ipsum ac nisi tincidunt feugiat. Donec sit amet tortor dictum, ornare metus vitae, hendrerit orci. Nulla ac ullamcorper neque, ac condimentum nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean aliquam ex at interdum pulvinar. Quisque volutpat, orci lacinia dignissim venenatis, nibh felis facilisis elit, at venenatis enim justo ut enim. Cras maximus elit nec lacus suscipit, ac rutrum dolor viverra. Curabitur enim purus, mattis at luctus quis, gravida vel mauris. Integer ac mi id felis sollicitudin dapibus.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at mi nec sem euismod tincidunt. Donec consequat quis leo eu viverra. Morbi sagittis iaculis magna, nec semper velit viverra a. Morbi ut hendrerit mauris. Phasellus vel est metus. Sed feugiat vehicula augue, non commodo ligula finibus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi volutpat velit nec placerat tristique. Phasellus elementum, eros convallis tincidunt convallis, felis eros imperdiet tortor, non molestie lorem tortor scelerisque est.
      </p>

      <p>
        Praesent varius augue ac velit bibendum, a bibendum justo congue. Sed luctus laoreet quam, et viverra augue. Vivamus at interdum purus. Etiam pulvinar convallis convallis. Cras quis lectus et arcu rutrum tristique quis sit amet sem. Nam sapien nunc, scelerisque vitae ullamcorper eget, hendrerit nec massa. Cras cursus est ligula, mattis tempus purus cursus vel. Proin ac faucibus diam. Aliquam a nisi tempor, laoreet arcu in, semper mauris. Sed laoreet sem erat. Sed a finibus augue. Nam dictum sollicitudin quam, sit amet accumsan nulla facilisis nec. Vestibulum dignissim, diam sed malesuada volutpat, orci metus pellentesque nunc, quis tristique dolor tortor eu risus. Sed vulputate ante vitae pretium condimentum.
      </p>)

      <p>
        Vestibulum tincidunt sapien sed tortor tempor, vel finibus eros eleifend. Cras mauris ante, aliquet at erat at, lacinia ultricies ante. Curabitur odio massa, imperdiet nec urna eu, venenatis varius ante. Sed auctor ipsum id odio dapibus posuere. Integer fringilla quam massa, at molestie mi congue ut. In magna augue, condimentum et placerat vel, pharetra et dui. In libero lorem, sagittis vitae ipsum accumsan, tincidunt vestibulum sem. Sed elementum accumsan quam, quis commodo ipsum lobortis at. Nam consectetur posuere est a porta. In fringilla ipsum ac nisi consectetur commodo. Ut maximus lorem elit, quis blandit est congue sit amet. Pellentesque eget auctor nunc. Mauris efficitur justo metus, et facilisis augue porta condimentum. Suspendisse ornare purus sit amet nisl vehicula, et placerat nibh porta. Nam mattis molestie orci ut iaculis. Proin quis erat sit amet mi efficitur sollicitudin a rutrum ante.
      </p>

      <p>
        Sed bibendum vehicula lacus sed pulvinar. Fusce vestibulum purus vitae dignissim volutpat. Vestibulum porttitor malesuada neque, ac eleifend nisi. Ut egestas elit eu varius condimentum. Aliquam sollicitudin diam quis elementum ultrices. Morbi convallis lobortis turpis at venenatis. Proin sit amet faucibus sem. Aliquam nisi ligula, accumsan quis augue ut, lobortis feugiat ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum eget turpis facilisis, laoreet turpis ut, vulputate est. Praesent tempus venenatis tellus eget malesuada. Sed molestie maximus turpis, ac ultricies turpis feugiat condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus.
      </p>

      <p>
        Nulla eros mauris, placerat quis turpis vitae, porttitor sagittis ligula. Pellentesque at arcu purus. Ut nibh quam, faucibus nec felis ornare, gravida sollicitudin enim. In tristique elit vel dui ultrices, non scelerisque massa fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet ultricies ligula. Integer congue vel felis eget porttitor. Sed a ligula eget dolor volutpat venenatis. Vestibulum volutpat diam in orci pharetra, vitae venenatis massa dignissim.
      </p>

      <p>
        In in erat at dolor iaculis venenatis. Integer interdum est vitae blandit accumsan. Proin non laoreet est. Phasellus commodo ipsum ac nisi tincidunt feugiat. Donec sit amet tortor dictum, ornare metus vitae, hendrerit orci. Nulla ac ullamcorper neque, ac condimentum nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean aliquam ex at interdum pulvinar. Quisque volutpat, orci lacinia dignissim venenatis, nibh felis facilisis elit, at venenatis enim justo ut enim. Cras maximus elit nec lacus suscipit, ac rutrum dolor viverra. Curabitur enim purus, mattis at luctus quis, gravida vel mauris. Integer ac mi id felis sollicitudin dapibus.
      </p>
      </div>)
  },

  // componentDidMount () {
  //   this.props.getSouthEasternStreams()
  // }
// {FAKE_STREAMS.map((stream, index) => {
//             let url = stream.replace(' ', '_')
//             return (
//               <li key={index}>
//                 <StreamItemComponent
//                   title={stream}
//                   url={`/mn/asdf/${url}`} />
//               </li>)
//           })
//           }

 
  render () {
    return (
      <div className={classes.listViewContainer}>
        <div className={classes.list}>
           {this.renderNonsenseContent()}
         </div>
      </div>)
  }
})

export default StreamListComponent
