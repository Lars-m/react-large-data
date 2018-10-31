import React, { Component } from 'react';
import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
const URL = "http://localhost:1234/api"

const columns = [{
  dataField: 'id',
  text: 'ID'
},
{
  dataField: 'gender',
  text: 'Gender',
  sort: true,
  //filter: textFilter()
},
{
  dataField: 'firstName',
  text: 'First Name',
  sort: true,
  //filter: textFilter()
},
{
  dataField: 'lastName',
  text: 'Last Name',
  sort: true,
}, {
  dataField: 'email',
  text: 'email'
}]


class App extends Component {
  state = { names: [], sizePerPage: 10, page: 1, totalSize: 0 }

  async componentDidMount() {
    const { page, sizePerPage } = this.state;
    this.handleTableChange("didMount", { page, sizePerPage });
  }
  componentDidUpdate() {
    console.timeEnd("rendering");
  }

  handleTableChange = async (type, props) => {
    const { page, sizePerPage, sortField, sortOrder } = props;
    console.log(props)  //Monitor this output, when you test this step
    const sortStr = (sortField && sortOrder) ? `&_sort=${sortField}&_order=${sortOrder}` : "";
    const currentIndex = (page - 1) * sizePerPage;
    const end = currentIndex + sizePerPage;
    const URI = `${URL}?_start=${currentIndex}&_end=${end}${sortStr}`;
    let p = await fetch(URI).then(res => {
      const totalSize = Number(res.headers.get("x-total-count"));
      if (totalSize) { this.setState({ totalSize }) }
      return res.json()
    });
    const names = await p;
    this.setState({ page, sizePerPage, names })
  }

  render() {
    const { page, sizePerPage, totalSize } = this.state;
    return (
      <div style={{marginTop:30}}>
      <h2>Pagination on the server</h2>
        <BootstrapTable
          striped
          remote
          bootstrap4
          keyField='id'
          data={this.state.names}
          columns={columns}
          onTableChange={this.handleTableChange}
          pagination={paginationFactory({ page, sizePerPage, totalSize })}
        />
      </div>
    )
  }
}

export default App;
