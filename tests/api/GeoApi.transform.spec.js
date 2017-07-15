import StateData from 'static/data/v2/wi/wi.data.json'
import RegionData from 'static/data/v2/wi/highland-headwaters.topo.json'
import * as GeoApiTransform from 'api/GeoApi.transform'
import { updateStateObject } from 'api/StateApi'
import _ from 'lodash'

describe('api/GeoApi.transform', () => {
  let stateData = null
  let regionData = null
  let fakeStreamWithAccessPoints = null
  let fakeAccessPoints = null
  beforeEach(() => {
    stateData = updateStateObject(_.cloneDeep(StateData))
    regionData = updateStateObject(_.cloneDeep(RegionData))
    fakeStreamWithAccessPoints = {
      id: 0,
      geometry: {},
      properties: _.cloneDeep(STREAM_GEOJSON_PROPERTIES)
    }

    fakeAccessPoints = _.cloneDeep(ACCESS_POINTS)
  })

  after(() => {

  })

  describe('transformGeo', () => {
    it('works', async () => {
      let results = await GeoApiTransform.transformGeo(regionData, stateData)
      expect(results).to.be.an('object').that.has.all.keys('streamDictionary',
        'geoJsonObjects')
    })
  })

  describe('decompress', () => {
    it('works', async () => {
      let results = await GeoApiTransform.decompress(regionData, stateData)
      expect(results).to.be.an('object').that.has.all.keys('boundingCircle',
        'pal',
        'pal_routes',
        'restriction_section',
        'streamProperties',
        'stream_access_point',
        'tributary',
        'trout_stream_section')
    })
  })

  describe('provideRoadCrossingText', () => {
    it('road crossing text is added to stream', async () => {
      // arrange
      const newProperties = GeoApiTransform.provideRoadCrossingText(fakeStreamWithAccessPoints, fakeAccessPoints)

      // assert
      expect(newProperties).to.be.an('object').that.has.all
        .keys('bridgeText',
          'publicTroutBridgeCount',
          'permissionRequiredBridgeCount',
          'unsafeBridgeCount',
          'uninterestingBridgeCount')
    })

    it('returns empty for no roads', () => {
      // arrange
      fakeAccessPoints.forEach(ap => { ap.properties.bridgeType = 'permissionRequired' })
      const newProperties = GeoApiTransform.provideRoadCrossingText(fakeStreamWithAccessPoints, fakeAccessPoints)

      // assert
      expect(newProperties.publicTroutBridgeCount).to.equal(0)
      expect(newProperties.permissionRequiredBridgeCount).to.equal(fakeAccessPoints.length)
      expect(newProperties.bridgeText).to.have.string(GeoApiTransform.NONE_TEXT)
    })

    it('uses singular correctly', () => {
      // arrange
      fakeAccessPoints.forEach(ap => { ap.properties.bridgeType = 'permissionRequired' })
      fakeAccessPoints[0].properties.bridgeType = 'publicTrout'

      // act
      const newProperties = GeoApiTransform.provideRoadCrossingText(fakeStreamWithAccessPoints, fakeAccessPoints)

      // assert
      expect(newProperties.publicTroutBridgeCount).to.equal(1)
      expect(newProperties.permissionRequiredBridgeCount).to.equal(fakeAccessPoints.length - 1)
      expect(newProperties.bridgeText).to.have.string(GeoApiTransform.SINGLE_TEXT)
    })

    it('uses many case correctly', () => {
      // arrange
      fakeAccessPoints.forEach(ap => { ap.properties.bridgeType = 'publicTrout' })

      // act
      const newProperties = GeoApiTransform.provideRoadCrossingText(fakeStreamWithAccessPoints, fakeAccessPoints)

      // assert
      expect(newProperties.publicTroutBridgeCount).to.equal(fakeAccessPoints.length)
      expect(newProperties.permissionRequiredBridgeCount).to.equal(0)
      expect(newProperties.bridgeText).to.have.string(GeoApiTransform.MANY_TEXT)
    })

    it('still works with empty road crossings', () => {
      // arrange
      fakeAccessPoints = []

      // act
      const newProperties = GeoApiTransform.provideRoadCrossingText(fakeStreamWithAccessPoints, fakeAccessPoints)

      // assert
      expect(newProperties.publicTroutBridgeCount).to.equal(fakeAccessPoints.length)
      expect(newProperties.permissionRequiredBridgeCount).to.equal(0)
      expect(newProperties.bridgeText).to.have.string(GeoApiTransform.NONE_TEXT)
    })
  })
})

const ACCESS_POINTS = [
  {
    'type':'Feature',
    'id':3,
    'properties':{
      'gid':181518,
      'street_name':'Nelson Avenue',
      'stream_gid':85506,
      'linear_offset':0.7718,
      'is_over_publicly_accessible_land':false,
      'road_gid':8812607,
      'centroid_latitude':45.33728,
      'centroid_longitude':-89.6203,
      'is_over_trout_stream':true,
      'distance_to_previous_neighbor':0.672,
      'is_previous_neighbor_same_road':false,
      'road_type_id':464,
      'isParkable':true,
      'bridgeType':'permissionRequired',
      'alphabetLetter':'A',
      'slug':'nelson-avenue@0.7718'
    },
    'geometry':{
      'type':'Point',
      'coordinates':[
        -89.62030870823759,
        45.337276920031506
      ]
    }
  },
  {
    'type':'Feature',
    'id':1,
    'properties':{
      'gid':181520,
      'street_name':'Langes Road',
      'stream_gid':85506,
      'linear_offset':0.6412,
      'is_over_publicly_accessible_land':false,
      'road_gid':8833122,
      'centroid_latitude':45.33821,
      'centroid_longitude':-89.60987,
      'is_over_trout_stream':true,
      'distance_to_previous_neighbor':1.573,
      'is_previous_neighbor_same_road':false,
      'road_type_id':464,
      'isParkable':true,
      'bridgeType':'permissionRequired',
      'alphabetLetter':'B',
      'slug':'langes-road@0.6412'
    },
    'geometry':{
      'type':'Point',
      'coordinates':[
        -89.60987018402206,
        45.33820371655817
      ]
    }
  },
  {
    'type':'Feature',
    'id':4,
    'properties':{
      'gid':181517,
      'street_name':'County Road J',
      'stream_gid':85506,
      'linear_offset':0.3355,
      'is_over_publicly_accessible_land':false,
      'road_gid':8809973,
      'centroid_latitude':45.35174,
      'centroid_longitude':-89.59094,
      'is_over_trout_stream':true,
      'distance_to_previous_neighbor':0.095,
      'is_previous_neighbor_same_road':false,
      'road_type_id':464,
      'isParkable':true,
      'bridgeType':'permissionRequired',
      'alphabetLetter':'C',
      'slug':'county-road-j@0.3355'
    },
    'geometry':{
      'type':'Point',
      'coordinates':[
        -89.59092891825068,
        45.35173844319286
      ]
    }
  },
  {
    'type':'Feature',
    'id':2,
    'properties':{
      'gid':181519,
      'street_name':'Neider Road',
      'stream_gid':85506,
      'linear_offset':0.317,
      'is_over_publicly_accessible_land':false,
      'road_gid':8813188,
      'centroid_latitude':45.35228,
      'centroid_longitude':-89.58975,
      'is_over_trout_stream':true,
      'distance_to_previous_neighbor':1.204,
      'is_previous_neighbor_same_road':false,
      'road_type_id':464,
      'isParkable':true,
      'bridgeType':'permissionRequired',
      'alphabetLetter':'D',
      'slug':'neider-road@0.317'
    },
    'geometry':{
      'type':'Point',
      'coordinates':[
        -89.58975274650808,
        45.35228053172732
      ]
    }
  },
  {
    'type':'Feature',
    'id':0,
    'properties':{
      'gid':181521,
      'street_name':'Grundy Road',
      'stream_gid':85506,
      'linear_offset':0.0828,
      'is_over_publicly_accessible_land':true,
      'road_gid':8833211,
      'centroid_latitude':45.35429,
      'centroid_longitude':-89.56922,
      'is_over_trout_stream':true,
      'distance_to_previous_neighbor':null,
      'is_previous_neighbor_same_road':false,
      'road_type_id':464,
      'isParkable':true,
      'bridgeType':'publicTrout',
      'alphabetLetter':'E',
      'slug':'grundy-road@0.0828'
    },
    'geometry':{
      'type':'Point',
      'coordinates':[
        -89.56921874816861,
        45.35429150532291
      ]
    }
  }
]

const STREAM_GEOJSON_PROPERTIES = {
  'gid':85506,
  'name':'Unnamed',
  'local_name':null,
  'length_mi':5.143,
  'centroid_latitude':45.34376,
  'centroid_longitude':-89.59912,
  'status_message':null,
  'source':null,
  'state_gid':494,
  'slug':'unnamed@-89.59912,45.34376',
  'water_id':215,
  'has_brown_trout':0,
  'has_brook_trout':0,
  'has_rainbow_trout':0,
  'is_brown_trout_stocked':0,
  'is_brook_trout_stocked':0,
  'is_rainbow_trout_stocked':0,
  'circular_box_xmin':-89.62868,
  'circular_box_ymin':45.3047,
  'circular_box_ymax':45.37614,
  'circular_box_xmax':-89.56217,
  'trout_stream_section_length':5.143,
  'publicly_accessible_trout_stream_section_length':0.406,
  'openers':[
    {
      'start_time':'2017-05-06T16:45:00.000Z',
      'end_time':'2017-10-16T05:45:00.000Z',
      'id':308,
      'water_id':215,
      'restriction_id':1151,
      'restriction':{
        'id':1151,
        'sourceId':'1 2 1',
        'shortText':'5 trout in total of any length.',
        'legalText':'Inland streams, springs and spring ponds; 5 trout in total of any length.'
      }
    }
  ]
}
