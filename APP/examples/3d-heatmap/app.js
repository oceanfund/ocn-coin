/* global window,document */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay.js';
import collect from '@turf/collect';
import { slide as Menu } from 'react-burger-menu'
import {csv as requestCsv} from 'd3-request';

// Set your mapbox token here
//const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY3lyaWxsdXR0ZXJvZHQiLCJhIjoiY2pjcWtxcGRoMGYybTJybzJkbjVzeGdzdCJ9.fbcG6ubIoQnRypab9qUQCQ';// eslint-disable-line

const DATA_URL = '/Palau_geocordinates_final.csv'
// Source data CSV
//const DATA_URL = 'file:///Users/neurobotics/ocn-coin/deck.gl-master/examples/react/OCN/heatmap-data.csv'; // eslint-disable-line



    class Root extends Component {
      constructor(props) {
        super(props);
        this.state = {
          viewport: {
            ...DeckGLOverlay.defaultViewport,
            width: 500,
            height: 500
          },
          data: null
        };
    const { viewport, data } = this.state;

    //collect(points, polys, 'population', 'populationValues');

    requestCsv(DATA_URL, (error, response) => {
      if (!error) {
        const data = response.map(d => [Number(d.lng), Number(d.lat)]);
        this.setState({data});
      }
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
  }

  _resize() {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _onViewportChange(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  render() {
    const {viewport, data} = this.state;
    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        //mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._onViewportChange.bind(this)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <DeckGLOverlay viewport={viewport} data={data || []} />
      </MapGL>
    );
     
      
    
    }
  }


render(<Root />, document.body.appendChild(document.createElement('div')));
