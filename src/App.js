import React, { Component } from 'react';
import './App.css';
import randomGen from './randomGen';

const PEOPLE = 100
const ROUNDS = 17000
const BALANCE = 100
const BUFF_PEOPLE_COUNT = 10
const BUFF = 1.01
const roundsPerFrame = 20

class App extends Component {

  constructor(props) {
    super(props)
    const people = []
    for (let i = 0; i < PEOPLE; i++) {
      people.push({
        balance: BALANCE,
        buff: i < BUFF_PEOPLE_COUNT ? BUFF : 1,
      })
    }
    people.sort((a, b) => b - a)
    this.state = {
      people,
      round: 0,
    }
    setTimeout(this.round)
  }

  round = () => {
    const {
      round,
      people,
    } = this.state
    let nextRound = round
    for (let i = 0; i < roundsPerFrame; i++) {
      if (nextRound === ROUNDS) {
        break
      }
      const buffs = people.map(({buff}) => buff)
      const delta = people.map(_ => -1)
      people.forEach(() => delta[randomGen(buffs)] += 1)
      people.forEach((person, i) => person.balance += delta[i])
      people.sort((a, b) => b.balance - a.balance)
      while (!people[people.length - 1].balance) {
        people.pop()
      }
      nextRound += 1
    }
    this.setState({
      round: nextRound,
      people,
    })
    if (nextRound < ROUNDS) {
      setTimeout(this.round)
    }
  }

  render() {
    const {
      people,
      round,
    } = this.state
    return (
      <div className="App">
        <div style={{marginLeft: 20}}>
          {people.map(({balance, buff}, index) => (
            <div
              key={index}
            >
              <div
                style={{
                  width: balance,
                  background: buff > 1 ? 'red' : 'blue',
                  height: 3,
                }}
              />
              <div
                style={{
                  height: 3,
                }}
              />
            </div>
          ))}
        </div>
        <h3>{round} rounds, {people.length} people left, {people.filter(({buff}) => buff > 1).length} people with buff left</h3>
        <h3>balance range: {people[people.length - 1].balance} - {people[0].balance}</h3>
      </div>
    );
  }

}

export default App;
