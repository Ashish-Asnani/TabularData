import React, { Component } from 'react';
import DataTable from './DataTable';
import './App.css';
import FooterData from './footer/footer';
import NavBar from './navBar/navBar';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { result: [] };
}
  componentDidMount() {
    fetch(`https://www.mocky.io/v2/5caec4f2340000b321ab6de9`)
    .then(res => res.json())
    .then(
        result => {
        this.setState({result: result.actions});
        },
        error => {
        console.log(error);
        }
    );
}
  render() {
    const headings = [
      'Creation Date',
      'Last Update',
      'Type',
      'Status',
      'Mesage',
      'Detailed Message'
    ];
    var rows = [];
    var message = [];
    this.state.result.map((item) => {
      var create = new Date(item.creationDate);
      var update = new Date(item.lastUpdate);
        const arr = [
          create.toUTCString(),
          update.toUTCString(),
          item.type,
          item.status,
          item.message,
          item.metadata.rollUpMessage
        ];
        rows.push(arr);
        message.push(item.metadata.rollUpMessage);
    });
    const headingCount = [
      'Status',
      'Count'
    ];
    const rowCount = [
      ['Unseen', this.state.result.reduce(function (n, item) {
        return n + (item.status === 'UNSEEN');
      },0)],
      ['Fail To Act', this.state.result.reduce(function (n, item) {
        return n + (item.status === 'FAIL_TO_ACT');
      },0)],
      ['Acted', this.state.result.reduce(function (n, item) {
        return n + (item.status === 'ACTED');
      },0)],
      ['Rejected', this.state.result.reduce(function (n, item) {
        return n + (item.status === 'REJECTED');
      },0)]
    ]
    return (
      <div>
        <NavBar/>
        <h1 className="center-align"> Descriptive Table</h1>
        <DataTable headings={headings} rows={rows} message={message} />
        <h1 className="center-align"> Status Count</h1>
        <DataTable headings={headingCount} rows={rowCount} />
        <br></br>
        <FooterData/>
      </div>
        
    );
  }
}

export default App;