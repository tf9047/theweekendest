import React from 'react';
import ReactDOM from 'react-dom';
import { Responsive, Button, Icon, Header, Segment, List } from "semantic-ui-react";
import TrainBullet from './trainBullet.jsx';

import Cross from "./icons/cross-15.svg";

class StationDetails extends React.Component {
  handleBack = _ => {
    const { onReset } = this.props;
    onReset();
  }

  handleClick = stop => {
    const { onStationSelect } = this.props;
    onStationSelect(stop.id);
  }

  render() {
    const { stations, station, trains, onTrainSelect } = this.props;
    return (
      <Segment style={{paddingTop: 0}}>
        <Responsive minWidth={Responsive.onlyTablet.minWidth} as='div' style={{marginTop: "14px"}}>
          <Button icon basic onClick={this.handleBack}>
            <Icon name='arrow left' />
          </Button>
          <Header as="h3">
            { station.name.replace(/ - /g, "–") }
          </Header>
        </Responsive>
        <Responsive {...Responsive.onlyMobile} as='div' style={{display: "flex", height: "36px", marginBottom: "14px", alignItems: "center", flexGrow: 0}}>
          <Button icon basic onClick={this.handleBack}>
            <Icon name='arrow left' />
          </Button>
          <Header as="h3" style={{margin: 0}}>
            { station.name.replace(/ - /g, "–") }
          </Header>
        </Responsive>
        <Segment>
          <Header as="h4">
            To {
              Array.from(new Set(Array.from(station.southStops).sort().map((trainId) => {
                const train = trains.find((t) => {
                  return t.id == trainId;
                });
                return train.destinations.south;
              }).flat())).sort().join(', ').replace(/ - /g, "–")
            }
          </Header>
          <div>
            {
              Array.from(station.southStops).sort().map((trainId) => {
                const train = trains.find((t) => {
                  return t.id == trainId;
                });
                return (
                  <TrainBullet link={true} id={trainId} key={train.name} name={train.name} color={train.color}
                    textColor={train.text_color} key={train.id} onSelect={onTrainSelect} />
                )
              })
            }
          </div>
        </Segment>
        <Segment>
          <Header as="h4">
            To {
              Array.from(new Set(Array.from(station.northStops).sort().map((trainId) => {
                const train = trains.find((t) => {
                  return t.id == trainId;
                });
                return train.destinations.north;
              }).flat())).sort().join(', ').replace(/ - /g, "–")
            }
          </Header>
          <div>
            {
              Array.from(station.northStops).sort().map((trainId) => {
                const train = trains.find((t) => {
                  return t.id == trainId;
                });
                return (
                  <TrainBullet link={true} id={trainId} key={train.name} name={train.name} color={train.color}
                    textColor={train.text_color} key={train.id} onSelect={onTrainSelect} />
                )
              })
            }
          </div>
        </Segment>
        {
          station.transfers.size > 0 &&
          <Segment>
            <Header as="h4">
              Transfers
            </Header>
            <List divided relaxed selection>
            {
              Array.from(station.transfers).map((stopId) => {
                const stop = stations[stopId];
                if (!stop) {
                  return;
                }
                return(
                  <List.Item key={stop.id} className='station-list-item' onClick={this.handleClick.bind(this, stop)}>
                    <List.Content floated='left'>
                      <Header as='h5'>
                        { stop.name.replace(/ - /g, "–") }
                      </Header>
                    </List.Content>
                    <List.Content floated='right'>
                      {
                        Array.from(stop.stops).sort().map((trainId) => {
                          const train = trains.find((t) => {
                            return t.id == trainId;
                          });
                          return (
                            <TrainBullet link={true} id={trainId} key={train.name} name={train.name} color={train.color}
                              textColor={train.text_color} size='small' key={train.id} />
                          )
                        })
                      }
                      {
                        stop.stops.size === 0 &&
                        <Cross style={{height: "21px", width: "21px", margin: "3.5px 1px 3.5px 3.5px"}} />
                      }
                    </List.Content>
                  </List.Item>
                )
              })
            }
          </List>
          </Segment>
        }
      </Segment>
    );
  }
}

export default StationDetails